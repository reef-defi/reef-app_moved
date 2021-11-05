import { useEffect, useState } from 'react';
import { Signer } from '@reef-defi/evm-provider';
import axios, { AxiosResponse } from 'axios';
import {
  createEmptyTokenWithAmount,
  Network, ReefSigner, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';

const { availableReefNetworks } = utils;
const { parseUnits } = eUtils;

interface AccountTokensRes {
    data: {
        // eslint-disable-next-line camelcase
        account_id: string;
        // eslint-disable-next-line camelcase
        evm_address: string;
        status: boolean;
        balances: AccountTokensResBalance[]
    }
}

interface AccountTokensResBalance {
    // eslint-disable-next-line camelcase
    contract_id: string,
    balance: string,
    decimals: number,
    symbol: string
}

const loadAccountTokens = async (address: string, network: Network): Promise<Token[]> => {
  try {
    return axios.post<void, AxiosResponse<AccountTokensRes>>(`${network.reefscanUrl}api/account/tokens`, { account: address })
      .then((res) => {
        const tkns: Token[] = [];

        console.log('TODO REMOVEEE!!!!');
        const reefTkn = reefTokenWithAmount();
        const balanceFromUnits = parseUnits('100');
        reefTkn.balance = BigNumber.from(balanceFromUnits.toString());
        tkns.push(reefTkn);

        const testTkn = createEmptyTokenWithAmount();
        testTkn.address = '0x15820d37b1cC11f102076070897ACde06511B2fa';
        testTkn.balance = BigNumber.from(parseUnits('1000'));
        testTkn.name = 'Test';
        testTkn.decimals = 18;
        testTkn.iconUrl = 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png?1574218774';
        tkns.push(testTkn);
        return tkns;
        /* for (let i = 0; i < 10; i += 1) {

          const tkn = reefTokenWithAmount();
          const balanceFromUnits = parseUnits('100');
          // parseUnits returned BigNumber type is different than one in lib??
          tkn.balance = BigNumber.from(balanceFromUnits.toString());
          if (i > 0) {
            tkn.address += i;
          }
          tkn.amount = parseUnits('2').toString();
          tkns.push(tkn);
        } */

        if (!res.status) {
          return [];
        }
        return res.data.data.balances.map((resBal:AccountTokensResBalance) => ({
          address: resBal.contract_id,
          name: resBal.symbol,
          amount: resBal.balance,
          decimals: resBal.decimals,
          balance: BigNumber.from(resBal.balance),
          iconUrl: '',
          isEmpty: false,
        } as Token));
      }, (err) => {
        console.log('EEEEE');
        return [];
      });
  } catch (err) {
    console.log('loadAccountTokens error = ', err);
    return Promise.resolve([]);
  }
};

export const useLoadSignerTokens = (signer?: ReefSigner): Token[] => {
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!signer) {
        setTokens([]);
        return;
      }
      const selectedAccountTokens: Token[] = await loadAccountTokens(signer.address, availableReefNetworks.mainnet);
      setTokens(selectedAccountTokens);
    };
    fetchTokens();
  }, [signer]);
  return tokens;
};

import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  createEmptyTokenWithAmount,
  Network, ReefSigner, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';
import { ValueStatus, ValueWithStatus } from './useSignerTokenBalances';
import { currentNetwork } from '../environment';

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

const loadAccountTokens = async (address: string, network: Network): Promise<Token[] | null> => {
  try {
    return axios.post<void, AxiosResponse<AccountTokensRes>>(`${network.reefscanUrl}api/account/tokens`, { account: address })
      .then((res) => res.data.data?.balances.map((resBal:AccountTokensResBalance) => ({
        address: resBal.contract_id,
        name: resBal.symbol,
        amount: resBal.balance,
        decimals: resBal.decimals,
        balance: BigNumber.from(resBal.balance),
        // TODO add icons in response
        iconUrl: resBal.symbol === 'REEF' ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png' : '',
        isEmpty: false,
      } as Token)),
      /* const tkns: Token[] = [];
        console.log('TODO REMOVEEE!!!');
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
        if (!res.status || !res.data.data) {
          return null;
        } */
      (err) => {
        console.log('Error loading tokens =', err);
        return null;
      });
  } catch (err) {
    console.log('loadAccountTokens error = ', err);
    return Promise.resolve(null);
  }
};

export const useLoadSignerTokens = (signer?: ReefSigner): ValueWithStatus<Token[]> => {
  const [tokens, setTokens] = useState<ValueWithStatus<Token[]>>(ValueStatus.LOADING);
  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!signer) {
        setTokens(ValueStatus.LOADING);
        return;
      }
      const selectedAccountTokens: Token[] | null = await loadAccountTokens(signer.address, currentNetwork);
      if (!selectedAccountTokens) {
        setTokens(ValueStatus.NO_DATA);
        return;
      }
      setTokens(selectedAccountTokens);
    };
    fetchTokens();
  }, [signer]);
  return tokens;
};

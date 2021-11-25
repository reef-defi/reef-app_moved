import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  createEmptyTokenWithAmount,
  Network, ReefSigner, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';
import { isValueWithStatusSet, ValueStatus, ValueWithStatus } from './useSignerTokenBalances';
import { currentNetwork } from '../environment';
import { getReefCoinBalance } from '../../../reef-react-lib/dist/rpc';
import { useAppSelector } from '../store';

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

function getReefTokenBalance(reefSigner: ReefSigner): Promise<Token[]> {
  const reefTkn = reefTokenWithAmount();
  reefTkn.balance = reefSigner.balance;
  return Promise.resolve([reefTkn as Token]);
}

const loadAccountTokens = async (reefSigner: ReefSigner, network: Network): Promise<Token[]> => {
  try {
    return axios.post<void, AxiosResponse<AccountTokensRes>>(`${network.reefscanUrl}api/account/tokens`, { account: reefSigner.address })
      .then((res) => {
        if (!res || !res.data || !res.data.data || !res.data.data.balances || !res.data.data.balances.length) {
          return getReefTokenBalance(reefSigner);
        }
        return res.data.data.balances.map((resBal:AccountTokensResBalance) => ({
          address: resBal.contract_id,
          name: resBal.symbol,
          amount: resBal.balance,
          decimals: resBal.decimals,
          balance: BigNumber.from(resBal.balance),
          // TODO add icons in response
          iconUrl: resBal.symbol === 'REEF' ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png' : '',
          isEmpty: false,
        } as Token));
      },
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
        return getReefTokenBalance(reefSigner);
      });
  } catch (err) {
    console.log('loadAccountTokens error = ', err);
    return getReefTokenBalance(reefSigner);
  }
};

export const useLoadSignerTokens = (refreshToggle: boolean, signer?: ReefSigner): ValueWithStatus<Token[]> => {
  const [tokens, setTokens] = useState<ValueWithStatus<Token[]>>(ValueStatus.LOADING);
  const { reloadToggle } = useAppSelector((state) => state.tokens);
  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!signer) {
        setTokens(ValueStatus.LOADING);
        return;
      }
      const selectedAccountTokens: Token[] | null = await loadAccountTokens(signer, currentNetwork);
      if (!selectedAccountTokens) {
        setTokens(ValueStatus.NO_DATA);
        return;
      }
      setTokens(selectedAccountTokens);
    };
    fetchTokens();
  }, [signer]);

  useEffect(() => {
    if (isValueWithStatusSet(tokens)) {
      const tkns = tokens as Token[];
      const { address: reefAddr } = reefTokenWithAmount();
      const reefToken = tkns.find((t) => t.address === reefAddr);
      if (reefToken) {
        reefToken.balance = signer?.balance || BigNumber.from(0);
        setTokens([...tkns]);
      }
    }
  }, [signer?.balance]);

  return tokens;
};

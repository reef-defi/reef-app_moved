import { useEffect, useState } from 'react';
import { Signer } from '@reef-defi/evm-provider';
import axios from 'axios';
import {
  createEmptyToken, Network, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber } from 'ethers';

const { availableReefNetworks } = utils;

const loadAccountTokens = async (address: string, network: Network): Promise<Token[]> => {
  try {
    return axios.post(`${network.reefscanUrl}api/account/tokens`, { account: address })
      .then((res) => {
        const tkns: Token[] = [];
        for (let i = 0; i < 1; i += 1) {
          console.log('TODO REMOVEEE!!!!');
          const tkn = reefTokenWithAmount();
          tkn.balance = BigNumber.from(1000);
          // tkn.address += Math.random().toString().substr(3);
          tkn.amount = (1 * 1e18).toString(10);
          tkns.push(tkn);
        }
        return tkns;
        if (!res.data.status) {
          return [];
        }
        return res.data;
      });
  } catch (err) {
    console.log('loadAccountTokens error = ', err);
    return Promise.resolve([]);
  }
};

export const useLoadSignerTokens = (signer?: Signer): Token[] => {
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!signer) {
        return;
      }
      const address = await signer.getAddress();
      const selectedAccountTokens: Token[] = await loadAccountTokens(address, availableReefNetworks.mainnet);
      console.log('eee', selectedAccountTokens);
      setTokens(selectedAccountTokens);
    };
    fetchTokens();
  }, [signer]);
  return tokens;
};

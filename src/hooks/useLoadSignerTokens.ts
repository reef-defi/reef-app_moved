import { useEffect, useState } from 'react';
import { Signer } from '@reef-defi/evm-provider';
import axios from 'axios';
import {
  createEmptyToken, Network, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';

const { availableReefNetworks } = utils;
const { parseUnits } = eUtils;

const loadAccountTokens = async (address: string, network: Network): Promise<Token[]> => {
  try {
    return axios.post(`${network.reefscanUrl}api/account/tokens`, { account: address })
      .then((res) => {
        const tkns: Token[] = [];
        for (let i = 0; i < 1; i += 1) {
          console.log('TODO REMOVEEE!!!!', parseUnits('1000').toString());

          const tkn = reefTokenWithAmount();
          const balanceFromUnits = parseUnits('100');
          // parseUnits returned BigNumber type is different than one in lib??
          tkn.balance = BigNumber.from(balanceFromUnits.toString());
          // tkn.address += Math.random().toString().substr(3);
          tkn.amount = parseUnits('2').toString();
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
        setTokens([]);
        return;
      }
      const address = await signer.getAddress();
      const selectedAccountTokens: Token[] = await loadAccountTokens(address, availableReefNetworks.mainnet);
      setTokens(selectedAccountTokens);
    };
    fetchTokens();
  }, [signer]);
  return tokens;
};

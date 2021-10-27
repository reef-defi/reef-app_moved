import { useEffect, useState } from 'react';
import { Signer } from '@reef-defi/evm-provider';
import axios from 'axios';
import {
  createEmptyToken, createEmptyTokenWithAmount, Network, reefTokenWithAmount, Token, utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';

const { availableReefNetworks } = utils;
const { parseUnits } = eUtils;

const loadAccountTokens = async (address: string, network: Network): Promise<Token[]> => {
  try {
    return axios.post(`${network.reefscanUrl}api/account/tokens`, { account: address })
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

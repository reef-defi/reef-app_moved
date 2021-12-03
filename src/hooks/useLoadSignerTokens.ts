import { useEffect, useState } from 'react';
import {
  createEmptyTokenWithAmount,
  hooks,
  Network,
  ReefSigner,
  reefTokenWithAmount,
  Token,
  utils,
} from '@reef-defi/react-lib';
import { BigNumber, utils as eUtils } from 'ethers';
import { currentNetwork } from '../environment';

const {
  availableReefNetworks, isDataSet, DataProgress,
} = utils;
const { parseUnits } = eUtils;

const loadAccountTokensMockData = async (reefSigner: ReefSigner, network: Network): Promise<Token[]> => {
  const tkns: Token[] = [];
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
  return Promise.resolve(tkns);
};

export const useLoadSignerTokensMockData = (refreshToggle: boolean, signer?: ReefSigner): utils.DataWithProgress<Token[]> => {
  const [tokens, setTokens] = useState<utils.DataWithProgress<Token[]>>(DataProgress.LOADING);
  useEffect(() => {
    if (!signer) {
      return;
    }
    const fetchTokens = async (): Promise<void> => {
      setTokens(await loadAccountTokensMockData(signer, currentNetwork));
    };
    fetchTokens();
  }, [signer]);

  return tokens;
};

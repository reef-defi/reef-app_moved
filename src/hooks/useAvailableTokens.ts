import {
  ReefSigner, Token, hooks as reefHooks, utils as reefUtils,
} from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { currentNetwork } from '../environment';

export const useAvailableTokens = (signer?: ReefSigner): Token[] => {
  const { tokens } = useAppSelector((state) => state.tokens);
  const signerTokens = reefHooks.useLoadSignerTokens(false, currentNetwork, signer);
  const [tokensCombined, setTokensCombined] = useState<Token[]>([]);

  useEffect(() => {
    if (!signer) {
      return;
    }
    if (!reefUtils.isDataSet(signerTokens)) {
      setTokensCombined(tokens);
      return;
    }

    const availableTokens: Token[] = (signerTokens as Token[]).concat(tokens).reduce((combined:Token[], tkn: Token) => {
      if (!combined.some((combTkn: Token) => combTkn.address === tkn.address)) {
        return [...combined, tkn];
      }
      return combined;
    }, []) as Token[];
    setTokensCombined(availableTokens);
  }, [tokens, signerTokens]);
  return tokensCombined;
};

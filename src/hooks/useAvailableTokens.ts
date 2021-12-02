import { ReefSigner, Token } from '@reef-defi/react-lib';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { isValueWithStatusSet } from './useSignerTokenBalances';
import { useLoadSignerTokens } from './useLoadSignerTokens';

export const useAvailableTokens = (signer?: ReefSigner): Token[] => {
  const { tokens } = useAppSelector((state) => state.tokens);
  const signerTokens = useLoadSignerTokens(false, signer);
  const [tokensCombined, setTokensCombined] = useState<Token[]>([]);

  useEffect(() => {
    if (!signer) {
      return;
    }
    if (!isValueWithStatusSet(signerTokens)) {
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

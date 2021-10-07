import { useEffect, useState } from 'react';
import { rpc, Token } from '@reef-defi/react-lib';
import { Signer } from '@reef-defi/evm-provider';

export default function useLoadVerifiedTokens(selectedSigner?: Signer): Token[] {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!selectedSigner) { return; }
      const verifiedTokens = await rpc.loadVerifiedERC20Tokens();
      const newTokens = await rpc.loadTokens(verifiedTokens, selectedSigner);
      setTokens(newTokens);
    };
    fetchTokens();
  }, [selectedSigner]);
  return tokens;
}

import { useEffect, useState } from 'react';
import { rpc, Token } from '@reef-defi/react-lib';
import { Signer } from '@reef-defi/evm-provider';
import useSelectedSigner from './useSelectedSigner';
import { accountsSetAccountTokens } from '../store/actions/accounts';
import { useAppDispatch } from '../store/hooks';

export default function useLoadSelectedSignerTokens(selectedSigner?: Signer): Token[] {
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async (): Promise<void> => {
      if (!selectedSigner) { return; }
      // TODO
      // const verifiedTokens = await rpc.loadVerifiedERC20Tokens();
      // const newTokens = await rpc.loadTokens(verifiedTokens, selectedSigner);
      const newTokens: Token[] = [];
      dispatch(accountsSetAccountTokens(newTokens));
      setTokens(newTokens);
    };
    fetchTokens();
  }, [selectedSigner]);
  return tokens;
}

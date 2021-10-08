import { BasicToken, rpc, hooks } from '@reef-defi/react-lib';
import { reloadPools } from '../store/actions/pools';
import { useAppDispatch, useAppSelector } from '../store';
import { setTokens, setTokensLoading } from '../store/actions/tokens';
import { useGetSigner } from './useGetSigner';

const { useAsyncEffect } = hooks;

// This will be placed on reefscan backend. just a temporary solution.
// eslint-disable-next-line
const validatedTokens = require('../validated-tokens-mainnet.json');

const existingTokens: BasicToken[] = validatedTokens.tokens;

export const useLoadTokens = (): void => {
  const dispatch = useAppDispatch();
  const { tokens, reloadToggle } = useAppSelector((state) => state.tokens);
  const signer = useGetSigner();

  useAsyncEffect(async () => {
    if (!signer) { return; }
    await Promise.resolve()
      .then(() => dispatch(setTokensLoading(true)))
      .then(() => rpc.loadTokens(tokens.length === 0 ? existingTokens : tokens, signer))
      .then((newTokens) => dispatch(setTokens(newTokens)))
      .then(() => dispatch(reloadPools()))
      .catch((error) => console.log(error))
      .finally(() => dispatch(setTokensLoading(false)));
  }, [reloadToggle]);
};

import { getSigner } from '../utils';
import { reloadPools } from "../store/actions/pools";
import { useAppDispatch, useAppSelector } from "../store";
import { BasicToken, rpc, hooks } from "@reef-defi/react-lib";
import { setTokens, setTokensLoading } from "../store/actions/tokens";

const {useAsyncEffect} = hooks;

// This will be placed on reefscan backend. just a temporary solution.
const existingTokens: BasicToken[] = require("./../validated-tokens-mainnet.json").tokens;

export const useLoadTokens = () => {
  const dispatch = useAppDispatch();
  const {tokens, reloadToggle} = useAppSelector((state) => state.tokens);
  const signer = getSigner();

  useAsyncEffect(async () => {
    if (!signer) { return; }
    await Promise.resolve()
      .then(() => dispatch(setTokensLoading(true)))
      .then(() =>  rpc.loadTokens(tokens.length === 0 ? existingTokens : tokens, signer))
      .then((newTokens) => dispatch(setTokens(newTokens)))
      .then(() => dispatch(reloadPools()))
      .catch((error) => console.log(error))
      .finally(() => dispatch(setTokensLoading(false)));

  }, [reloadToggle]);
};
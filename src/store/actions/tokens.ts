import { Token } from "@reef-defi/react-lib";
import { RELOAD_TOKENS, SET_TOKENS_ACTION, SET_TOKENS_LOADING } from "../actionCreator";

interface ReloadTokens {
  type: typeof RELOAD_TOKENS;
}

interface SetTokens {
  type: typeof SET_TOKENS_ACTION;
  tokens: Token[];
}

interface SetTokensLoading {
  type: typeof SET_TOKENS_LOADING;
  loading: boolean;
};

export type TokensActions =
  | ReloadTokens
  | SetTokens
  | SetTokensLoading;

export const reloadTokens = (): ReloadTokens => ({
  type: RELOAD_TOKENS,
});

export const setTokens = (tokens: Token[]): SetTokens => ({
  tokens,
  type: SET_TOKENS_ACTION,
});

export const setTokensLoading = (loading: boolean): SetTokensLoading => ({
  loading,
  type: SET_TOKENS_LOADING
});
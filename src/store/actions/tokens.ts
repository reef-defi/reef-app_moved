import { Token } from "@reef-defi/react-lib";
import { RELOAD_TOKENS, SET_TOKENS_ACTION } from "../actionCreator";

interface ReloadTokens {
  type: typeof RELOAD_TOKENS;
}

interface SetTokens {
  type: typeof SET_TOKENS_ACTION;
  tokens: Token[];
}

export type TokensActions =
  | ReloadTokens
  | SetTokens;

export const reloadTokens = (): ReloadTokens => ({
  type: RELOAD_TOKENS,
});

export const setTokens = (tokens: Token[]): SetTokens => ({
  tokens,
  type: SET_TOKENS_ACTION,
});
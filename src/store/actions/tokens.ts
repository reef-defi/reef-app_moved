import { Token } from '@reef-defi/react-lib';
import { SET_ALL_TOKENS } from '../actionCreator';

interface SetAllTokens {
  type: typeof SET_ALL_TOKENS,
  tokens: Token[]
}

export type TokensAction =
  | SetAllTokens;

export const setAllTokensAction = (tokens: Token[]): SetAllTokens => ({
  type: SET_ALL_TOKENS,
  tokens,
});

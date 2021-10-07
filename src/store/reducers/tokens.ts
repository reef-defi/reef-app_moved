import { Token } from '@reef-defi/react-lib';
import { SET_ALL_TOKENS } from '../actionCreator';
import { TokensAction } from '../actions/tokens';

export interface TokensReducer {
  tokens: Token[];
}

const defaultTokensReducer: TokensReducer = {
  tokens: [],
};

export const tokensReducer = (state = defaultTokensReducer, action: TokensAction): TokensReducer => {
  switch (action.type) {
    case SET_ALL_TOKENS: return { ...state, tokens: [...action.tokens] };
    default: return state;
  }
};

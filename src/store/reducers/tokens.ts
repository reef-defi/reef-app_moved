import { Token } from '@reef-defi/react-lib';
import {
  RELOAD_TOKENS,
  SET_TOKENS_ACTION,
  SET_TOKENS_LOADING,
} from '../actionCreator';
import { TokensActions } from '../actions/tokens';

interface TokensReducer {
  tokens: Token[];
  selectedSignerTokens: Token[];
  isLoadingTokens: boolean;
  isLoadingSelectedSignerTokens: boolean;
  reloadTokensToggle: boolean;
}

const defaultState: TokensReducer = {
  tokens: [],
  selectedSignerTokens: [],
  isLoadingTokens: false,
  reloadTokensToggle: false,
  isLoadingSelectedSignerTokens: false,
};

export default (state = defaultState, action: TokensActions): TokensReducer => {
  switch (action.type) {
    case RELOAD_TOKENS: return { ...state, reloadTokensToggle: !state.reloadTokensToggle };
    case SET_TOKENS_ACTION: return { ...state, tokens: [...action.tokens] };
    case SET_TOKENS_LOADING: return { ...state, isLoadingTokens: action.loading };
    default: return state;
  }
};

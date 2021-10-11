import { Token } from '@reef-defi/react-lib';
import {
  RELOAD_TOKENS_APPROVED,
  SET_TOKENS_APPROVED_ACTION,
  SET_TOKENS_APPROVED_LOADING,
  SET_TOKENS_SELECTED_SIGNER_ACTION,
  SET_TOKENS_SELECTED_SIGNER_LOADING,
} from '../actionCreator';
import { TokensActions } from '../actions/tokens';

interface TokensReducer {
  approvedTokens: Token[];
  selectedSignerTokens: Token[];
  isLoadingApprovedTokens: boolean;
  isLoadingSelectedSignerTokens: boolean;
  reloadTokensApprovedToggle: boolean;
}

const defaultState: TokensReducer = {
  approvedTokens: [],
  selectedSignerTokens: [],
  isLoadingApprovedTokens: false,
  reloadTokensApprovedToggle: false,
  isLoadingSelectedSignerTokens: false,
};

export default (state = defaultState, action: TokensActions): TokensReducer => {
  switch (action.type) {
    case RELOAD_TOKENS_APPROVED: return { ...state, reloadTokensApprovedToggle: !state.reloadTokensApprovedToggle };
    case SET_TOKENS_APPROVED_ACTION: return { ...state, approvedTokens: [...action.tokens] };
    case SET_TOKENS_APPROVED_LOADING: return { ...state, isLoadingApprovedTokens: action.loading };
    case SET_TOKENS_SELECTED_SIGNER_ACTION: return { ...state, selectedSignerTokens: [...action.tokens] };
    case SET_TOKENS_SELECTED_SIGNER_LOADING: return { ...state, isLoadingSelectedSignerTokens: action.loading };
    default: return state;
  }
};

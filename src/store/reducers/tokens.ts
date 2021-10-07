import { Token } from "@reef-defi/react-lib";
import { RELOAD_TOKENS, SET_TOKENS_ACTION, SET_TOKENS_LOADING } from "../actionCreator";
import { TokensActions } from "../actions/tokens";

interface TokensReducer {
  tokens: Token[];
  isLoading: boolean;
  reloadToggle: boolean;
}

const defaultState: TokensReducer = {
  tokens: [],
  isLoading: false,
  reloadToggle: false,
};

export default (state=defaultState, action: TokensActions): TokensReducer => {
  switch (action.type) {
    case RELOAD_TOKENS: return {...state, reloadToggle: !state.reloadToggle};
    case SET_TOKENS_ACTION: return {...state, tokens: [...action.tokens]};
    case SET_TOKENS_LOADING: return {...state, isLoading: action.loading};
    default: return state;
  }
}
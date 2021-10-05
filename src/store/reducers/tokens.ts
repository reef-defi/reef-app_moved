import { Token } from "@reef-defi/react-lib";
import { RELOAD_TOKENS, SET_TOKENS_ACTION } from "../actionCreator";
import { TokensActions } from "../actions/tokens";

interface TokensReducer {
  tokens: Token[];
  reloadToggle: boolean;
}

const defaultState: TokensReducer = {
  tokens: [],
  reloadToggle: false,
};

export default (state=defaultState, action: TokensActions): TokensReducer => {
  switch (action.type) {
    case RELOAD_TOKENS: return {...state, reloadToggle: !state.reloadToggle};
    case SET_TOKENS_ACTION: return {...state, tokens: [...action.tokens]};
    default: return state;
  }
}
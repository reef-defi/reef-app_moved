import { ReefSigner } from '@reef-defi/react-lib';
import { SELECT_SIGNER_ACTION, SET_SIGNERS_ACTION } from '../actionCreator';
import { SignersActions } from '../actions/signers';

interface SignersReducer {
  accounts: ReefSigner[];
  selectedAccount: number;
}

const defaultState: SignersReducer = {
  accounts: [],
  selectedAccount: -1,
};

export default (state = defaultState, action: SignersActions): SignersReducer => {
  switch (action.type) {
    case SELECT_SIGNER_ACTION: return { ...state, selectedAccount: action.index };
    case SET_SIGNERS_ACTION: return { ...state, accounts: [...action.signers] };
    default: return state;
  }
};

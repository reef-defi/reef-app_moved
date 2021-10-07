import { combineReducers } from 'redux';
import { utilsReducer } from './accounts';
import { tokensReducer } from './tokens';
import { signersReducer } from './signers';

const rootReducer = combineReducers({
  accounts: utilsReducer,
  tokens: tokensReducer,
  signers: signersReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { utilsReducer } from './accounts';
import { tokensReducer } from './tokens';
import { signersReducer } from './signers';

const rootReducer = combineReducers({
  accounts: utilsReducer,
  settings: settingsReducer,
  tokens: tokensReducer,
  signers: signersReducer,
});

export default rootReducer;

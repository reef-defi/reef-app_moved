import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { utilsReducer } from './accounts';
import { tokensReducer } from './tokens';

const rootReducer = combineReducers({
  accounts: utilsReducer,
  settings: settingsReducer,
  tokens: tokensReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import signersReducer from './signers';
import poolsReducer from './pools';
import tokensReducer from './tokens';
import utilsReducer from './accounts';

const rootReducer = combineReducers({
  accounts: utilsReducer,
  tokens: tokensReducer,
  signers: signersReducer,
  pools: poolsReducer,
});

export default rootReducer;

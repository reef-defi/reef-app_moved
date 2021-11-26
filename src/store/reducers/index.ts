import { combineReducers } from 'redux';
import signersReducer from './signers';
import poolsReducer from './pools';
import tokensReducer from './tokens';
import appReducer from './app';

const rootReducer = combineReducers({
  signers: signersReducer,
  tokens: tokensReducer,
  pools: poolsReducer,
  app: appReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import signersReducer from './signers';
import poolsReducer from './pools';
import tokensReducer from './tokens';

const rootReducer = combineReducers({
  tokens: tokensReducer,
  signers: signersReducer,
  pools: poolsReducer,
});

export default rootReducer;

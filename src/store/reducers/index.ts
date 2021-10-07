import { combineReducers } from 'redux';
import signersReducer from './signers';
import poolsReducer from './pools';
import tokensReducer from './tokens';

const rootReducer = combineReducers({
  signers: signersReducer,
  tokens: tokensReducer,
  pools: poolsReducer,
});

export default rootReducer;

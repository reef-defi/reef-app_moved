import { combineReducers } from 'redux';
import signersReducer from "./signers";

const rootReducer = combineReducers({
  signers: signersReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { settingsReducer } from './settings';

const rootReducer = combineReducers({
  settings: settingsReducer
});

export default rootReducer;

import { Provider } from '@reef-defi/evm-provider';
import { SET_PROVIDER, SET_PROVIDER_LOADING } from '../actionCreator';
import { AppActions } from '../actions/app';

interface AppReducer {
  provider: Provider| undefined;
  loading: boolean;
}

const defaultState: AppReducer = {
  provider: undefined,
  loading: false,
};

export default (state = defaultState, action: AppActions): AppReducer => {
  switch (action.type) {
    case SET_PROVIDER: return { ...state, provider: action.provider };
    case SET_PROVIDER_LOADING: return { ...state, loading: action.loading };
    default: return state;
  }
};

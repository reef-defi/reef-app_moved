import { Pool } from '@reef-defi/react-lib';
import { RELOAD_POOLS, SET_POOLS_ACTION, SET_POOLS_LOADING } from '../actionCreator';
import { PoolsActions } from '../actions/pools';

interface PoolsReducer {
  pools: Pool[];
  isLoading: boolean;
  reloadToggle: boolean;
}

const defaultState: PoolsReducer = {
  pools: [],
  isLoading: false,
  reloadToggle: false,
};

export default (state = defaultState, action: PoolsActions): PoolsReducer => {
  switch (action.type) {
    case SET_POOLS_ACTION: return { ...state, pools: [...action.pools] };
    case SET_POOLS_LOADING: return { ...state, isLoading: action.loading };
    case RELOAD_POOLS: return { ...state, reloadToggle: !state.reloadToggle };
    default: return state;
  }
};

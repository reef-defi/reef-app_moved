import { Pool } from "@reef-defi/react-lib";
import { RELOAD_POOLS, SET_POOLS_ACTION } from "../actionCreator";
import { PoolsActions } from "../actions/pools";

interface PoolsReducer {
  pools: Pool[];
  reloadToggle: boolean;
}

const defaultState: PoolsReducer = {
  pools: [],
  reloadToggle: false,
};

export default (state=defaultState, action: PoolsActions): PoolsReducer => {
  switch (action.type) {
    case SET_POOLS_ACTION: return {...state, pools: [...action.pools]};
    case RELOAD_POOLS: return {...state, reloadToggle: !state.reloadToggle};
    default: return state;
  }
}
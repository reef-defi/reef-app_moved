import { Pool } from "@reef-defi/react-lib";
import { RELOAD_POOLS, SET_POOLS_ACTION, SET_POOLS_LOADING } from "../actionCreator";

interface SetPools {
  type: typeof SET_POOLS_ACTION;
  pools: Pool[];
};

interface ReloadPools {
  type: typeof RELOAD_POOLS;
};

interface SetPoolsLoading {
  type: typeof SET_POOLS_LOADING;
  loading: boolean;
}

export type PoolsActions =
  | SetPools
  | ReloadPools
  | SetPoolsLoading;

export const setPools = (pools: Pool[]): SetPools => ({
  pools,
  type: SET_POOLS_ACTION
});

export const reloadPools = (): ReloadPools => ({
  type: RELOAD_POOLS
});

export const setPoolsLoading = (loading: boolean): SetPoolsLoading => ({
  loading,
  type: SET_POOLS_LOADING
})
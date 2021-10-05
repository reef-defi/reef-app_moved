import { Pool } from "@reef-defi/react-lib";
import { RELOAD_POOLS, SET_POOLS_ACTION } from "../actionCreator";

interface SetPools {
  type: typeof SET_POOLS_ACTION;
  pools: Pool[];
};

interface ReloadPools {
  type: typeof RELOAD_POOLS;
};

export type PoolsActions =
  | SetPools
  | ReloadPools;

export const setPools = (pools: Pool[]): SetPools => ({
  pools,
  type: SET_POOLS_ACTION
});

export const reloadPools = (): ReloadPools => ({
  type: RELOAD_POOLS
});
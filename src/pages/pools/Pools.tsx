import React from 'react';

import {
  Components, appState, hooks, Pool,
} from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL, REMOVE_LIQUIDITY_URL } from '../../urls';

const Pools = (): JSX.Element => {
  const history = useHistory();
  const pools: Pool[]|undefined = hooks.useObservableState(appState.pools$);

  const openAddLiquidity = (): void => history.push(ADD_LIQUIDITY_URL);
  const openChart = (address: string): void => history.push(POOL_CHART_URL.replace(':address', address));
  const openRemoveLiquidity = (address1: string, address2: string): void => history.push(
    REMOVE_LIQUIDITY_URL
      .replace(':address1', address1)
      .replace(':address2', address2),
  );
  return (
    <Components.PoolsComponent
      pools={pools || []}
      isLoading={!pools}
      openChart={openChart}
      openAddLiquidity={openAddLiquidity}
      openRemoveLiquidity={openRemoveLiquidity}
    />
  );
};

export default Pools;

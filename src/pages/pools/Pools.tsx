import React from 'react';
import { Components, utils, hooks, appState } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL } from '../../urls';

const { PoolList, PoolTransactions } = Components;

const Pools = (): JSX.Element => {
  const history = useHistory();
  const openAddLiquidity = (): void => history.push(
    ADD_LIQUIDITY_URL
      .replace(':address1', utils.REEF_ADDRESS)
      .replace(':address2', '0x'),
  );
  const openPool = (address: string): void => history.push(
    POOL_CHART_URL.replace(':address', address),
  );
  const network = hooks.useObservableState(appState.currentNetwork$);

  return (
    <div className="w-100 row justify-content-center">
      <div className="col-xl-10 col-lg-10 col-md-12">
        <PoolList
          openPool={openPool}
          openAddLiquidity={openAddLiquidity}
        />
        <Components.Display.MT size="4" />
        <PoolTransactions
          reefscanFrontendUrl={network?.reefscanFrontendUrl}
        />
      </div>
    </div>
  );
};

export default Pools;

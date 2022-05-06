import React from 'react';

import { Components, utils } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL } from '../../urls';
import { innitialNetwork } from '../../environment';
// import PoolTransactions from './PoolTransactions';
// import PoolList from './PoolList';
const {PoolList, PoolTransactions} = Components;

const Pools = (): JSX.Element => {
  const history = useHistory();
  const openAddLiquidity = () => history.push(
    ADD_LIQUIDITY_URL
    .replace(":address1", utils.REEF_ADDRESS)
    .replace(":address2", "0x")
  );
  const openPool = (address: string) => history.push(
    POOL_CHART_URL.replace(':address', address)
  );

  return (
    <div className="w-100 row justify-content-center">
      <div className="col-xl-10 col-lg-10 col-md-12">
        <PoolList
          openPool={openPool}
          openAddLiquidity={openAddLiquidity}        
        />
        <Components.Display.MT size="4" />
        <PoolTransactions
          reefscanFrontendUrl={innitialNetwork.reefscanFrontendUrl}
        />
      </div>
    </div>
  );
}

export default Pools;

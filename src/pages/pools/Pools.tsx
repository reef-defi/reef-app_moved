import React, { useState } from 'react';

import {
  Components, appState, hooks, Pool,
} from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL, REMOVE_LIQUIDITY_URL } from '../../urls';

const {BoldText} = Components.Text;

const POOLS_GQL = `
query pool {

}
`

const Pools = (): JSX.Element => {
  const history = useHistory();
  const pools: Pool[]|undefined = hooks.useObservableState(appState.pools$);
  const [address, setAddress] = useState("");

  const openAddLiquidity = (): void => history.push(ADD_LIQUIDITY_URL);
  const openChart = (address: string): void => history.push(POOL_CHART_URL.replace(':address', address));
  const openRemoveLiquidity = (address1: string, address2: string): void => history.push(
    REMOVE_LIQUIDITY_URL
      .replace(':address1', address1)
      .replace(':address2', address2),
  );


  return (
    
    <div className="w-100 row justify-content-center">
      <div className="col-xl-8 col-lg-10 col-md-12">
        <Components.Display.ContentBetween>
          <BoldText size={1.6}>Pools</BoldText>
          <Components.Input.Input 
            className="w-50" 
            placeholder=''
          />
          <Components.Button.Button>Add liquidity</Components.Button.Button>
        </Components.Display.ContentBetween>
      </div>
    </div>

    // <Components.PoolsComponent
    //   pools={pools || []}
    //   isLoading={!pools}
    //   openChart={openChart}
    //   openAddLiquidity={openAddLiquidity}
    //   openRemoveLiquidity={openRemoveLiquidity}
    // />
  );
};

export default Pools;

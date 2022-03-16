import React from 'react';

import {Components} from '@reef-defi/react-lib';
import PoolTransactions from './PoolTransactions';
import PoolList from './PoolList';

const Pools = (): JSX.Element => (  
  <div className="w-100 row justify-content-center">
    <div className="col-xl-10 col-lg-10 col-md-12">
      <PoolList />
      <Components.Display.MT size="4" />
      <PoolTransactions />
    </div>
  </div>
);

export default Pools;

import React from 'react';

import Uik from '@reef-defi/ui-kit';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

import PoolsList from './PoolsList';
import MyPoolsList from './MyPoolsList';
import './pools.css';

const Pools = (): JSX.Element => (
  <div className="pools">
    <Uik.Container className="pools__top">
      <div className="pools__total">
        <Uik.Text type="lead">Total Liquidity</Uik.Text>
        <div className="pools__total-amount">
          <Uik.Text type="headline">$10,720.50M</Uik.Text>
          <Uik.Trend
            type="good"
            text="$1,650K"
            direction="up"
          />
        </div>
      </div>
      <Uik.Button
        icon={faRightLeft}
        text="Show Transactions"
      />
    </Uik.Container>
    <MyPoolsList />
    <PoolsList />
  </div>
);

export default Pools;
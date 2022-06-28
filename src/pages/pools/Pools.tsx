import React, { useContext } from 'react';

import Uik from '@reef-defi/ui-kit';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

import PoolsList from './PoolsList';
import MyPoolsList from './MyPoolsList';
import './pools.css';
import TokenPricesContext from '../../context/TokenPricesContext';
import { hooks } from '@reef-defi/react-lib';

const Pools = (): JSX.Element => {
  const tokenPrices = useContext(TokenPricesContext);
  const totalLiquidity = hooks.useTotalSupply(tokenPrices);

  return (
    <div className="pools">
      <Uik.Container className="pools__top">
        <div className="pools__total">
          <Uik.Text type="lead">Total Supply</Uik.Text>
          <div className="pools__total-amount">
            <Uik.Text type="headline">$ {totalLiquidity.split('.')[0]}</Uik.Text>
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
}

export default Pools;

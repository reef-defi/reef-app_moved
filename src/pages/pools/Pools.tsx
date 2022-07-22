import React, { useContext, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';

import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { hooks } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';

import TokenPricesContext from '../../context/TokenPricesContext';
import MyPoolsList from './MyPoolsList';
import './pools.css';
import PoolsList from './PoolsList';

const Pools = (): JSX.Element => {
  const tokenPrices = useContext(TokenPricesContext);
  const totalLiquidity = hooks.useTotalSupply(tokenPrices);
  const yesterdayTotalLiquidity = hooks.useTotalSupply(tokenPrices, true);

  const percentage = useMemo(() => new BigNumber(totalLiquidity)
    .minus(yesterdayTotalLiquidity)
    .div(yesterdayTotalLiquidity)
    .multipliedBy(100)
    .toNumber(),
  [totalLiquidity, yesterdayTotalLiquidity]);

  return (
    <div className="pools">

      <Uik.Container className="pools__top">
        <div className="pools__total">
          <Uik.Text type="lead">Total Supply</Uik.Text>
          <div className="pools__total-amount">
            <Uik.Text type="headline">
              $
              {' '}
              {Uik.utils.formatHumanAmount(totalLiquidity)}
            </Uik.Text>
            <Uik.Trend
              type={percentage >= 0 ? 'good' : 'bad'}
              direction={percentage >= 0 ? 'up' : 'down'}
              text={`${percentage.toFixed(2)}%`}
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
};
export default Pools;

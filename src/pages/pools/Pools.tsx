import React, { useContext } from 'react';
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
  const poolVolume = hooks.usePoolVolume(tokenPrices);

  const getVolume = (): number => new BigNumber(poolVolume).toNumber();

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
              type={getVolume() >= 0 ? 'good' : 'bad'}
              direction={getVolume() >= 0 ? 'up' : 'down'}
              text={`${getVolume().toFixed(2)}%`}
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

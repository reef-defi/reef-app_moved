import React, { useContext, useMemo, useState } from 'react';
import { BigNumber } from 'bignumber.js';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { graphql, hooks } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';

import TokenPricesContext from '../../context/TokenPricesContext';
import MyPoolsList from './MyPoolsList';
import './pools.css';
import PoolsList from './PoolsList';
import CreatePool from './Pool/CreatePool';
import TokenContext from '../../context/TokenContext';

const Pools = (): JSX.Element => {
  const tokenPrices = useContext(TokenPricesContext);

  // TODO set as global var
  const apolloDex = hooks.useObservableState(graphql.apolloDexClientInstance$);
  const totalLiquidity = hooks.useTotalSupply_(tokenPrices, apolloDex);
  const yesterdayTotalLiquidity = hooks.useTotalSupply_(tokenPrices, apolloDex, true);

  const percentage = useMemo(() => new BigNumber(totalLiquidity)
    .minus(yesterdayTotalLiquidity)
    .div(yesterdayTotalLiquidity)
    .multipliedBy(100)
    .toNumber(),
  [totalLiquidity, yesterdayTotalLiquidity]);

  const [isCreatePoolOpen, setCreatePoolOpen] = useState(false);
  const { tokens } = useContext(TokenContext);

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
        <div className="pools__buttons">
          <Uik.Button
            icon={faPlus}
            text="Create Pool"
            onClick={() => setCreatePoolOpen(true)}
            size="large"
          />
        </div>
      </Uik.Container>

      <CreatePool
        isOpen={isCreatePoolOpen}
        onClose={() => setCreatePoolOpen(false)}
      />

      <MyPoolsList tokens={tokens} />
      <PoolsList tokens={tokens} />
    </div>
  );
};
export default Pools;

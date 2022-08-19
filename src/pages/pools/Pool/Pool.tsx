import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import TokenPricesContext from '../../../context/TokenPricesContext';
import Actions, { ActionTabs } from './Actions';
import Chart from './Chart';
import './pool.css';
import Stats from './Stats';

interface Params {
  address: string;
  action: ActionTabs;
}
interface Time {
  time: Date;
}

// eslint-disable-next-line
const timeToNumber = <T extends Time>(obj: T) => ({
  ...obj,
  time: obj.time.toLocaleDateString('en-CA'),
});

const Pool = (): JSX.Element => {
  const { address, action } = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );

  const [poolInfo] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices,
  );

  const tokenPrice1 = (poolInfo ? tokenPrices[poolInfo.firstToken.address] : 0) || 0;
  const tokenPrice2 = (poolInfo ? tokenPrices[poolInfo.secondToken.address] : 0) || 0;
  const decimal1 = 18; // TODO(poolInfo ? poolInfo.firstToken.] : 0) || 0;
  const decimal2 = 18; // TODO(poolInfo ? poolInfo.firstToken.] : 0) || 0;

  const [poolData] = hooks.usePoolData({
    address,
    decimal1,
    decimal2,
    price1: tokenPrice1,
    price2: tokenPrice2,
  });

  if (!poolInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pool">
      <Stats data={poolInfo} price1={tokenPrice1} price2={tokenPrice2} />

      <div className="pool__content">
        <Actions
          tab={action}
          poolAddress={address}
          address1={poolInfo.firstToken.address}
          address2={poolInfo.secondToken.address}
        />
        <Chart
          tokens={{
            firstToken: {
              name: poolInfo.firstToken.symbol,
              image: poolInfo.firstToken.icon,
            },
            secondToken: {
              name: poolInfo.secondToken.symbol,
              image: poolInfo.secondToken.icon,
            },
          }}
          data={{
            fees: poolData.fees.map(timeToNumber),
            tvl: poolData.tvl.map(timeToNumber),
            volume: poolData.volume.map(timeToNumber),
            firstToken: poolData.firstToken.map(timeToNumber),
            secondToken: poolData.secondToken.map(timeToNumber),
          }}
        />
      </div>
    </div>
  );
};

export default Pool;

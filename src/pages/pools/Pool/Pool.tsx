import { appState, graphql, hooks, ReefSigner } from '@reef-defi/react-lib';
import Uik from '@reef-defi/ui-kit';
import React, { useContext } from 'react';
// import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import TokenPricesContext from '../../../context/TokenPricesContext';
import Actions, { ActionTabs } from './Actions';
// import Chart, { TimeData, Timeframe } from './Chart';
import './pool.css';
import Stats from './Stats';

interface Params {
  address: string;
  action: ActionTabs;
}
// interface Time {
//   time: Date;
// }

// eslint-disable-next-line
// const timeToNumber = <T extends Time>(obj: T) => ({
//   ...obj,
//   time: obj.time.toLocaleDateString('en-CA'),
// });

// const timeframeToTimeData = (timeframe: Timeframe): TimeData => {
//   switch (timeframe) {
//     case 'hour':
//       return { timeUnit: 'Minute', timeSpan: 60 };
//     case 'day':
//       return { timeUnit: 'Hour', timeSpan: 24 };
//     case 'week':
//       return { timeUnit: 'Hour', timeSpan: 7 * 24 };
//     case 'month':
//       return { timeUnit: 'Day', timeSpan: 31 };
//     default:
//       return { timeUnit: 'Hour', timeSpan: 24 };
//   }
// };

const Pool = (): JSX.Element => {
  const { address, action } = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );

  const apolloDex = hooks.useObservableState(graphql.apolloDexClientInstance$);
  const network = hooks.useObservableState(appState.currentNetwork$);
  
  const [poolInfo] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices,
    apolloDex
  );

  const tokenPrice1 = (poolInfo ? tokenPrices[poolInfo.firstToken.address] : 0) || 0;
  const tokenPrice2 = (poolInfo ? tokenPrices[poolInfo.secondToken.address] : 0) || 0;
  // const decimal1 = 18; // TODO(poolInfo ? poolInfo.firstToken.] : 0) || 0;
  // const decimal2 = 18; // TODO(poolInfo ? poolInfo.firstToken.] : 0) || 0;

  // const [timeframe, setTimeframe] = useState<Timeframe>('day');

  // const [poolData] = hooks.usePoolData({
  //   address,
  //   decimal1,
  //   decimal2,
  //   price1: tokenPrice1,
  //   price2: tokenPrice2,
  //   timeData: timeframeToTimeData(timeframe),
  // }, apolloDex);

  if (!poolInfo) {
    return <Uik.Loading />;
  }

  return (
    <div className="pool">
      <Stats 
        data={poolInfo} 
        price1={tokenPrice1} 
        price2={tokenPrice2} 
        reefscanUrl={network.reefscanUrl}
        dexClient={apolloDex} 
      />

      <div className="pool__content">
        <Actions
          tab={action}
          poolAddress={address}
          address1={poolInfo.firstToken.address}
          address2={poolInfo.secondToken.address}
        />
        {/* <Chart
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
          data = {
            poolData ? {
              fees: poolData.fees.map(timeToNumber),
              tvl: poolData.tvl.map(timeToNumber),
              volume: {
                firstToken: poolData.firstTokenVolume.map(timeToNumber),
                secondToken: poolData.secondTokenVolume.map(timeToNumber),
                total: poolData.volume.map(timeToNumber),
              },
              firstToken: poolData.firstToken.map(timeToNumber),
              secondToken: poolData.secondToken.map(timeToNumber),
            } 
            : undefined
          }
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        /> */}
      </div>
    </div>
  );
};

export default Pool;

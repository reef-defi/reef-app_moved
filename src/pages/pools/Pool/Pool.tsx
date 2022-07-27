import './pool.css';
import React, { useContext, useMemo } from 'react';
import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import { useParams } from 'react-router-dom';
import { BigNumber } from 'bignumber.js';
import Stats from './Stats';
import Chart from './Chart';
import Actions from './Actions';
import TokenPricesContext from '../../../context/TokenPricesContext';


interface Params {
  address: string;
  action: string;
}

const Pool = (): JSX.Element => {
  const { address } = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );

  const fromTime = useMemo(
    () => Date.now() - 70 * 24 * 60 * 60 * 1000,
    [],
  );

  const [poolInfo, loading] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices,
  );


  const tokenPrice1 = poolInfo ? tokenPrices[poolInfo.firstToken.address] : 0;
  const tokenPrice2 = poolInfo ? tokenPrices[poolInfo.secondToken.address] : 0;

  const { data: candlestick1 } = hooks.useDayCandlestick(address, fromTime, 1);
  const { data: candlestick2 } = hooks.useDayCandlestick(address, fromTime, 2);
  const { data: volumeData } = hooks.useDayPoolVolume(address, fromTime);
  const { data: feeData } = hooks.useDayPoolFee(address, fromTime);
  const { data: tvlData } = hooks.useDayTvl(address, fromTime);

  const firstToken = useMemo(
    () => (candlestick1
      ? candlestick1.pool_day_candlestick.map(
        ({
          close_1, high_1, low_1, open_1, timeframe,
        }) => ({
          close: close_1,
          high: high_1,
          low: low_1,
          open: open_1,
          time: new Date(timeframe).toLocaleDateString().split('/').reverse()
            .join('-'),
        }),
      )
      : []),
    [candlestick1],
  );
  const secondToken = useMemo(
    () => (candlestick2
      ? candlestick2.pool_day_candlestick.map(
        ({
          close_2, high_2, low_2, open_2, timeframe,
        }) => ({
          close: close_2,
          high: high_2,
          low: low_2,
          open: open_2,
          time: new Date(timeframe).toLocaleDateString().split('/').reverse()
            .join('-'),
        }),
      )
      : []),
    [candlestick2],
  );
  const tvl = useMemo(
    () => (tvlData
      ? tvlData.pool_day_supply.map(({ total_supply, timeframe }) => ({
        value: total_supply,
        time: new Date(timeframe).toLocaleDateString().split('/').reverse()
          .join('-'),
      }))
      : []),
    [tvlData],
  );
  const fees = useMemo(
    () => (feeData
      ? feeData.pool_day_fee.map(({ fee_1, fee_2, timeframe }) => ({
        value: new BigNumber(fee_1)
          .multipliedBy(tokenPrice1)
          .plus(new BigNumber(fee_2).multipliedBy(tokenPrice2))
          .toNumber(),
        time: new Date(timeframe).toLocaleDateString().split('/').reverse()
          .join('-'),
      }))
      : []),
    [feeData, tokenPrice1, tokenPrice2],
  );
  const volume = useMemo(
    () => (volumeData
      ? volumeData.pool_day_volume.map(
        ({ timeframe, amount_1, amount_2 }) => ({
          value: new BigNumber(amount_1)
            .multipliedBy(tokenPrice1)
            .plus(new BigNumber(amount_2).multipliedBy(tokenPrice2))
            .toNumber(),
          time: new Date(timeframe).toLocaleDateString().split('/').reverse()
            .join('-'),
        }),
      )
      : []),
    [volumeData, tokenPrice1, tokenPrice2],
  );

  if (!poolInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pool">
      <Stats data={poolInfo} />

      <div className="pool__content">
        <Actions 
          address1={poolInfo.firstToken.address}
          address2={poolInfo.secondToken.address}
        />
        <Chart
          tokens={{
            firstToken: {
              name: poolInfo.firstToken.symbol,
              image: poolInfo.firstToken.icon
            },
            secondToken: {
              name: poolInfo.secondToken.symbol,
              image: poolInfo.secondToken.icon
            }
            }}
          data={{
            firstToken,
            secondToken,
            tvl,
            fees,
            volume,
          }}
        />
      </div>
    </div>
  );
};

export default Pool;

import './pool.css';
import React, { useContext, useMemo } from 'react';
import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import { useParams } from 'react-router-dom';
import { BigNumber } from 'bignumber.js';
import Stats from './Stats';
import Chart from './Chart';
import Actions from './Actions';
import TokenPricesContext from '../../../context/TokenPricesContext';
import { CandlestickData } from './LWChart';
import { PoolDayCandlestickQuery } from '@reef-defi/react-lib/dist/graphql/pools';


interface Params {
  address: string;
  action: string;
}

const preprocess = <T extends {time: Date}>(data: T[], first: T, last: T, missing: (v: T, time: Date) => T): T[] => {
  const r = [...data, last]
  .reduce((acc, item) => { 
    const last = acc[acc.length-1];
    const lastDate = new Date(last.time);
    lastDate.setDate(lastDate.getDate() + 1);

    while (lastDate < item.time) {
      acc.push(missing(last, new Date(lastDate)))
      lastDate.setDate(lastDate.getDate() + 1);
    }
    acc.push(item);
    return acc;
  }, [first])
  return r.slice(1, r.length-1);
}

const processCandlestick = (data: PoolDayCandlestickQuery, prevDay: PoolDayCandlestickQuery, whichToken: 1 | 2 = 1): CandlestickData[] => [...data.pool_day_candlestick.map(({
    close_1, high_1, low_1,close_2,high_2,low_2,open_2, open_1, timeframe,
  }) => ({
    close: whichToken === 1 ? close_1 : close_2,
    high: whichToken === 1 ? high_1 : high_2,
    low: whichToken === 1 ? low_1 : low_2,
    open: whichToken === 1 ? open_1 : open_2,
    time: new Date(timeframe),
  })), 
  {
    close: 0,
    high: 0,
    low: 0,
    open: 0,
    time: new Date(Date.now()),
  }
]
  .reduce((acc, item) => { 
    const last = acc[acc.length-1];
    const lastDate = new Date(last.time);
    lastDate.setDate(lastDate.getDate() + 1);

    while (lastDate < item.time) {
      acc.push({time: new Date(lastDate), close: last.close, high: last.close, low: last.close, open: last.close});
      lastDate.setDate(lastDate.getDate() + 1);
    }
    acc.push(item);
    return acc;
  }, [{
    close: whichToken === 1 ? prevDay.pool_day_candlestick[0].close_1 : prevDay.pool_day_candlestick[0].close_2,
    high: whichToken === 1 ? prevDay.pool_day_candlestick[0].high_1 : prevDay.pool_day_candlestick[0].high_2,
    low: whichToken === 1 ? prevDay.pool_day_candlestick[0].low_1 : prevDay.pool_day_candlestick[0].low_2,
    open: whichToken === 1 ? prevDay.pool_day_candlestick[0].open_1 : prevDay.pool_day_candlestick[0].open_2,
    time: new Date(prevDay.pool_day_candlestick[0].timeframe),
  }])
  .map((item): CandlestickData => ({...item, time: item.time.toLocaleDateString().split('/').reverse().join('-')}))
  .slice(1)


interface Mid {value: number, time: Date}
interface Out {value: number, time: string}

const processEmptySpaces = (data: Mid[], fromDate: Date): Out[] => 
  [...data, {value: 0, time: new Date(Date.now())}].reduce((acc, item) => {
    const last = acc[acc.length-1];
    const lastDate = new Date(last.time);
    lastDate.setDate(lastDate.getDate() + 1);

    while (lastDate < item.time) {
      acc.push({time: new Date(lastDate), value: 0});
      lastDate.setDate(lastDate.getDate() + 1);
    }
    acc.push(item)
    return acc;
  }, [
    {value: 0, time: new Date(fromDate)}
  ])
  .map((item) => ({...item, time: item.time.toLocaleDateString().split('/').reverse().join('-')}))
  .slice(1)

const Pool = (): JSX.Element => {
  const { address } = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );

  const fromTime = useMemo(
    () => Date.now() - 31 * 24 * 60 * 60 * 1000,
    [],
  );

  const [poolInfo, loading] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices,
  );


  const tokenPrice1 = (poolInfo ? tokenPrices[poolInfo.firstToken.address] : 0) || 0;
  const tokenPrice2 = (poolInfo ? tokenPrices[poolInfo.secondToken.address] : 0) || 0;

  const { data: lastDay1 } = hooks.useLastDayCandlestick(address, fromTime, 1);
  const { data: lastDay2 } = hooks.useLastDayCandlestick(address, fromTime, 2);
  const { data: candlestick1 } = hooks.useDayCandlestick(address, fromTime, 1);
  const { data: candlestick2 } = hooks.useDayCandlestick(address, fromTime, 2);
  const { data: volumeData } = hooks.useDayPoolVolume(address, fromTime);
  const { data: feeData } = hooks.useDayPoolFee(address, fromTime);
  const { data: tvlData } = hooks.useDayTvl(address, fromTime);

  const firstToken = useMemo(() => candlestick1 && lastDay1 && lastDay1.pool_day_candlestick.length > 0
    ? processCandlestick(candlestick1, lastDay1, 1)
    : [],
    [candlestick1, lastDay1]
  );

  // console.log(firstToken)
  const secondToken = useMemo(() => candlestick2 && lastDay2 && lastDay2.pool_day_candlestick.length > 0
    ? processCandlestick(candlestick2, lastDay2, 2)
    : [],
    [candlestick2, lastDay2]
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
      ? processEmptySpaces(feeData.pool_day_fee.map(({ fee_1, fee_2, timeframe }) => ({
        value: new BigNumber(fee_1)
          .multipliedBy(tokenPrice1)
          .plus(new BigNumber(fee_2).multipliedBy(tokenPrice2))
          .toNumber(),
        time: new Date(timeframe),
      })), new Date(fromTime))
      : []),
    [feeData, tokenPrice1, tokenPrice2],
  );
  const volume = useMemo(
    () => (volumeData
      ? processEmptySpaces(volumeData.pool_day_volume.map(
        ({ timeframe, amount_1, amount_2 }) => ({
          value: new BigNumber(amount_1)
            .multipliedBy(tokenPrice1)
            .plus(new BigNumber(amount_2).multipliedBy(tokenPrice2))
            .toNumber(),
          time: new Date(timeframe),
        }),
      ), new Date(fromTime))
      : []),
    [volumeData, tokenPrice1, tokenPrice2],
  );

  if (!poolInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pool">
      <Stats data={poolInfo} price1={tokenPrice1} price2={tokenPrice2} />

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

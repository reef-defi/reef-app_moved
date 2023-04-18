import React, { useState, useMemo } from 'react';
import Uik from '@reef-defi/ui-kit';
import './chart.css';
import LWChart, { HistogramData, CandlestickData } from './LWChart';

export interface Volume {
  firstToken: HistogramData[],
  secondToken: HistogramData[],
  total: HistogramData[]
}

export interface Data {
  firstToken: CandlestickData[],
  secondToken: CandlestickData[],
  tvl: HistogramData[],
  volume: Volume,
  fees: HistogramData[]
}

export interface Token {
  name: string,
  image?: string
}

export interface Tokens {
  firstToken: Token,
  secondToken: Token
}

export type Timeframe = 'hour' | 'day' | 'week' | 'month';

type TimeUnit = 'Day' | 'Hour' | 'Minute';
export interface TimeData {
  timeUnit: TimeUnit;
  timeSpan: number;
}

export interface Props {
  tokens: Tokens,
  data?: Data,
  timeframe: Timeframe,
  setTimeframe: (value: Timeframe) => void
}

const chartTypes = {
  firstToken: 'candlestick',
  secondToken: 'candlestick',
  tvl: 'area',
  volume: 'histogram',
  fees: 'histogram',
};

const Chart = ({
  tokens,
  data,
  timeframe,
  setTimeframe,
}: Props): JSX.Element => {
  const [tab, setTab] = useState('firstToken');

  const getData = useMemo(() => {
    // @ts-ignore-next-line
    const chartData = data?.[tab] || [];
    if (tab === 'volume') return chartData.total || [];
    return chartData;
  }, [data, tab]);

  const getSubData = useMemo(() => {
    if (tab === 'firstToken' || tab === 'secondToken') {
      return data?.volume?.[tab] || [];
    }

    return undefined;
  }, [data, tab]);

  return (
    <div className="pool-chart">
      <Uik.Card>
        <div className="pool-chart__top">
          <Uik.Tabs
            value={tab}
            onChange={(value) => setTab(value)}
            options={[
              { value: 'firstToken', text: tokens.firstToken?.name || '' },
              { value: 'secondToken', text: tokens.secondToken?.name || '' },
              { value: 'tvl', text: 'Liquidity' },
              { value: 'volume', text: 'Volume' },
              { value: 'fees', text: 'Fees' },
            ]}
          />

          <Uik.Tabs
            value={timeframe}
            onChange={(value) => setTimeframe(value)}
            options={[
              { value: 'hour', text: '1h' },
              { value: 'day', text: '1D' },
              { value: 'week', text: '1W' },
              { value: 'month', text: '1M' },
            ]}
          />
        </div>

        {
          !!getData.length
          && (
          <LWChart
            key={tab}
            // @ts-ignore-next-line
            type={chartTypes[tab]}
            data={getData}
            subData={getSubData}
            timeVisible={timeframe !== 'month'}
          />
          )
        }
      </Uik.Card>
    </div>
  );
};

export default Chart;

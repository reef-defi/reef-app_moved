import React, { useState, useMemo } from 'react';
import Uik from '@reef-defi/ui-kit';
import './chart.css';
import LWChart, { HistogramData, CandlestickData } from './LWChart';

export interface Data {
  firstToken: CandlestickData[],
  secondToken: CandlestickData[],
  tvl: HistogramData[],
  volume: HistogramData[],
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

export interface Props {
  tokens: Tokens,
  data: Data
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
}: Props): JSX.Element => {
  const [tab, setTab] = useState('firstToken');

  // @ts-ignore-next-line
  const getData = useMemo(() => (data?.[tab] || []), [data, tab]);

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
        </div>

        {
          getData.length
          && (
          <LWChart
            key={tab}
            // @ts-ignore-next-line
            type={chartTypes[tab]}
            data={getData}
          />
          )
        }
      </Uik.Card>
    </div>
  );
};

export default Chart;

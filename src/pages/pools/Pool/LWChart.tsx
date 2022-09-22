import React, { useRef, useEffect, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import './lw-chart.css';

export interface BusinessDay {
  day: number,
  year: number,
  month: number
}

export interface AreaData {
  value?: number,
  time?: number | string
}

export interface HistogramData {
  value?: number,
  time?: number | string,
  direction?: 'up' | 'down'
}

export interface CandlestickData {
  open?: number,
  high?: number,
  low?: number,
  close?: number,
  time?: number | string | BusinessDay
}

export type Type = 'histogram' | 'candlestick' | 'area'

export type Data = HistogramData[] | CandlestickData[] | AreaData[]

export interface Props {
  type: Type,
  data: Data,
  subData?: HistogramData[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priceFormatter = (price: any): string => {
  const base = Math.max(price, price * -1);
  if (base > 0 && base < 0.001) return parseFloat(price).toFixed(8);
  if (base >= 0.001 && base < 0.01) return parseFloat(price).toFixed(6);
  if (base >= 0.01 && base < 0.1) return parseFloat(price).toFixed(4);
  return parseFloat(price).toFixed(2);
};

const chartOptions = {
  layout: {
    textColor: '#898e9c',
    fontSize: 12,
    fontFamily: "'Poppins', sans-serif",
    background: {
      type: 'solid',
      color: '#eeebf6',
    },
  },
  rightPriceScale: {
    borderColor: '#b7becf',
  },
  timeScale: {
    borderColor: '#b7becf',
  },
  crosshair: {
    vertLine: {
      color: '#a328ab',
      labelBackgroundColor: '#a328ab',
    },
    horzLine: {
      color: '#a328ab',
      labelBackgroundColor: '#a328ab',
    },
  },
  grid: {
    vertLines: {
      color: '#d8dce6',
    },
    horzLines: {
      color: '#d8dce6',
    },
  },
  localization: {
    priceFormatter: (price: number) => `$${priceFormatter(price)}`,
  },
};

const seriesOptions = {
  priceFormat: {
    minMove: 0.00000001,
    formatter: priceFormatter,
  },
};

const addHistogramSeries = (
  chart: IChartApi,
  data: HistogramData[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
  colors: { up: string, down: string } = { up: '#35c47c', down: '#e73644' },
): void => {
  const upSeries = chart.addHistogramSeries({ color: colors.up, ...seriesOptions, ...options });
  const downSeries = chart.addHistogramSeries({ color: colors.down, ...seriesOptions, ...options });

  const upData = [];
  const downData = [];

  for (let i = 0; i < data.length; i += 1) {
    // @ts-ignore-next-line
    const direction = data[i]?.direction;

    if (direction === 'up') {
      // @ts-ignore-next-line
      upData.push(data[i]);
    } else if (direction === 'down') {
      // @ts-ignore-next-line
      downData.push(data[i]);
    } else {
      // @ts-ignore-next-line
      const value = data[i]?.value || 0;
      // @ts-ignore-next-line
      const prevValue = data[i - 1]?.value || 0;

      // @ts-ignore-next-line
      if (value < prevValue) downData.push(data[i]);
      // @ts-ignore-next-line
      else upData.push(data[i]);
    }
  }

  // @ts-ignore-next-line
  upSeries.setData(upData);
  // @ts-ignore-next-line
  downSeries.setData(downData);
};

const addAreaSeries = (chart: IChartApi, data: AreaData[]): void => {
  const series = chart.addAreaSeries({
    topColor: 'rgba(163, 40, 171, 0.4)',
    bottomColor: 'rgba(163, 40, 171, 0)',
    lineColor: '#a328ab',
    ...seriesOptions,
  });

  // @ts-ignore-next-line
  series.setData(data);
};

const addCandlestickSeries = (chart: IChartApi, data: CandlestickData[]): void => {
  const series = chart.addCandlestickSeries({
    upColor: '#35c47c',
    downColor: '#e73644',
    borderVisible: false,
    wickUpColor: '#35c47c',
    wickDownColor: '#e73644',
    ...seriesOptions,
  });

  // @ts-ignore-next-line
  series.setData(data);
};

const processSubData = (data: CandlestickData[], subdata: HistogramData[]): HistogramData[] => {
  const output: HistogramData[] = [];

  for (let i = 0; i < subdata.length; i += 1) {
    const candle = data[i];
    const item = subdata[i];
    let direction: 'up' | 'down' | undefined;

    if (candle) {
      const { open, close } = candle;
      if (open !== undefined && close !== undefined) {
        if (open > close) direction = 'down';
        else if (open <= close) direction = 'up';
      }
    }

    output.push({ ...item, direction });
  }

  return output;
};

const renderChart = ({
  el, type, data, subData,
}: {
 el: HTMLElement | null,
 type: Type,
 data: Data,
 subData?: HistogramData[]
}): void => {
  if (!el) return;

  const { height } = el.getBoundingClientRect();
  const options = chartOptions;

  // @ts-ignore-next-line
  const chart: IChartApi = createChart(el, { height, ...options });

  if (type === 'histogram') {
    addHistogramSeries(chart, data as HistogramData[]);
  } else if (type === 'area') {
    addAreaSeries(chart, data as AreaData[]);
  } else if (type === 'candlestick') {
    if (subData) {
      addHistogramSeries(chart, processSubData(data, subData), {
        priceScaleId: '',
        scaleMargins: {
          top: 0.9,
          bottom: 0,
        },
      }, {
        up: 'rgba(53, 196, 124, 0.5)',
        down: 'rgba(231, 54, 68, 0.5)',
      });
    }

    addCandlestickSeries(chart, data as CandlestickData[]);
  }

  chart.timeScale().fitContent();
};

const formatData = (type: Type, data: Data = []): Data => {
  if (type === 'candlestick') {
    const output: CandlestickData[] = [];

    for (let i = 0; i < data.length; i += 1) {
      const item: CandlestickData = data[i];
      const prevItem: CandlestickData = data[i - 1];

      const open = prevItem?.close || item.open;

      output.push({
        open,
        close: item.close,
        high: item.high,
        low: item.low,
        time: item.time,
      });
    }

    return output;
  }

  return data;
};

const Licence = (): JSX.Element => (
  <a href="https://www.tradingview.com/" target="_blank" className="lw-chart__licence" rel="noreferrer">
    <div className="lw-chart__licence-logo">
      <svg viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 22H7V11H0V4h14v18zM28 22h-8l7.5-18h8L28 22z" fill="currentColor" />
        <circle cx="20" cy="8" r="4" fill="currentColor" />
      </svg>
    </div>

    <div className="lw-chart__licence-text">
      TradingView Lightweight Charts
      <br />
      Copyright (&copy;) 2022 TradingView, Inc. https://www.tradingview.com/
    </div>
  </a>
);

const LWChart = ({
  type = 'histogram',
  data,
  subData,
}: Props): JSX.Element => {
  const chartWrapper = useRef(null);
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (!isRendered && data?.length) {
      renderChart({
        el: chartWrapper.current,
        type,
        data: formatData(type, data),
        subData,
      });
      setRendered(true);
    }
  }, [data, type]);

  return (
    <div className="lw-chart__wrapper">
      <Licence />

      <div
        ref={chartWrapper}
        className="lw-chart"
      />
    </div>
  );
};

export default LWChart;

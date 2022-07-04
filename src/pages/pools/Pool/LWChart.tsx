import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import './lw-chart.css';

export interface AreaData {
  value?: number,
  time?: number | string
}

export interface HistogramData {
  value?: number,
  time?: number | string
}

export interface CandlestickData {
  open?: number,
  high?: number,
  low?: number,
  close?: number,
  time?: number | string
}

export type Type = 'histogram' | 'candlestick' | 'area'

export type Data = HistogramData[] | CandlestickData[] | AreaData[]

export interface Props {
  type: Type,
  data: Data
}

const chartOptions = {
  layout: {
    textColor: '#394259',
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
};

const renderChart = ({ el, type, data }: {
 el: HTMLElement | null,
 type: Type,
 data: Data
}): void => {
  if (!el) return;

  const { height } = el.getBoundingClientRect();
  const options = chartOptions;

  // @ts-ignore-next-line
  const chart = createChart(el, { height, ...options });

  if (type === 'histogram') {
    const upSeries = chart.addHistogramSeries({ color: '#35c47c' });
    const downSeries = chart.addHistogramSeries({ color: '#e73644' });

    const upData = [];
    const downData = [];

    for (let i = 0; i < data.length; i += 1) {
      // @ts-ignore-next-line
      const value = data[i]?.value || 0;
      // @ts-ignore-next-line
      const prevValue = data[i - 1]?.value || 0;

      // @ts-ignore-next-line
      if (value < prevValue) downData.push(data[i]);
      // @ts-ignore-next-line
      else upData.push(data[i]);
    }

    // @ts-ignore-next-line
    upSeries.setData(upData);
    // @ts-ignore-next-line
    downSeries.setData(downData);
  } else if (type === 'area') {
    const series = chart.addAreaSeries({
      topColor: 'rgba(163, 40, 171, 0.4)',
      bottomColor: 'rgba(163, 40, 171, 0)',
      lineColor: '#a328ab',
    });

    // @ts-ignore-next-line
    series.setData(data);
  } else if (type === 'candlestick') {
    const series = chart.addCandlestickSeries({
      upColor: '#35c47c',
      downColor: '#e73644',
      borderVisible: false,
      wickUpColor: '#35c47c',
      wickDownColor: '#e73644',
    });

    // @ts-ignore-next-line
    series.setData(data);
  }

  chart.timeScale().fitContent();
};

const LWChart = ({
  type = 'histogram',
  data,
}: Props): JSX.Element => {
  const chartWrapper = useRef(null);
  let rendered = false;

  useEffect(() => {
    if (!rendered && data?.length) {
      renderChart({
        el: chartWrapper.current,
        type,
        data,
      });
      rendered = true;
    }
  }, []);

  return (
    <div
      ref={chartWrapper}
      className="lw-chart"
    />
  );
};

export default LWChart;

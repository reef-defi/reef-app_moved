import React from "react"

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute } from "d3-time";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import {MouseCoordinateX, MouseCoordinateY, CrossHairCursor} from "react-stockcharts/lib/coordinates"
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {OHLCTooltip} from "react-stockcharts/lib/tooltip"
import { fitWidth } from "react-stockcharts/lib/helper";
import { first, last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

export interface OHLC {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface MyChart {
  data: OHLC[];
  width: number;
  ratio: number;
  type?: "svg" | "hybrid"
}

const HEIGHT = 565;

const CandlestickChart = ({data, width, ratio, type="svg"} : MyChart): JSX.Element => {
  const xAccessor = d => d.date;
  const xExtents = [
    xAccessor(last(data)),
    xAccessor(first(data)),
  ];
  const margin = { left: 30, right: 40, top: 10, bottom: 30 };
  // var gridHeight = HEIGHT - margin.top - margin.bottom;
  // var gridWidth = width - margin.left - margin.right;

  // var showGrid = true;
  // var yGrid = showGrid ? { 
  //     innerTickSize: -1 * gridWidth,
  //     tickStrokeDasharray: 'Solid',
  //     tickStrokeOpacity: 0.2,
  //     tickStrokeWidth: 1
  // } : {};
  // var xGrid = showGrid ? { 
  //     innerTickSize: -1 * gridHeight,
  //     tickStrokeDasharray: 'Solid',
  //     tickStrokeOpacity: 0.2,
  //     tickStrokeWidth: 1
  // } : {};


  return (
    <ChartCanvas
      seriesName="MSFT"
      ratio={ratio}
      width={width}
      height={HEIGHT}
      margin={margin}
      type={type}
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
      mouseMoveEvent={true}
      panEvent={false}
      zoomEvent={false}
      clamp={false}
    >

      <Chart id={1} yExtents={d => [d.high + d.high * .1, d.low - d.low * .1]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={8} />
        <YAxis axisAt="left" orient="left" ticks={6} />

        <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M:%S")} />
        <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} />

        <CandlestickSeries width={timeIntervalBarWidth(utcMinute)}/>

        {/* <OHLCTooltip origin={[-40, 0]} forChart={1} /> */}
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
}

export default fitWidth(CandlestickChart);
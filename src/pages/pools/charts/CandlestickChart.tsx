import React from "react"

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute } from "d3-time";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import {MouseCoordinateX, CrossHairCursor, CurrentCoordinate} from "react-stockcharts/lib/coordinates"
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { CHART_HEIGHT, CHART_MARGIN, DefaultChart } from "./types";

export interface OHLC {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface CandlestickChart extends DefaultChart {
  data: OHLC[];
}


const CandlestickChart = ({data, width, ratio, fromDate, toDate, type="svg"} : CandlestickChart): JSX.Element => (
  <ChartCanvas
    seriesName="MSFT"
    ratio={ratio}
    width={width}
    height={CHART_HEIGHT}
    margin={CHART_MARGIN}
    type={type}
    data={data}
    xAccessor={d => d.date}
    xScale={scaleTime()}
    xExtents={[fromDate, toDate]}
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

      <CandlestickSeries width={timeIntervalBarWidth(utcMinute)}/>

      <CurrentCoordinate yAccessor={d => d.close} fill={d => d.close} />
      
      <SingleValueTooltip
        yAccessor={(d) => d.close}
        yDisplayFormat={(d) => "$ " + format('.4f')(d)}
        fontSize={21}
        origin={[20, 10]}/>
      <SingleValueTooltip
        yAccessor={(d) => d.date}
        fontSize={14}
        yDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}
        origin={[20, 30]}/>
    </Chart>
    
    <CrossHairCursor />
  </ChartCanvas>
);

export default fitWidth(CandlestickChart);
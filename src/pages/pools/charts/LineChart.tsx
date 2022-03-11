import React from "react"

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute } from "d3-time";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import {MouseCoordinateX, MouseCoordinateY, CrossHairCursor, EdgeIndicator, CurrentCoordinate} from "react-stockcharts/lib/coordinates"
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {OHLCTooltip, ToolTipText, SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import { fitWidth } from "react-stockcharts/lib/helper";
import { first, last } from "react-stockcharts/lib/utils";
import { CHART_HEIGHT, CHART_MARGIN, DefaultChart } from "./types";
import "./Chart.css";
import {
	ScatterSeries,
	SquareMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { formatAmount } from "../../../utils/utils";

interface LineData {
  date: Date;
  amount: number;
}

interface LineChart extends DefaultChart {
  data: LineData[]
}

const LineChart = ({ratio, width, type, data, fromDate, toDate} : LineChart): JSX.Element => (
  <ChartCanvas
    ratio={ratio} 
    width={width} 
    height={CHART_HEIGHT}
    margin={CHART_MARGIN}
    type={type}
    pointsPerPxThreshold={1}
    seriesName="MSFT"
    data={data}
    xAccessor={d => d.date}
    xScale={scaleTime()}
    xExtents={[fromDate, toDate]}
    mouseMoveEvent={true}
    panEvent={false}
    zoomEvent={false}
    clamp={false}
  >
    <Chart id={1} yExtents={d => [d.amount + d.amount * .1, d.amount - d.amount * .1]}>
      <XAxis axisAt="bottom" orient="bottom" ticks={8} />
      <YAxis 
        axisAt="left" 
        orient="left"
        ticks={6} 
        displayFormat={(d) => formatAmount(d, 18)}
      />

      <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d %H:%M:%S")} />
      <LineSeries
        yAccessor={d => d.amount}
        stroke="#ff7f0e"
        strokeDasharray="Solid" /> 
      <ScatterSeries
        yAccessor={d => d.amount}
        marker={SquareMarker}
        markerProps={{ width: 6, stroke: "#ff7f0e", fill: "#ff7f0e" }} />
      <CurrentCoordinate yAccessor={d => d.amount} fill={d => d.amount} />

      <SingleValueTooltip
        yAccessor={(d) => d.amount}
        yDisplayFormat={(d) => formatAmount(d, 18)}
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

export default fitWidth(LineChart);
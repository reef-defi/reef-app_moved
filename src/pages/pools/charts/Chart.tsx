import React from "react"

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { first, last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => {
      return tsvParse(data, parseData(parseDate))
    })
	return promiseMSFT;
}

interface OHCL {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface MyChart {
  data: OHCL[];
  width: number;
  ratio: number;
  type?: "svg" | "hybrid"
}

const MyChart = ({data, width, ratio, type="svg"} : MyChart): JSX.Element => {

  const xAccessor = d => d.date;
  const xExtents = [
    xAccessor(last(data)),
    xAccessor(first(data)),
  ];
  return (
    <ChartCanvas
      ratio={ratio}
      width={width}
      height={565}
      margin={{ left: 30, right: 10, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >

      <Chart id={1} yExtents={d => [d.high + d.high * .1, d.low - d.low * .1]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcMinute)}/>
      </Chart>
    </ChartCanvas>
  );
}

export default fitWidth(MyChart);
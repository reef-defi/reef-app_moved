import React from "react"
import { useQuery, gql } from "@apollo/client"
import { AddressVar } from "../poolTypes";
import { Components } from "@reef-defi/react-lib";
import { timeFormat } from "d3-time-format";

import { Chart } from "react-stockcharts";
import {MouseCoordinateX, CrossHairCursor, CurrentCoordinate} from "react-stockcharts/lib/coordinates"
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import "./Chart.css";
import {
	ScatterSeries,
	SquareMarker,
	LineSeries,
} from "react-stockcharts/lib/series";
import { formatAmount } from "../../../utils/utils";
import DefaultChart from "./DefaultChart";

const { Loading } = Components.Loading;

interface TVLChart {
  address: string;
}

const TVL_GQL = gql`
query pool_supply($address: String!) {
  pool_minute_supply(
    where: { 
      pool: { address: { _ilike: $address } } 
    }
    order_by: { timeframe: asc }
  ) {
    total_supply
    timeframe
  }
}`

interface TVLData {
  total_supply: number;
  timeframe: string;
}

type TVLQuery = { pool_minute_supply: TVLData[] }
interface TVlVar extends AddressVar {
  // fromTime: string;
}

const TVLChart = ({address} : TVLChart): JSX.Element => {
  const {loading, data} = useQuery<TVLQuery, TVlVar>(
    TVL_GQL,
    { variables: {
      address,
      // fromTime: toTimestamp(new Date(Date.now() - 1000 * 60 * 60 * 24))         
    }}
  );

  const toDate = Date.now();
  const fromDate = toDate - 60 * 60 * 1000; // last hour

  let tvl = data
    ? data.pool_minute_supply
        .map(({timeframe, total_supply}) => ({
          date: new Date(timeframe),
          amount: total_supply
        }))
    : [];

  if (tvl.length > 0 && toDate - tvl[tvl.length-1].date.getTime() > 1000 * 60) {
    tvl.push({...tvl[tvl.length-1], date: new Date(toDate)});
  }

  if (loading || tvl.length === 0) {
    return (<Loading />);
  }
  return (
    <DefaultChart
      data={tvl}
      fromDate={new Date(fromDate)}
      toDate={new Date(toDate)}
      type="svg"
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
    </DefaultChart>
  );
}

export default TVLChart;
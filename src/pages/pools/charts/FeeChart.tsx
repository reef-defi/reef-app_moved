import React from "react"
import { useQuery, useSubscription, gql } from "@apollo/client"
import { AddressVar, BasicVar } from "../poolTypes";
import { Components } from "@reef-defi/react-lib";
import { timeFormat } from "d3-time-format";
import { Chart } from "react-stockcharts";
import {MouseCoordinateX, CrossHairCursor, CurrentCoordinate} from "react-stockcharts/lib/coordinates"
import {
	GroupedBarSeries,
} from "react-stockcharts/lib/series";

import { scaleOrdinal, schemeCategory10, scalePoint } from  "d3-scale";
import { set } from "d3-collection";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import { formatAmount, std, toTimestamp } from "../../../utils/utils";
import DefaultChart from "./DefaultChart";
import { BasicPoolInfo } from "./types";
const { Loading } = Components.Loading;

const FEE_GQL = gql`
subscription fee($address: String!, $fromTime: timestamptz!) {
  pool_hour_fee(
    where: { 
      timeframe: { _gte: $fromTime }
      pool: { address: { _ilike: $address } } 
    }
    order_by: { timeframe: asc }
  ) {
    fee_1
    fee_2
    timeframe
  }
}
`;

interface Fee {
  fee_1: number;
  fee_2: number;
  timeframe: string;
}

type FeeQuery = { pool_hour_fee: Fee[] };


const FeeChart = ({address, symbol1, symbol2, decimal1, decimal2} : BasicPoolInfo): JSX.Element => {
  const toDate = Date.now();
  const fromDate = toDate - 50 * 60 * 60 * 1000; // last 50 hour
  
  const { data, loading } = useSubscription<FeeQuery, BasicVar>(
    FEE_GQL,
    {
      variables: {
        address,
        fromTime: toTimestamp(new Date(fromDate))         
      }
    }
  )

  if (loading || !data) {
    return <Loading />
  }

  const feeData = data.pool_hour_fee
    .map((d) => ({...d, date: new Date(d.timeframe)}))

  if (feeData.length === 0) {
    return <span>No data found</span>
  }

  const values: number[] = feeData.reduce((acc, {fee_1, fee_2}) => [...acc, fee_1, fee_2], []);
  const adjust = std(values);

  const f = scaleOrdinal(schemeCategory10)
    .domain(set(feeData.map(d => d.timeframe)));

  const fill = (d, i) => f(i);
  return (
    <DefaultChart
      data={feeData}
      fromDate={new Date(fromDate)}
      toDate={new Date(toDate)}
      type="svg"
    >
      <Chart id={1} yExtents={d => [d.fee_1 + adjust, d.fee_2 + adjust, 0]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={8} />
        <YAxis 
          axisAt="left" 
          orient="left"
          ticks={6} 
          displayFormat={(d) => d}
        />

        <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />

        <CurrentCoordinate yAccessor={d => d.fee_1} fill={d => d.fee_1} />
        <CurrentCoordinate yAccessor={d => d.fee_2} fill={d => d.fee_2} />

        <GroupedBarSeries 
          yAccessor={[d => d.fee_1, d => d.fee_2]}
          fill={fill}
          spaceBetweenBar={3}
          width={20}
        />

        <SingleValueTooltip
          yAccessor={(d) => d.fee_1}
          yDisplayFormat={(d) => formatAmount(d, decimal1) + ` ${symbol1}`}
          fontSize={21}
          origin={[20, 10]}/>
        <SingleValueTooltip
          yAccessor={(d) => d.fee_2}
          yDisplayFormat={(d) => formatAmount(d, decimal2) + ` ${symbol2}`}
          fontSize={21}
          origin={[20, 30]}/>
        <SingleValueTooltip
          yAccessor={(d) => d.date}
          fontSize={14}
          yDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}
          origin={[20, 50]}/>
      </Chart>

      <CrossHairCursor />
    </DefaultChart>
  );
}

export default FeeChart;
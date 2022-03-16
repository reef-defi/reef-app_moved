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

import { scaleOrdinal, schemeCategory10 } from  "d3-scale";
import { set } from "d3-collection";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import { dropDuplicatesMultiKey, formatAmount, formatBasicAmount, std, toTimestamp } from "../../../utils/utils";
import DefaultChart from "./DefaultChart";
import { BasicPoolInfo } from "./types";

const { Loading } = Components.Loading;

const VOLUME_GQL = gql`
subscription volume($address: String!, $fromTime: timestamptz!) {
  pool_hour_volume(
    where: { 
      timeframe: { _gte: $fromTime }
      pool: { address: { _ilike: $address } }
    }
    order_by: { timeframe: asc }
  ) {
    amount_1
    amount_2
    timeframe
  }
}
`;

interface Volume {
  amount_1: number;
  amount_2: number;
  timeframe: string;
}

type VolumeQuery = { pool_hour_volume: Volume[] };

const VolumeChart = ({address, symbol1, symbol2, decimal1, decimal2} : BasicPoolInfo): JSX.Element => {
  const toDate = Date.now();
  const fromDate = toDate - 50 * 60 * 60 * 1000; // last 50 hour

  const { data, loading } = useSubscription<VolumeQuery, BasicVar>(
    VOLUME_GQL,
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

  const volumeData = dropDuplicatesMultiKey(data.pool_hour_volume, ["timeframe"])
    .map((d) => ({...d,
      // amount_1: formatBasicAmount(d.amount_1, decimal1),  
      // amount_2: formatBasicAmount(d.amount_2, decimal2),  
      date: new Date(d.timeframe)
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime()); 
  if (volumeData.length === 0) {
    return <span>No data found</span>;
  }

  const values: number[] = volumeData.reduce((acc, {amount_1, amount_2}) => [...acc, amount_1, amount_2], []);
  const adjust = std(values);

  // console.log(values)
  const f = scaleOrdinal(schemeCategory10)
    .domain(set(volumeData.map(d => d.date)));

  const fill = (d, i) => f(i);
  return (
    
    <DefaultChart
      data={volumeData}
      fromDate={new Date(fromDate)}
      toDate={new Date(toDate)}
      type="svg"
    >
      <Chart id={1} yExtents={d => [d.amount_1 + adjust, d.amount_2 + adjust, 0]}>
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

        <CurrentCoordinate yAccessor={d => d.amount_1} fill={d => d.amount_1} />
        <CurrentCoordinate yAccessor={d => d.amount_2} fill={d => d.amount_2} />

        <GroupedBarSeries 
          yAccessor={[d => d.amount_1, d => d.amount_2]}
          fill={fill}
          spaceBetweenBar={3}
          width={20}
        />

        <SingleValueTooltip
          yAccessor={(d) => d.amount_1}
          yDisplayFormat={(d) => formatAmount(d, decimal1) + ` ${symbol1}`}
          fontSize={21}
          origin={[20, 10]}/>
        <SingleValueTooltip
          yAccessor={(d) => d.amount_2}
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

export default VolumeChart;
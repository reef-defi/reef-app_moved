import React from "react"
import {useSubscription, gql} from "@apollo/client"
import { Components } from "@reef-defi/react-lib/";
import DefaultChart from "./DefaultChart";

import { utcDay, utcMinute, utcHour } from "d3-time";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";

import { Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import {MouseCoordinateX, CrossHairCursor, CurrentCoordinate} from "react-stockcharts/lib/coordinates"
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { SingleValueTooltip} from "react-stockcharts/lib/tooltip"
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { dropDuplicatesMultiKey, std } from "../../../utils/utils";
const { Loading } = Components.Loading;

interface CandlestickData {
  pool_id: number,
  timeframe: string;
  close_1: number;
  close_2: number;
  high_1: number;
  high_2: number;
  open_1: number;
  open_2: number;
  low_1: number;
  low_2: number;
  which_token: number;
  pool: {
    token_1: string;
    token_2: string;
  }
}

interface CandlestickQuery {
  pool_hour_candlestick: CandlestickData[];
}

interface CandlestickVar {
  address: string;
  whereToken: number;
}

interface OHLC {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

const DAY_CANDLESTICK_GQL = gql`
subscription candlestick($address: String!, $whereToken: Int!) {
  pool_hour_candlestick(
    order_by: { timeframe: asc }
    where: { 
      pool: { address: { _ilike: $address } } 
      which_token: { _eq: $whereToken }
    }
  ) {
    pool_id
    timeframe
    close_1
    close_2
    high_1
    high_2
    low_1
    low_2
    open_1
    open_2
    which_token
    pool {
      token_1
      token_2
    }
  }
}
`

const token1Values = ({close_1, high_1, timeframe, low_1, open_1}: CandlestickData):  OHLC => ({
  close: close_1,
  high: high_1,
  date: new Date(timeframe),
  low: low_1,
  open: open_1,
});
const token2Values = ({close_2, high_2, timeframe, low_2, open_2}: CandlestickData):  OHLC => ({
  close: close_2,
  high: high_2,
  date: new Date(timeframe),
  low: low_2,
  open: open_2,
});

interface TokenCandlestickChart {
  whichToken: number;
  address: string;
}

const TokenCandlestickChart = ({whichToken, address} : TokenCandlestickChart): JSX.Element => {
  const toDate = Date.now();
  const fromDate = toDate - 50 * 60 * 60 * 1000; // last hour

  const {loading, data} = useSubscription<CandlestickQuery, CandlestickVar>(
    DAY_CANDLESTICK_GQL, 
    { 
      variables: { address, whereToken: whichToken } 
    }
  );
  
  const candlestick = data 
  ? data.pool_hour_candlestick
      .filter(({which_token}) => which_token === whichToken)
      .map((token) => whichToken === 1 ? token1Values(token) : token2Values(token))
      .filter(({date}) => date.getTime() > fromDate)
  : [];
  
  
  if (loading) {
    return (<Loading />);
  }
  if (candlestick.length === 0) {
    return <span>No data found</span>
  }

  const r = dropDuplicatesMultiKey(candlestick, ["date"])
    .sort((a, b) => a.date.getTime() - b.date.getTime()); 

  const values: number[] = r.reduce((acc, {high, low}) => [...acc, high, low], []);
  const adjust = std(values);

  return (
    <DefaultChart 
      data={r}
      fromDate={new Date(fromDate)}
      toDate={new Date(toDate)}
      type="svg"
    >
      <Chart id={1} yExtents={d => [d.high + adjust, d.low - adjust]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={8} />
        <YAxis axisAt="left" orient="left" ticks={6} />

        <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M:%S")} />

        <CandlestickSeries width={timeIntervalBarWidth(utcHour)}/>

        <CurrentCoordinate yAccessor={d => d.close} fill={d => d.close} />
        
        <SingleValueTooltip
          yAccessor={(d) => d.close}
          yDisplayFormat={(d) => "" + format('.4f')(d)}
          fontSize={21}
          origin={[20, 10]}/>
        <SingleValueTooltip
          yAccessor={(d) => d.date}
          fontSize={14}
          yDisplayFormat={timeFormat("%Y-%m-%d")}
          origin={[20, 30]}/>
      </Chart>
      
      <CrossHairCursor />
    </DefaultChart>
  );
}

export default TokenCandlestickChart;
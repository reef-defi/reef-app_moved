import React from "react"
import {useSubscription, useQuery, gql} from "@apollo/client"
import { timeParse } from "d3-time-format";
import Chart, { getData } from "./Chart";
import { Components } from "@reef-defi/react-lib/";
const { Loading } = Components.Loading;
const parseDate = timeParse("%Y-%m-%d");


const MINUTE_CANDLESTICK_GQL = gql`
subscription candlestick($address: String!, $whereToken: Int!) {
  pool_minute_candlestick(
    order_by: { timeframe: desc }
    where: { 
      pool: { address: { _ilike: $address } } 
      which_token: { _eq: $whereToken }
    }
    limit: 60
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
  pool_minute_candlestick: CandlestickData[];
}

interface CandlestickChart {
  whichToken: number;
  address: string;
}
interface CandlestickVar {
  address: string;
  whereToken: number;
}

const CandlestickChart = ({whichToken, address} : CandlestickChart): JSX.Element => {
  const {loading, data, error} = useSubscription<CandlestickQuery, CandlestickVar>(
    MINUTE_CANDLESTICK_GQL, 
    { 
      variables: { address, whereToken: whichToken } 
    }
  );

  const candlestick = data 
  ? data.pool_minute_candlestick
      .filter(({which_token}) => which_token === 1)
      .map(({close_1, open_1, high_1, low_1, timeframe}) => ({
        close: close_1,
        high: high_1,
        date: new Date(timeframe),
        low: low_1,
        open: open_1,
      }))
      .filter(({date}) => date.getTime() > Date.now() - 60 * 60 * 1000)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  : [];
  
  return (
    loading
      ? <Loading />
      : <Chart 
        type={'hybrid'}
        data={candlestick} 
      />
  );
}

export default CandlestickChart;
import React from "react"
import {useSubscription, gql} from "@apollo/client"
import CandlestickChart, { OHLC } from "./CandlestickChart";
import { Components } from "@reef-defi/react-lib/";
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
  pool_minute_candlestick: CandlestickData[];
}

interface CandlestickVar {
  address: string;
  whereToken: number;
}

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
  const {loading, data} = useSubscription<CandlestickQuery, CandlestickVar>(
    MINUTE_CANDLESTICK_GQL, 
    { 
      variables: { address, whereToken: whichToken } 
    }
  );

  const toDate = Date.now();
  const fromDate = toDate - 60 * 60 * 1000; // last hour
  
  const candlestick = data 
  ? data.pool_minute_candlestick
      .filter(({which_token}) => which_token === whichToken)
      .map((token) => whichToken === 1 ? token1Values(token) : token2Values(token))
      .filter(({date}) => date.getTime() > fromDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  : [];
  
  return (
    loading || candlestick.length === 0
      ? <Loading />
      : <CandlestickChart 
        type={'svg'}
        data={candlestick}
        toDate={new Date(toDate)}
        fromDate={new Date(fromDate)}
      />
  );
}

export default TokenCandlestickChart;
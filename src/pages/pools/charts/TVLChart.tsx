import React from "react"
import {useSubscription, useQuery, gql} from "@apollo/client"
import { toTimestamp } from "../../../utils/utils";
import { AddressVar } from "../poolTypes";
import { Components } from "@reef-defi/react-lib";
import LineChart from "./LineChart";
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

  return (
    loading || tvl.length === 0
    ? <Loading />
    : <LineChart 
        data={tvl}
        type='svg'
        toDate={new Date(toDate)}
        fromDate={new Date(fromDate)}
      />
  );
}

export default TVLChart;
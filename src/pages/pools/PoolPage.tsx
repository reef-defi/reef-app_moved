import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import {useSubscription, gql, ApolloClient, ApolloConsumer} from "@apollo/client"
import {appState, graphql, hooks, ReefSigner,} from '@reef-defi/react-lib';

interface PoolPage {
  apollo: ApolloClient<object>
}

interface UrlParam {
  address: string;
}

const MINUTE_CANDLESTICK_GQL = gql`
subscription candlestick($address: String!) {
  pool_minute_candlestick(
    where: { pool: { address: { _ilike: $address } } }
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
    pool {
      token_1
      token_2
    }
  }
}
`

const POOL_TRANSACTIONS_GQL = gql`
subscription transactions($address: String!, $type: String_comparison_exp!) {
  pool_event(
    where: {
      pool: { address: { _ilike: $address } }
      type: $type
    }
  ) {
    amount_1
    amount_2
    amount_in_1
    amount_in_2
    timestamp
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
  pool: {
    token_1: string;
    token_2: string;
  }
}

const PoolPage = ({apollo} : PoolPage): JSX.Element => {
  const {address} = useParams<UrlParam>();

  const {loading, data, error} = useSubscription<CandlestickData[]>(
    MINUTE_CANDLESTICK_GQL, 
    {
      client: apollo,
      variables: {address}
    }
  );
  console.log(loading);  
  console.log(data);  
  console.log(error);  
  console.log("-------------");  
  // useEffect(async () => {

  // }, [address])

  return (
    <div>

    </div>
  );
}

// These needs to be removed
export default  (): JSX.Element => {
  const apollo: ApolloClient<object> = hooks.useObservableState(graphql.apolloClientInstance$);

  return apollo 
    ? (<PoolPage apollo={apollo} /> )
    : (<div />)
}
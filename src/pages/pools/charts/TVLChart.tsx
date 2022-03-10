import React from "react"
import {useSubscription, gql} from "@apollo/client"

interface TVLChart {
  address: string;
}

const TVL_GQL = gql`

`

const TVLChart = ({address} : TVLChart): JSX.Element => {
  return (
    <div>

    </div>
  );
}

export default TVLChart;
import React, { useState } from "react"
import {Components} from "@reef-defi/react-lib";
import {useSubscription, useQuery, gql} from "@apollo/client";
import { formatAmount, shortAddress, formatAgoDate } from "../../utils/utils";

const {BoldText} = Components.Text;
const {Loading} = Components.Loading;

interface PoolTransactions {
  address: string;
  tokenSymbol1: string;
  tokenSymbol2: string;
  decimal1: number;
  decimal2: number;
}

type BasePoolTransactionTypes = "Swap" | "Mint" | "Burn"
interface PoolTransaction {
  amount_1: number;
  amount_2: number;
  amount_in_1: number;
  amount_in_2: number;
  sender_address: string;
  timestamp: string;
  type: BasePoolTransactionTypes
};

type PoolTransactionQuery = { pool_event: PoolTransaction[] };

type TransactionTypes =  BasePoolTransactionTypes | "All"
interface TransactionVar {
  address: string;
  type: BasePoolTransactionTypes[]
}

const POOL_TRANSACTIONS_GQL = gql`
subscription transactions($address: String!, $type: [pooltype!]) {
  pool_event(
    order_by: { timestamp: desc }
    where: {
      pool: { address: { _ilike: $address } }
      type: { _in: $type }
    }
    limit: 10
  ) {
    amount_1
    amount_2
    amount_in_1
    amount_in_2
    sender_address
    timestamp
    type
  }
}
`

const PoolTransactions = ({address, tokenSymbol1, tokenSymbol2, decimal1, decimal2} : PoolTransactions): JSX.Element => {
  const [type, setType] = useState<TransactionTypes>("All");

  const {loading, data, error} = useSubscription<PoolTransactionQuery, TransactionVar>(
    POOL_TRANSACTIONS_GQL,
    {variables: {
      address,
      type: (type === "All" ? ["Swap", "Mint", "Burn"] : [type])
    }}
  );
  const description = (type: BasePoolTransactionTypes, amount_1: number) => {
    switch (type) {
      case "Swap": return `${type} ${amount_1 > 0 ? tokenSymbol1 : tokenSymbol2} for ${amount_1 > 0 ? tokenSymbol2 : tokenSymbol1}`
      case "Burn": return `Remove ${tokenSymbol1} and ${tokenSymbol2}`;
      case "Mint": return `Add ${tokenSymbol1} and ${tokenSymbol2}`;
    }
  }

  const transactionView = !loading && data
    ? data.pool_event
    .map(({amount_1, amount_2, sender_address, timestamp, type, amount_in_1, amount_in_2}, index) => (
      <tr key={`transaction-${index}`}>
        <td className="fs-5">{description(type, amount_1)}</td>
        <td className="text-end fs-5 d-none d-md-table-cell d-lg-table-cell d-xl-table-cell">{formatAmount(amount_1 > 0 ? amount_1 : amount_in_1, decimal1)} {tokenSymbol1}</td>
        <td className="text-end fs-5 d-none d-lg-table-cell d-xl-table-cell">{formatAmount(amount_2 > 0 ? amount_2 : amount_in_2, decimal2)} {tokenSymbol2}</td>
        <td className="text-end fs-5 d-none d-xl-table-cell">{shortAddress(sender_address)}</td>
        <td className="text-end pe-4 fs-5">{formatAgoDate(timestamp)}</td>
      </tr>
    ))
    : [];

  return (
    <>
      <Components.Display.MT size="4" />
      <BoldText size={1.6}>Transactions</BoldText>
      <Components.Display.MT size="4" />
      
      <Components.Card.Card>
        {
          loading
            ? <Loading />
            : <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <a className={`fs-5 mx-1 text-decoration-none ${type === "All" ? "selected-topic" : "unselected-topic"}`} type="button" onClick={() => setType("All")}>All</a>
                      <a className={`fs-5 mx-1 text-decoration-none ${type === "Swap" ? "selected-topic" : "unselected-topic"}`} type="button" onClick={() => setType("Swap")}>Swaps</a>
                      <a className={`fs-5 mx-1 text-decoration-none ${type === "Mint" ? "selected-topic" : "unselected-topic"}`} type="button" onClick={() => setType("Mint")}>Adds</a>
                      <a className={`fs-5 mx-1 text-decoration-none ${type === "Burn" ? "selected-topic" : "unselected-topic"}`} type="button" onClick={() => setType("Burn")}>Removes</a>
                    </th>
                    <th scope="col" className="text-end fs-5 d-none d-md-table-cell d-lg-table-cell d-xl-table-cell">Token Amount</th>
                    <th scope="col" className="text-end fs-5 d-none d-lg-table-cell d-xl-table-cell">Token Amount</th>
                    <th scope="col" className="text-end fs-5 d-none d-xl-table-cell">Account</th>
                    <th scope="col" className="text-end pe-4 fs-5">Time</th>
                  </tr>
                </thead>
                <tbody>
                  { transactionView }
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <div>
                  <button>{"<-"}</button>
                  Page 1 of 30
                  <button>{"->"}</button>
                </div>
              </div>
            </>
        }
      </Components.Card.Card>
    </>
  );
}

export default PoolTransactions;
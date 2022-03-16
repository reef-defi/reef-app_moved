import React, { useState } from "react"
import {Components} from "@reef-defi/react-lib";
import {useSubscription, useQuery, gql} from "@apollo/client";
import { formatAmount, shortAddress, formatAgoDate } from "../../utils/utils";
import { innitialNetwork } from "../../environment";
import { ContractData } from "./poolTypes";

const {BoldText} = Components.Text;
const {Loading} = Components.Loading;

type BasePoolTransactionTypes = "Swap" | "Mint" | "Burn"
type TransactionTypes =  BasePoolTransactionTypes | "All"

interface PoolTransactions {
  address?: string;
  // tokenSymbol1: string;
  // tokenSymbol2: string;
  // decimal1: number;
  // decimal2: number;
}

interface PoolTransaction {
  amount_1: number;
  amount_2: number;
  amount_in_1: number;
  amount_in_2: number;
  sender_address: string;
  to_address: string | null;
  timestamp: string;
  type: BasePoolTransactionTypes;
  pool: {
    token_contract_1: {
      verified_contract: null | {
        contract_data: ContractData
      };
    };
    token_contract_2: {
      verified_contract: null | {
        contract_data: ContractData
      };
    };
  };
  evm_event: {
    event: {
      extrinsic: {
        hash: string;
        signer: string;
      };
    };
  };
};
interface PoolTransactionCount {
  pool_event_aggregate: {
    aggregate: {
      count: number;
    }
  }
}

type PoolTransactionQuery = { pool_event: PoolTransaction[] };

interface BasicTransactionVar {
  address: { _ilike?: string };
  type: BasePoolTransactionTypes[]
}
interface TransactionVar extends BasicTransactionVar {
  offset: number;
}

const POOL_TRANSACTIONS_GQL = gql`
subscription transactions($address: String_comparison_exp!, $type: [pooltype!], $offset: Int!) {
  pool_event(
    order_by: { timestamp: desc }
    where: {
      pool: { address: $address }
      type: { _in: $type }
    }
    limit: 10
    offset: $offset
  ) {
    amount_1
    amount_2
    amount_in_1
    amount_in_2
    sender_address
    to_address
    timestamp
    type
    pool {
      token_contract_2 {
        verified_contract {
          contract_data
        }
      }
      token_contract_1 {
        verified_contract {
          contract_data
        }
      }
    }
    evm_event {
      event {
        extrinsic {
          hash
          signer
        }
      }
    }
  }
}
`;

const POOL_TRANSACTION_COUNT_GQL = gql`
subscription transaction_count($address: String_comparison_exp!, $type: [pooltype]!) {
  pool_event_aggregate( 
    where: {
      pool: { address: $address }
      type: { _in: $type }
    } 
  ) {
    aggregate {
      count
    }
  }
}
`;

const PoolTransactions = ({address} : PoolTransactions): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState<TransactionTypes>("All");
  
  const variables: BasicTransactionVar = {
    address: address ? { _ilike: address } : {},
    type: (type === "All" ? ["Swap", "Mint", "Burn"] : [type])
  };
  const {loading: loadingTransactions, data: transactionData} = useSubscription<PoolTransactionQuery, TransactionVar>(
    POOL_TRANSACTIONS_GQL,
    {variables: {...variables,
      offset: pageIndex * 10,
    }}
  );
  const {loading, data} = useSubscription<PoolTransactionCount, BasicTransactionVar>(
    POOL_TRANSACTION_COUNT_GQL,
    { variables }
  );
  
  const maxPage = data 
    ? Math.round(data.pool_event_aggregate.aggregate.count / 10)
    : 1;

  const nextPage = () => setPageIndex(Math.min(maxPage, pageIndex + 1))
  const prevPage = () => setPageIndex(Math.max(0, pageIndex - 1))

  const description = (type: BasePoolTransactionTypes, amount_1: number, tokenSymbol1: string, tokenSymbol2: string) => {
    switch (type) {
      case "Swap": return `${type} ${amount_1 > 0 ? tokenSymbol1 : tokenSymbol2} for ${amount_1 > 0 ? tokenSymbol2 : tokenSymbol1}`
      case "Burn": return `Remove ${tokenSymbol1} and ${tokenSymbol2}`;
      case "Mint": return `Add ${tokenSymbol1} and ${tokenSymbol2}`;
    }
  }

  const transactionView = !loadingTransactions && transactionData
    ? transactionData.pool_event
    .map(({amount_1, amount_2, timestamp, to_address, type, amount_in_1, amount_in_2, evm_event: {event: {extrinsic: {hash, signer}}}, pool: {token_contract_1, token_contract_2}}, index) => {
      const symbol1 = token_contract_1.verified_contract?.contract_data.symbol || "?";
      const decimal1 =token_contract_1.verified_contract?.contract_data.decimals || 18; 
      const symbol2 = token_contract_2.verified_contract?.contract_data.symbol || "?";
      const decimal2 =token_contract_2.verified_contract?.contract_data.decimals || 18; 

      return (
        <tr key={`transaction-${index}`}>
          <td className="fs-5"><a href={`${innitialNetwork.reefscanFrontendUrl}/extrinsic/${hash}`}>{description(type, amount_1, symbol1, symbol2)}</a></td>
          <td className="text-end fs-5 d-none d-md-table-cell d-lg-table-cell d-xl-table-cell">{formatAmount(amount_1 > 0 ? amount_1 : amount_in_1, decimal1)} {symbol1}</td>
          <td className="text-end fs-5 d-none d-lg-table-cell d-xl-table-cell">{formatAmount(amount_2 > 0 ? amount_2 : amount_in_2, decimal2)} {symbol2}</td>
          <td className="text-end fs-5 d-none d-xl-table-cell"><a href={`${innitialNetwork.reefscanFrontendUrl}/account/${to_address || signer}`}>{shortAddress(to_address || signer)}</a></td>
          <td className="text-end pe-4 fs-5">{formatAgoDate(timestamp)}</td>
        </tr>
      );
    })
    : [];

  return (
    <>
      <Components.Display.MT size="4" />
      <BoldText size={1.6}>Transactions</BoldText>
      <Components.Display.MT size="2" />
      
      <Components.Card.Card>
        {
          loadingTransactions
            ? <Loading />
            : <>
              <table className="table table-hover">
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
                  <Components.Button.EmptyButton onClick={() => setPageIndex(0)}>{'<<'}</Components.Button.EmptyButton>
                  <Components.Button.EmptyButton onClick={prevPage}>{'<'}</Components.Button.EmptyButton>
                  Page {pageIndex + 1} of {maxPage}
                  <Components.Button.EmptyButton onClick={nextPage}>{'>'}</Components.Button.EmptyButton>
                  <Components.Button.EmptyButton onClick={() => setPageIndex(maxPage-1)}>{'>>'}</Components.Button.EmptyButton>
                </div>
              </div>
            </>
        }
      </Components.Card.Card>
    </>
  );
}

export default PoolTransactions;
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {useSubscription, useQuery, gql} from "@apollo/client"
import {Components} from "@reef-defi/react-lib"
import { getIconUrl, shortAddress } from "../../utils/utils";
import { Skeleton } from "../dashboard/TokenBalances";
import { BigNumber, utils } from "ethers";
import Chart, { getData } from "./Chart";
import { timeParse } from "d3-time-format";
import "./PoolPage.css";

const parseDate = timeParse("%Y-%m-%d");
const {Text, ColorText, BoldText, LeadText} = Components.Text;

interface PoolPage {
}

interface UrlParam {
  address: string;
}

const POOL_GQL = gql`
query pool($address: String!) {
  pool(
    where: { address: { _ilike: $address } }
  ) {
    id
    address
    token_contract_1 {
      verified_contract {
        contract_data
      }
      address
    }
    token_contract_2 {
      verified_contract {
        contract_data
      }
      address
    }
  }
}
`

const MINUTE_CANDLESTICK_GQL = gql`
subscription candlestick($address: String!) {
  pool_minute_candlestick(
    order_by: { timeframe: desc }
    where: { 
      pool: { address: { _ilike: $address } } 
    }
    limit: 200
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

const POOL_RESERVES_SUBSCRIPTION_GQL = gql`
query pool_event($address: String!) {
  pool_event(
    where: {
      pool: { address: {_ilike: $address } }
      type: { _eq: "Sync" }
    }
    order_by: { timestamp: desc }
    limit: 1
  ) {
    reserved_1
    reserved_2
  }
}
`
const POOL_SUPPLY_GQL = gql`
query pool_supply($address: String!) {
  pool_day_supply(
    where: {
      pool: { address: {_ilike: $address } }
    }
    order_by: { timeframe: desc }
    limit: 1
  ) {
    total_supply
    supply
  }
}
`

const POOL_VOLUME_GQL = gql`
query pool_volume($address: String!) {
  pool_day_volume(
    where: {
      pool: { address: {_ilike: $address } }
    }
    order_by: { timeframe: desc }
    limit: 2
  ) {
    amount_1
    amount_2
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

interface ContractData {
  symbol: string;
  name: string;
  decimals: number
}

interface PoolData {
  id: number;
  address: string;
  token_contract_1: {
    address: string;
    verified_contract: {
      contract_data: ContractData;
    };
  };
  token_contract_2: {
    address: string;
    verified_contract: {
      contract_data: ContractData;
    };
  };
}

interface Reserves {
  reserved_1: number;
  reserved_2: number;
  total_supply: number;
}

interface Supply {
  total_supply: number;
  supply: number;
}
interface Volume {
  amount_1: number;
  amount_2: number;
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
type VolumeQuery = { pool_day_volume: Volume[] };

interface SupplyQuery {
  pool_day_supply: Supply[]
}
interface PoolQuery {
  pool: PoolData[];
}
interface ReservesQuery {
  pool_event: Reserves[];
}
interface CandlestickQuery {
  pool_minute_candlestick: CandlestickData[];
}
interface AddressVar {
  address: string;
}

type TransactionTypes =  BasePoolTransactionTypes | "All"
interface TransactionVar extends AddressVar {
  type: BasePoolTransactionTypes[]
}
interface CandlestickVar extends AddressVar {
  timestamp: string;
}

const toHumanAmount = (amount: string): string => {
  const head = amount.slice(0, amount.indexOf("."));
  const amo = amount.replace(".", "");
  
  if (head.length > 9) {
    return `${amo.slice(0, head.length-9)}.${amo.slice(head.length-9, head.length-9+2)} B`
  }
  if (head.length > 6) {
    return `${amo.slice(0, head.length-6)}.${amo.slice(head.length-6, head.length-6+2)} M`
  }
  if (head.length > 3) {
    return `${amo.slice(0, head.length-3)}.${amo.slice(head.length-3, head.length-3+2)} k`
  }
  return amount.slice(0, head.length + 4);
}

const formatDate = (timestamp: number|string): string => {
  const now = new Date(Date.now());
  const date = new Date(timestamp);

  const difference = now.getTime() - date.getTime();
  if (difference < 1000 * 60) {
    return `${Math.round(difference / 1000)}sec ago`
  }
  if (difference < 1000 * 60 * 60) {
    return `${Math.round(difference / 60000)}min ago`
  } 
  if (difference < 1000 * 60 * 60 * 24) {
    return `${Math.round(difference / 3600000)}h ago`
  }
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}

const formatAmount = (amount: number, decimals: number): string => toHumanAmount(
  utils.formatUnits(
    BigNumber.from(
      amount.toLocaleString('fullwide', {useGrouping:false})
    ).toString(),
    decimals
  )
)

const toTimestamp = (d: Date): string => 
  `${d.getFullYear()}-${d.getMonth() > 9 ? d.getMonth() : "0" + d.getMonth()}-${d.getUTCDay() > 9 ? d.getUTCDay() : "0" + d.getUTCDay()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}+00:00`;

const PoolPage = ({} : PoolPage): JSX.Element => {
  const [type, setType] = useState<TransactionTypes>("All");
  const [data, setData] = useState<any[]>([]);
  const {address} = useParams<UrlParam>();
  const {loading: candlestickLoading, data: candlestickData, error: candlestickError} = useSubscription<CandlestickQuery, AddressVar>(
    MINUTE_CANDLESTICK_GQL, 
    { 
      variables: { address } 
    }
  );
  const {loading: loadingPool, data: poolData, error: poolError} = useQuery<PoolQuery, AddressVar>(
    POOL_GQL,
    {variables: { address } }
  )
  const {loading: loadingTransaction, data: transactionData, error: transactionError} = useSubscription<PoolTransactionQuery, TransactionVar>(
    POOL_TRANSACTIONS_GQL,
    {variables: {
      address,
      type: (type === "All" ? ["Swap", "Mint", "Burn"] : [type])
    }}
  );
  const {loading: loadingReserves, data: reservesData, error: reservesError} = useQuery<ReservesQuery, AddressVar>(
    POOL_RESERVES_SUBSCRIPTION_GQL,
    { variables: { address } }
  )
  const {loading: loadingSupply, data: supplyData, error: supplyError} = useQuery<SupplyQuery, AddressVar>(
    POOL_SUPPLY_GQL,
    { variables: { address } }
  )
  const {loading: loadingVolume, data: volumeData, error: volumeError} = useQuery<VolumeQuery, AddressVar>(
    POOL_VOLUME_GQL,
    { variables: { address } }
  )

  // Token info
  const poolExists = poolData && poolData.pool.length > 0;
  const tokenAddress1 = poolExists
    ? poolData.pool[0].token_contract_1.address
    : "0x";
  const tokenAddress2 = poolExists
    ? poolData.pool[0].token_contract_2.address
    : "0x";
  const tokenSymbol1 = poolExists
    ? poolData.pool[0].token_contract_1.verified_contract.contract_data.symbol
    : "-";
  const tokenSymbol2 = poolExists
    ? poolData.pool[0].token_contract_2.verified_contract.contract_data.symbol
    : "-";
  const tokenIcon1 = poolExists
    ? getIconUrl(tokenAddress1)
    : "";
  const tokenIcon2 = poolExists
    ? getIconUrl(tokenAddress2)
    : "";
  
  const decimal1 = poolExists
    ? poolData.pool[0].token_contract_1.verified_contract.contract_data.decimals
    : 1;
  const decimal2 = poolExists
    ? poolData.pool[0].token_contract_2.verified_contract.contract_data.decimals
    : 1;

  // Reserves
  const reserved1 = 
    reservesData && reservesData.pool_event.length > 0
      ? formatAmount(reservesData.pool_event[0].reserved_1, decimal1) 
      : "-"
  const reserved2 = 
    reservesData && reservesData.pool_event.length > 0
      ? formatAmount(reservesData.pool_event[0].reserved_2, decimal2) 
      : "-"

  const ratio1 =
    reservesData && reservesData.pool_event.length > 0
      ? BigNumber
        .from(reservesData.pool_event[0].reserved_2.toLocaleString('fullwide', {useGrouping:false}))
        .mul(1000)
        .div(BigNumber.from(BigNumber.from(reservesData.pool_event[0].reserved_1.toLocaleString('fullwide', {useGrouping:false}))))
        .toNumber()/1000
      : -1;

  const ratio2 =
    reservesData && reservesData.pool_event.length > 0
      ? BigNumber
        .from(reservesData.pool_event[0].reserved_1.toLocaleString('fullwide', {useGrouping:false}))
        .mul(1000)
        .div(BigNumber.from(BigNumber.from(reservesData.pool_event[0].reserved_2.toLocaleString('fullwide', {useGrouping:false}))))
        .toNumber()/1000
      : -1;

  // Supply
  const totalSupply = 
    supplyData && supplyData.pool_day_supply.length > 0
      ? formatAmount(supplyData.pool_day_supply[0].total_supply, 18) 
      : "-"

  const totalSupplyPercentage = 
    supplyData && supplyData.pool_day_supply.length > 0
    ? supplyData.pool_day_supply[0].supply / supplyData.pool_day_supply[0].total_supply * 100 // this 1 is a hack
    : 0;

  // Volume
  const volume1 =
    volumeData && volumeData.pool_day_volume.length > 0 && decimal1 != 1
      ? formatAmount(volumeData.pool_day_volume[0].amount_1, decimal1)
      : "-";

  const volume2 =
    volumeData && volumeData.pool_day_volume.length > 0 && decimal2 != 1
      ? formatAmount(volumeData.pool_day_volume[0].amount_2, decimal2)
      : "-";
  const volumeDifference1 =
    volumeData && volumeData.pool_day_volume.length > 1
    ? (
        volumeData.pool_day_volume[1].amount_1 - 
        volumeData.pool_day_volume[0].amount_1
      ) / volumeData.pool_day_volume[0].amount_1 * 100
    : 0;
  const volumeDifference2 =
    volumeData && volumeData.pool_day_volume.length > 1
    ? (
        volumeData.pool_day_volume[1].amount_2 - 
        volumeData.pool_day_volume[0].amount_2
      ) / volumeData.pool_day_volume[0].amount_2 * 100
    : 0;

  const candlestick = candlestickData 
    ? candlestickData.pool_minute_candlestick
        .filter(({which_token}) => which_token === 1)
        .map(({close_1, open_1, high_1, low_1, timeframe}) => ({
          close: close_1,
          high: high_1,
          date: new Date(timeframe),
          low: low_1,
          open: open_1,

          absoluteChange: "",
          dividend: "",
          percentChange: "",
          split: "",
          volume: 38409100
        }))
        .filter(({date}) => date.getTime() > Date.now() - 60 * 60 * 1000)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    : [];

  console.log(candlestick)
  console.log(candlestickData)
  console.log(candlestickError)

  const description = (type: BasePoolTransactionTypes, amount_1: number) => {
    switch (type) {
      case "Swap": return `${type} ${amount_1 > 0 ? tokenSymbol1 : tokenSymbol2} for ${amount_1 > 0 ? tokenSymbol2 : tokenSymbol1}`
      case "Burn": return `Remove ${tokenSymbol1} and ${tokenSymbol2}`;
      case "Mint": return `Add ${tokenSymbol1} and ${tokenSymbol2}`;
    }
  }

  const transactionView = poolData && transactionData
    ? transactionData.pool_event
    .map(({amount_1, amount_2, sender_address, timestamp, type, amount_in_1, amount_in_2}, index) => (
      <tr key={`transaction-${index}`}>
        <td className="fs-5">{description(type, amount_1)}</td>
        <td className="text-end fs-5 d-none d-md-table-cell d-lg-table-cell d-xl-table-cell">{formatAmount(amount_1 > 0 ? amount_1 : amount_in_1, decimal1)} {tokenSymbol1}</td>
        <td className="text-end fs-5 d-none d-lg-table-cell d-xl-table-cell">{formatAmount(amount_2 > 0 ? amount_2 : amount_in_2, decimal2)} {tokenSymbol2}</td>
        <td className="text-end fs-5 d-none d-xl-table-cell">{shortAddress(sender_address)}</td>
        <td className="text-end pe-4 fs-5">{formatDate(timestamp)}</td>
      </tr>
    ))
    : [];

  return (
    <div className="w-100 row justify-content-center">
      <div className="col-xl-8 col-lg-10 col-md-12">
        {
          loadingPool || !poolData
            ? <Skeleton />
            : <div className="d-flex ms-1 mb-1">
                <Components.Icons.TokenIcon src={tokenIcon1}/>
                <Components.Icons.TokenIcon src={tokenIcon2}/>

                <LeadText>
                  { tokenSymbol1 } / { tokenSymbol2 }
                </LeadText>
              </div>
          }

        <Components.Display.FullRow>
          <Components.Display.ContentBetween>
            <div className="d-flex my-2">
              <div className="card border-rad">
                <div className="card-body py-1">
                  { loadingPool  || !poolData
                    ? <Skeleton />
                    : <div className="d-flex">
                        <Components.Icons.TokenIcon src={tokenIcon1}/>
                        <Components.Display.ME size="1" />
                        <LeadText>1 {tokenSymbol1} = {ratio1 !== -1 ? ratio1 : "-"} {tokenSymbol2} </LeadText>
                      </div>
                  }
                </div>
              </div>
              <Components.Display.ME size="1" />

              <div className="card border-rad">
                <div className="card-body py-1">
                  {
                    loadingPool || !poolData
                    ? <Skeleton />
                    : <div className="d-flex">
                        <Components.Icons.TokenIcon src={tokenIcon2}/>
                        <Components.Display.ME size="1" />
                        <LeadText>1 {tokenSymbol2} = {ratio2 !== -1 ? ratio2 : "-"} {tokenSymbol1}</LeadText>
                      </div>
                  }
                </div>
              </div>
            </div>

            <div className="d-flex">
              <Components.Button.Button >AddLiqudity</Components.Button.Button>
              <Components.Display.ME size="1" />
              <Components.Button.Button>Trade</Components.Button.Button>
            </div>
          </Components.Display.ContentBetween>
        </Components.Display.FullRow>

        <div className="row mt-2">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="border-rad bg-grey p-3 pt-2">
              <Components.Display.MT size="2" />
              <Components.Card.Card>
                <BoldText size={1.2}>Total Tokens Locked</BoldText>
                <Components.Display.MB size="2" />
                <Components.Display.FullRow>
                  <Components.Display.ContentBetween>
                    <div className="d-flex">
                      <Components.Icons.TokenIcon src={tokenIcon1}/>
                      <Components.Display.ME size="1" />
                      <LeadText>{tokenSymbol1}</LeadText>
                    </div>
                    <div className="">
                      <LeadText>{reserved1}</LeadText>
                    </div>
                  </Components.Display.ContentBetween>
                </Components.Display.FullRow>
                
                <Components.Display.MT size="1" />
                <Components.Display.FullRow>
                  <Components.Display.ContentBetween>
                    <div className="d-flex">
                      <Components.Icons.TokenIcon src={tokenIcon2}/>
                      <Components.Display.ME size="1" />
                      <LeadText>{tokenSymbol2}</LeadText>
                    </div>
                    <div className="">
                      <LeadText>{reserved2}</LeadText>
                    </div>
                  </Components.Display.ContentBetween>
                </Components.Display.FullRow>
              </Components.Card.Card>
            
              <Components.Display.MT size="2" />
              <Components.Card.Card>
                <div className="d-flex flex-column">
                  <BoldText size={1.2}>Total Value Locked</BoldText>
                  <Components.Text.BoldText size={1.6}>{totalSupply}</Components.Text.BoldText>
                  <Components.Text.ColorText color={totalSupplyPercentage < 0 ? "danger" : "success"} size={1}>{totalSupplyPercentage.toFixed(3)} %</Components.Text.ColorText>
                </div>
              </Components.Card.Card>

              <Components.Display.MT size="2" />
              <Components.Card.Card>
                <BoldText size={1.2}>Volume 24h</BoldText>
                {/* <Text size={1.3}>Volume (24h)</Text> */}
                <div className="d-flex ms-1">
                  <Components.Icons.TokenIcon src={tokenIcon1}/>
                  <Components.Text.BoldText size={1.6}> 
                    {volume1}
                  </Components.Text.BoldText>
                </div>
                <Components.Text.ColorText color={volumeDifference1 < 0 ? "danger" : "success"} size={1}>{volumeDifference1.toFixed(3)} %</Components.Text.ColorText>

                <div className="d-flex ms-1">
                  <Components.Icons.TokenIcon src={tokenIcon2}/>
                  <Components.Text.BoldText size={1.6}>
                    {volume2}
                  </Components.Text.BoldText>
                </div>
                <Components.Text.ColorText color={volumeDifference2 < 0 ? "danger" : "success"} size={1}>{volumeDifference2.toFixed(3)} %</Components.Text.ColorText>
              </Components.Card.Card>


              <Components.Display.MT size="2" />
              <Components.Card.Card>
                <div className="d-flex flex-column ms-1">
                  <BoldText size={1.2}>Fees 24h</BoldText>
                  <Components.Text.BoldText size={1.6}>$103k</Components.Text.BoldText>
                </div>
              </Components.Card.Card>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-8">
            <div className="border-rad bg-grey p-1 h-100 m-auto mt-xs-3">
              { candlestick.length > 0 &&
                <Chart 
                  type={'hybrid'}
                  data={candlestick} 
                />
              }
            </div>
          </div>
        </div>

        <Components.Display.MT size="4" />
        <BoldText size={1.6}>Transactions</BoldText>
        <Components.Display.MT size="4" />
        
        <Components.Card.Card>
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
        </Components.Card.Card>
      </div>
    </div>
  );
}

// These needs to be removed
export default PoolPage;
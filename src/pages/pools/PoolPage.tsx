import React, { useState } from "react"
import { useParams } from "react-router-dom";
import {useSubscription, useQuery, gql} from "@apollo/client"
import {Components} from "@reef-defi/react-lib"
import { getIconUrl } from "../../utils/utils";
import { Skeleton } from "../dashboard/TokenBalances";
import { BigNumber, utils } from "ethers";
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
    total_supply
    timestamp
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

type Transaction = "Swap" | "Mint" | "Burn" | "All"

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
  return amount;
}

const formatAmount = (amount: number, decimals: number): string => toHumanAmount(
  utils.formatUnits(
    BigNumber.from(
      amount.toLocaleString('fullwide', {useGrouping:false})
    ).toString(),
    decimals
  )
)
const percentageDifference = (prev: number, next: number): number => {
  // const a1 = BigNumber.from(prev.toLocaleString('fullwide', {useGrouping:false}))
  // const a2 = BigNumber.from(next.toLocaleString('fullwide', {useGrouping:false}))
  // console.log(a1)
  // console.log(a2)
  // const diff = a2.sub(a1).mul(1000).div(a1)
  return (next - prev)/prev * 100//diff.toNumber() / 10;
}


const PoolPage = ({} : PoolPage): JSX.Element => {
  const [type, setType] = useState<Transaction>("All");
  const {address} = useParams<UrlParam>();
  const {loading: candlestickLoading, data: candlestickData, error: candlestickError} = useSubscription<CandlestickQuery, AddressVar>(
    MINUTE_CANDLESTICK_GQL, 
    { variables: { address } }
  );
  const {loading: loadingPool, data: poolData, error: poolError} = useQuery<PoolQuery, AddressVar>(
    POOL_GQL,
    {variables: { address } }
  )
  const {loading: loadingTransaction, data: transactionData, error: transactionError} = useSubscription(
    POOL_TRANSACTIONS_GQL,
    {variables: {
      address,
      type: { _in: type === "All" ? ["Swap", "Mint", "Burn"] : [type] }
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
                        <LeadText>1 {tokenSymbol1} = n {tokenSymbol2} </LeadText>
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
                        <LeadText>1 {tokenSymbol2} = n {tokenSymbol1}</LeadText>
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
            <div className="border-rad bg-grey p-3">
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

              <div className="d-flex flex-column mt-3 ms-1">
                <Text size={1.3}>TVL</Text>
                <Components.Text.BoldText size={1.6}>{totalSupply}</Components.Text.BoldText>
                <Components.Text.ColorText color={totalSupplyPercentage < 0 ? "danger" : "success"} size={1}>{totalSupplyPercentage.toFixed(3) + "1"} %</Components.Text.ColorText>
              </div>

              <div className="d-flex flex-column mt-3 ms-1">
                <Text size={1.3}>Volume (24h)</Text>
                <div className="d-flex">
                  <Components.Icons.TokenIcon src={tokenIcon1}/>
                  <Components.Text.BoldText size={1.6}> 
                    {volume1}
                  </Components.Text.BoldText>
                </div>
                <Components.Text.ColorText color={volumeDifference1 < 0 ? "danger" : "success"} size={1}>{volumeDifference1.toFixed(3) + "1"} %</Components.Text.ColorText>

                <div className="d-flex">
                  <Components.Icons.TokenIcon src={tokenIcon2}/>
                  <Components.Text.BoldText size={1.6}>
                    {volume2}
                  </Components.Text.BoldText>
                </div>
                <Components.Text.ColorText color={volumeDifference2 < 0 ? "danger" : "success"} size={1}>{volumeDifference2.toFixed(3) + "1"} %</Components.Text.ColorText>
              </div>
              <div className="d-flex flex-column mt-3 ms-1">
                <Text size={1.3}>24h Fees</Text>
                <Components.Text.BoldText size={1.6}>$100k</Components.Text.BoldText>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-8">
            <div className="border-rad bg-grey p-1 h-100">
              Chart
            </div>
          </div>
        </div>
        <Components.Display.MT size="3" />

        <Components.Card.CardHeader>
          <Components.Card.CardTitle title="Transactions" />
        </Components.Card.CardHeader>

        <Components.Card.Card>

          <div>
            Transactions
          </div>
        </Components.Card.Card>
      </div>
    </div>
  );
}

// These needs to be removed
export default PoolPage;
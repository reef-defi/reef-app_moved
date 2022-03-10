import React from "react"
import {useSubscription, useQuery, gql} from "@apollo/client"
import { formatAmount, toTimestamp } from "../../utils/utils";
import { Components } from "@reef-defi/react-lib";
import {AddressVar, PoolData} from "./poolTypes";
import { JsxEmit } from "typescript";

const {BoldText, LeadText, Text} = Components.Text;
interface PoolInfo {
  icon1: string;
  icon2: string;
  address: string;
  symbol1: string;
  symbol2: string;
  decimal1: number;
  decimal2: number;
  reserved1: string;
  reserved2: string;
  isPoolLoading: boolean;
}

interface Supply {
  total_supply: number;
  supply: number;
}
interface Volume {
  amount_1: number;
  amount_2: number;
}
interface Fee {
  fee_1: number;
  fee_2: number;
}

type VolumeQuery = { pool_hour_volume: Volume[] };
type SupplyQuery = { pool_day_supply: Supply[] };

interface FeeSubscrition {
  pool_minute_fee_aggregate: {
    aggregate: {
      sum: Fee;
    }
  }
}

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
  pool_hour_volume(
    where: {
      pool: { address: {_ilike: $address } }
    }
    order_by: { timeframe: desc }
    limit: 3
  ) {
    amount_1
    amount_2
  }
}
`

const POOL_FEES_GQL = gql`
query pool_fee($address: String!, $fromTime: timestamptz!) {
  pool_minute_fee_aggregate(
    where: {
      pool: { address: { _ilike: $address } }
      timeframe: { _gte: $fromTime }
    }
  ) {
    aggregate {
      sum {
        fee_1
        fee_2
      }
    }
  }
}
`

interface InfoLine {
  icon: string;
  symbol: string;
  amount: string;
}

interface InfoPercentageLine extends InfoLine {
  percentage: number;
}

interface FeeVar extends AddressVar {
  fromTime: string;
}

const InfoLine: React.FC<InfoLine> = ({icon, symbol, amount, children}): JSX.Element => (
<Components.Display.FullRow>
  <Components.Display.ContentBetween>
    <div className="d-flex align-middle">
      <Components.Icons.TokenIcon src={icon}/>
      <Components.Display.ME size="1" />
      <Text className="m-auto">{symbol}</Text>
    </div>
    <div className="d-flex flex-column">
      <BoldText size={1.3}>{amount}</BoldText>
      { children }
    </div>
  </Components.Display.ContentBetween>
</Components.Display.FullRow>
)

const InfoPercentageLine = ({amount, icon, symbol, percentage}: InfoPercentageLine): JSX.Element => (
  <InfoLine
    icon={icon}
    amount={amount}
    symbol={symbol}
  >
    <Components.Text.ColorText color={percentage < 0 ? "danger" : "success"} size={0.8} className="text-end">{percentage.toFixed(3)} %</Components.Text.ColorText>
  </InfoLine>
)

const PoolInfo = ({address, isPoolLoading, decimal1, decimal2, symbol1, symbol2, reserved1, reserved2, icon1, icon2} : PoolInfo): JSX.Element => {
  const {loading: loadingSupply, data: supplyData, error: supplyError} = useQuery<SupplyQuery, AddressVar>(
    POOL_SUPPLY_GQL,
    { variables: { address } }
  );
  const {loading: loadingVolume, data: volumeData, error: volumeError} = useQuery<VolumeQuery, AddressVar>(
    POOL_VOLUME_GQL,
    { variables: { address } }
  );
  const {loading: loadingFees, data: feesData, error: feeError} = useQuery<FeeSubscrition, FeeVar>(
    POOL_FEES_GQL,
    { variables: { address, fromTime: toTimestamp(new Date(Date.now() - 1000 * 60 * 60 * 24)) } }
  );
  
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
    volumeData && volumeData.pool_hour_volume.length > 0 && decimal1 != 1
      ? formatAmount(volumeData.pool_hour_volume[0].amount_1, decimal1)
      : "-";

  const volume2 =
    volumeData && volumeData.pool_hour_volume.length > 0 && decimal2 != 1
      ? formatAmount(volumeData.pool_hour_volume[0].amount_2, decimal2)
      : "-";
  const volumeDifference1 =
    volumeData && volumeData.pool_hour_volume.length > 2
    ? (
        volumeData.pool_hour_volume[0].amount_1 - 
        volumeData.pool_hour_volume[1].amount_1
      ) / volumeData.pool_hour_volume[1].amount_1 * 100
    : 0;
  const volumeDifference2 =
    volumeData && volumeData.pool_hour_volume.length > 2
    ? (
        volumeData.pool_hour_volume[0].amount_2 - 
        volumeData.pool_hour_volume[1].amount_2
      ) / volumeData.pool_hour_volume[1].amount_2 * 100
    : 0;

  const fee1 =
    feesData && decimal1 != 1
      ? formatAmount(feesData.pool_minute_fee_aggregate.aggregate.sum.fee_1, decimal1)
      : "-";
  const fee2 =
    feesData && decimal1 != 1
      ? formatAmount(feesData.pool_minute_fee_aggregate.aggregate.sum.fee_2, decimal2)
      : "-";

  return (
    <>
     
     <Components.Display.MT size="2" />
      <Components.Card.Card>
        <div className="d-flex flex-column">
          <BoldText size={1.2}>TVL</BoldText>
          <Components.Text.BoldText size={1.6}>{totalSupply}</Components.Text.BoldText>
          <Components.Text.ColorText color={totalSupplyPercentage < 0 ? "danger" : "success"} size={1}>{totalSupplyPercentage.toFixed(3)} %</Components.Text.ColorText>
        </div>
      </Components.Card.Card>

      <Components.Display.MT size="2" />
      <Components.Card.Card>
        <BoldText size={1.2}>Total Tokens Locked</BoldText>
        <Components.Display.MT size="2" />
        <InfoLine 
          icon={icon1}
          symbol={symbol1}
          amount={reserved1}
        />
        
        <Components.Display.MT size="1" />
        <InfoLine 
          icon={icon2}
          symbol={symbol2}
          amount={reserved2}
        />
      </Components.Card.Card>
      <Components.Display.MT size="2" />
      <Components.Card.Card>
        <BoldText size={1.2}>Volume 24h</BoldText>

        <InfoPercentageLine 
          icon={icon1}
          symbol={symbol1}
          amount={volume1}
          percentage={volumeDifference1}
        />

        <Components.Display.MT size="1" />
        <InfoPercentageLine 
          icon={icon2}
          symbol={symbol2}
          amount={volume2}
          percentage={volumeDifference2}
        />

        {/* <div className="d-flex ms-1">
          <Components.Icons.TokenIcon src={icon1}/>
          <Components.Text.BoldText size={1.6}> 
            {volume1}
          </Components.Text.BoldText>
        </div>
        <Components.Text.ColorText color={volumeDifference1 < 0 ? "danger" : "success"} size={1}>{volumeDifference1.toFixed(3)} %</Components.Text.ColorText>

        <div className="d-flex ms-1">
          <Components.Icons.TokenIcon src={icon2}/>
          <Components.Text.BoldText size={1.6}>
            {volume2}
          </Components.Text.BoldText>
        </div>
        <Components.Text.ColorText color={volumeDifference2 < 0 ? "danger" : "success"} size={1}>{volumeDifference2.toFixed(3)} %</Components.Text.ColorText> */}
      </Components.Card.Card>


      <Components.Display.MT size="2" />
      <Components.Card.Card>
        <BoldText size={1.2}>Fees 24h</BoldText>
        <InfoLine 
          icon={icon1}
          symbol={symbol1}
          amount={fee1}
        />
        <Components.Display.MT size="1" />
        <InfoLine 
          icon={icon2}
          symbol={symbol2}
          amount={fee2}
        />
        {/* <div className="d-flex flex-column ms-1">
          <Components.Text.BoldText size={1.6}>$103k</Components.Text.BoldText>
        </div> */}
      </Components.Card.Card>
    </>
  );
}

export default PoolInfo;

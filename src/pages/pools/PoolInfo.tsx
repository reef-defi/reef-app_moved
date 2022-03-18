import React, { useMemo } from "react"
import { useQuery, gql} from "@apollo/client"
import { dropDuplicatesMultiKey, formatAmount, toDecimal, toTimestamp } from "../../utils/utils";
import { Components } from "@reef-defi/react-lib";
import { AddressVar, BasicVar } from "./poolTypes";

const {BoldText, Text} = Components.Text;
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

type VolumeQuery = { pool_hour_volume_aggregate: { aggregate: { sum: Volume } } };
type SupplyQuery = {pool_minute_supply: Supply[] };

interface FeeSubscrition {
  pool_hour_fee_aggregate: {
    aggregate: {
      sum: Fee;
    }
  }
}

const POOL_SUPPLY_GQL = gql`
query pool_supply($address: String!) {
  pool_minute_supply(
    where: {
      pool: { address: {_ilike: $address } }
    }
    order_by: { timeframe: desc }
    limit: 1
  ) {
    total_supply
    supply
    timeframe
  }
}
`

const POOL_VOLUME_GQL = gql`
query pool_volume($address: String!, $fromTime: timestamptz!, $toTime: timestamptz!) {
  pool_hour_volume_aggregate(
    where: {_and: [
      { pool: { address: { _ilike: $address} } }
      { timeframe: { _gte: $fromTime } }
      { timeframe: { _lt: $toTime } }
    ]}
  ) {
    aggregate {
      sum {
        amount_1
        amount_2
      }
    }
  }
}
`

const POOL_FEES_GQL = gql`
query pool_fee($address: String!, $fromTime: timestamptz!) {
  pool_hour_fee_aggregate(
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

interface VolumeVar extends BasicVar {
  toTime: string;
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

const PoolInfo = ({address, decimal1, decimal2, symbol1, symbol2, reserved1, reserved2, icon1, icon2} : PoolInfo): JSX.Element => {
  const currentTime = useMemo(() => new Date(Date.now()).toISOString(), []);
  const oneDayAgo = useMemo(() => new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), []);
  const twoDaysAgo = useMemo(() => new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), []);

  const {data: supplyData} = useQuery<SupplyQuery, AddressVar>(
    POOL_SUPPLY_GQL,
    { variables: { address } }
  );
  const {data: yesterdayVolume} = useQuery<VolumeQuery, VolumeVar>(
    POOL_VOLUME_GQL,
    { 
      variables: { 
        address,
        fromTime: twoDaysAgo,
        toTime: oneDayAgo
      }
    }
  );
  const {data: todayVolume} = useQuery<VolumeQuery, VolumeVar>(
    POOL_VOLUME_GQL,
    { 
      variables: { 
        address,
        fromTime: oneDayAgo,
        toTime: currentTime
      }
    }
  );

  console.log(todayVolume)
  const {data: feesData } = useQuery<FeeSubscrition, BasicVar>(
    POOL_FEES_GQL,
    { variables: { address, fromTime: toTimestamp(new Date(Date.now() - 1000 * 60 * 60 * 24)) } }
  );

  // Supply
  const totalSupply = 
    supplyData && supplyData.pool_minute_supply.length > 0
      ? formatAmount(supplyData.pool_minute_supply[0].total_supply, 18) 
      : "-"

  const totalSupplyPercentage = 
    supplyData && supplyData.pool_minute_supply.length > 0
    ? supplyData.pool_minute_supply[0].supply / supplyData.pool_minute_supply[0].total_supply * 100
    : 0;

  // Volume
  const todayVolume1 = todayVolume ? todayVolume.pool_hour_volume_aggregate.aggregate.sum.amount_1 : 0;
  const todayVolume2 = todayVolume ? todayVolume.pool_hour_volume_aggregate.aggregate.sum.amount_2 : 0;
  const yesterdayVolume1 = yesterdayVolume ? yesterdayVolume.pool_hour_volume_aggregate.aggregate.sum.amount_1 : 0;
  const yesterdayVolume2 = yesterdayVolume ? yesterdayVolume.pool_hour_volume_aggregate.aggregate.sum.amount_2 : 0;

  const volumeDifference1 = todayVolume1 > 0 ? (todayVolume1 - yesterdayVolume1) / yesterdayVolume1 * 100 : 100;
  const volumeDifference2 = todayVolume2 > 0 ? (todayVolume2 - yesterdayVolume2) / yesterdayVolume2 * 100 : 100;

  // Fee
  const fee1 =
    feesData && decimal1 != 1
      ? formatAmount(feesData.pool_hour_fee_aggregate.aggregate.sum.fee_1, decimal1)
      : "-";
  const fee2 =
    feesData && decimal1 != 1
      ? formatAmount(feesData.pool_hour_fee_aggregate.aggregate.sum.fee_2, decimal2)
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
          amount={formatAmount(todayVolume1, decimal1)}
          percentage={volumeDifference1}
        />

        <Components.Display.MT size="1" />
        <InfoPercentageLine 
          icon={icon2}
          symbol={symbol2}
          amount={formatAmount(todayVolume2, decimal2)}
          percentage={volumeDifference2}
        />
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
      </Components.Card.Card>
    </>
  );
}

export default PoolInfo;

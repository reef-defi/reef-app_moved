import React, { useMemo, useState } from 'react';

import { Components } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { ADD_LIQUIDITY_URL, DEFAULT_ADD_LIQUIDITY_URL, POOL_CHART_URL } from '../../urls';
import {
  formatAmount, toDecimal, toHumanAmount, toTimestamp,
} from '../../utils/utils';

const { BoldText } = Components.Text;
const { Loading } = Components.Loading;

interface Supply {
  supply: number;
  total_supply: number;
}

interface Volume {
  amount_1: number;
  amount_2: number;
}

interface Pool {
  address: string;
  supply: Supply[];
  symbol_1: string;
  symbol_2: string;
  decimal_1: number;
  decimal_2: number;
  volume_aggregate: { aggregate: { sum: Volume } };
}

type PoolQuery = { verified_pool: Pool[] };

interface PoolVar {
  offset: number;
  fromTime: string;
  search: { _ilike?: string; };
}

interface PoolCount {
  verified_pool_aggregate: {
    aggregate: {
      count: number;
    }
  }
}

const POOLS_GQL = gql`
query pool($offset: Int!, $search: String_comparison_exp!, $fromTime: timestamptz!) {
  verified_pool(
    where: {
      _or: [
        { name_1: $search }
        { name_2: $search }
        { address: $search }
        { symbol_1: $search }
        { symbol_2: $search }
      ]
    }
    order_by: {supply_aggregate: {sum: {supply: desc}}}
    limit: 10
    offset: $offset
  ) {
    address
    supply(limit: 1, order_by: {timeframe: desc}) {
      total_supply
      supply
    }
    volume_aggregate(
      where: {
        timeframe: { _gte: $fromTime }
      }
    ) {
      aggregate {
        sum {
          amount_1
          amount_2
        }
      }
    }
    symbol_1
    symbol_2
    decimal_1
    decimal_2
  }
}
`;

const POOL_COUNT_GQL = gql`
query pool_count($search: String_comparison_exp!) {
  verified_pool_aggregate(
    where: {
      _or: [
        { name_1: $search }
        { name_2: $search }
        { address: $search }
        { symbol_1: $search }
        { symbol_2: $search }
      ]
    }
  ) {
    aggregate {
      count
    }
  }
}
`;

const PoolList = (): JSX.Element => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const offset = pageIndex * 10;
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const oda = useMemo(() => new Date(oneDayAgo).toISOString(), []);
  const { data, loading, error } = useQuery<PoolQuery, PoolVar>(
    POOLS_GQL,
    {
      variables: {
        offset,
        search: search ? { _ilike: `${search}%` } : {},
        fromTime: oda,
      },
    },
  );
  const { data: poolAggregationData } = useQuery<PoolCount>(POOL_COUNT_GQL);
  const maxPage = poolAggregationData
    ? Math.ceil(poolAggregationData.verified_pool_aggregate.aggregate.count / 10)
    : 1;

  const openAddLiquidity = (): void => history.push(DEFAULT_ADD_LIQUIDITY_URL);
  const openPool = (address: string) => (): void => history.push(POOL_CHART_URL.replace(':address', address));

  const nextPage = (): void => setPageIndex(Math.min(maxPage - 1, pageIndex + 1));
  const prevPage = (): void => setPageIndex(Math.max(0, pageIndex - 1));

  const pools = data
    ? data.verified_pool.map(({
      address, supply, symbol_1, decimal_1, decimal_2, symbol_2, volume_aggregate: { aggregate: { sum: { amount_1, amount_2 } } },
    }, index) => (
      <tr key={address} onClick={openPool(address)} className="cursor-pointer">
        <td className="fs-5">{offset + index + 1}</td>
        <td className="fs-5">
          {symbol_1}
          /
          {symbol_2}
        </td>
        <td className="fs-5 text-end">{supply.length > 0 ? formatAmount(supply[0].total_supply, 18) : 0}</td>
        <td className="fs-5 text-end">{formatAmount(amount_1 || 0, decimal_1)}</td>
        <td className="fs-5 text-end">{formatAmount(amount_2 || 0, decimal_2)}</td>
      </tr>
    ))
    : [];

  return (
    <>
      <Components.Display.ContentBetween>
        <BoldText size={1.6}>Pools</BoldText>
        <Components.Input.Input
          value={search}
          onChange={setSearch}
          className="w-50 fs-5"
          placeholder="Search pool by address or token name"
        />
        <Components.Button.Button onClick={openAddLiquidity}>Add liquidity</Components.Button.Button>
      </Components.Display.ContentBetween>

      <Components.Display.MT size="2" />
      <Components.Card.Card>
        { loading
          ? <Loading />
          : (
            <div className="table-responsive-sm">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-start fs-5 w-25">Pool</th>
                    <th scope="col" className="text-end fs-5">TVL</th>
                    <th scope="col" className="text-end fs-5">Volme1 24h</th>
                    <th scope="col" className="text-end pe-4 fs-5">Volume2 24h</th>
                  </tr>
                </thead>
                <tbody>
                  { !loading
                    ? pools
                    : <Loading />}
                </tbody>
              </table>
            </div>
          )}
        <Components.Display.MT size="3" />
        <div className="d-flex justify-content-center">
          <div>
            <Components.Button.EmptyButton onClick={prevPage}>{'<-'}</Components.Button.EmptyButton>
            <span className="my-auto">
              Page
              {' '}
              {pageIndex + 1}
              {' '}
              of
              {' '}
              {maxPage}
            </span>
            <Components.Button.EmptyButton onClick={nextPage}>{'->'}</Components.Button.EmptyButton>
          </div>
        </div>
      </Components.Card.Card>
    </>
  );
};

export default PoolList;

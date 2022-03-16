import React, { useState } from 'react';

import {Components} from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL } from '../../urls';
import { useQuery, gql } from '@apollo/client';
import { formatAmount } from '../../utils/utils';

const {BoldText} = Components.Text;
const {Loading} = Components.Loading;

interface Supply {
  supply: number;
  total_supply: number;
}

interface Volume {
  amount_1: number;
  amount_2: number;
}

interface TokenContract {
  address: string;
  verified_contract: {
    contract_data: {
      name: string;
      symbol: string;
      decimal: number;
    }
  } | null;
}

interface Pool {
  address: string;
  supply: Supply[];
  volume: Volume[];
  token_contract_1: TokenContract;
  token_contract_2: TokenContract;
}

type PoolQuery = { pool: Pool[] };

interface PoolVar {
  offset: number;
}

interface PoolCount {
  pool_aggregate: {
    aggregate: {
      count: number;
    }
  }
}

const POOLS_GQL = gql`
query pool($offset: Int!) {
  pool(
    order_by: {supply_aggregate: {sum: {supply: desc}}}
    limit: 10
    offset: $offset
  ) {
    address
    supply(limit: 1, order_by: {timeframe: desc}) {
      total_supply
      supply
    }
    volume(limit: 1, order_by: {timeframe: desc}) {
      amount_1
      amount_2
    }
    token_contract_1 {
      address
      verified_contract {
        contract_data
      }
    }
    token_contract_2 {
      address
      verified_contract {
        contract_data
      }
    }
  }
}
`;

const POOL_COUNT_GQL = gql`
query pool_count {
  pool_aggregate {
    aggregate {
      count
    }
  }
}
`;

const PoolList = (): JSX.Element => {
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const offset = pageIndex * 10;
  // const pools: Pool[]|undefined = hooks.useObservableState(appState.pools$);
  const {data, loading, error} = useQuery<PoolQuery, PoolVar>(
    POOLS_GQL,
    { variables: { offset } }
  );
  const {data: d1, loading: l1, error: e1} = useQuery<PoolCount, {}>(POOL_COUNT_GQL);
  
  const maxPage = d1
    ? Math.ceil(d1.pool_aggregate.aggregate.count/10)
    : 1;

  const openAddLiquidity = (): void => history.push(ADD_LIQUIDITY_URL);
  const openPool = (address: string) => () => history.push(POOL_CHART_URL.replace(':address', address));

  const nextPage = () => setPageIndex(Math.min(maxPage-1, pageIndex + 1));
  const prevPage = () => setPageIndex(Math.max(0, pageIndex - 1));


  const pools = data
    ? data.pool.map(({address, supply, token_contract_1, token_contract_2, volume}, index) => (
      <tr key={address} onClick={openPool(address)} className="cursor-pointer">
        <td scope="row" className='fs-5'>{offset + index + 1}</td>
        <td className='fs-5'>{token_contract_1.verified_contract ? token_contract_1.verified_contract.contract_data.symbol : "?"}/{token_contract_2.verified_contract ? token_contract_2.verified_contract.contract_data.symbol : "?"}</td>
        <td className='fs-5 text-end'>{supply.length > 0 ? formatAmount(supply[0].total_supply, 18) : 0}</td>
        <td className='fs-5 text-end'>{volume.length > 0 ? formatAmount(volume[0].amount_1, 18) : 0}</td>
        <td className='fs-5 text-end'>{volume.length > 0 ? formatAmount(volume[0].amount_2, 18) : 0}</td>
      </tr>
    ))
    : [];

  return (
    <>
      <Components.Display.ContentBetween>
        <BoldText size={1.6}>Pools</BoldText>
        <Components.Input.Input 
          className="w-50" 
          placeholder=''
        />
        <Components.Button.Button onClick={openAddLiquidity}>Add liquidity</Components.Button.Button>
      </Components.Display.ContentBetween>

      <Components.Display.MT size="2" />
      <Components.Card.Card>
        { loading ? 
        <Loading />
        :
        <div className='table-responsive-sm'>            
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
                : <Loading />
              }
            </tbody>
          </table>
        </div>
        }
        <Components.Display.MT size="3" />
        <div className="d-flex justify-content-center">
          <div>
            <Components.Button.EmptyButton onClick={prevPage}>{'<-'}</Components.Button.EmptyButton>
            <span className='my-auto'>
              Page {pageIndex + 1} of {maxPage}
            </span>
            <Components.Button.EmptyButton onClick={nextPage}>{'->'}</Components.Button.EmptyButton>
          </div>
        </div>
      </Components.Card.Card>
    </>
  );
}

export default PoolList;
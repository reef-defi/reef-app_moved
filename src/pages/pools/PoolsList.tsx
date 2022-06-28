import React, { useContext, useMemo, useState } from 'react';
import Uik from '@reef-defi/ui-kit';
import './pools.css';
import { faArrowUpFromBracket, faCoins } from '@fortawesome/free-solid-svg-icons';
import { hooks } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import PoolsSearch from './PoolsSearch';
import TokenPricesContext from '../../context/TokenPricesContext';
import { POOL_CHART_URL } from '../../urls';

interface Pool {
  address?: string,
  tvl: string;
  volume24h: string;
  volumeChange24h: number;
  myLiquidity?: string;
  token1: {
    name: string;
    image: string;
  };
  token2: {
    name: string;
    image: string;
  };
}

const PoolsList = (): JSX.Element => {
  const pageCount = 10;
  const [currentPage, changePage] = useState(1);
  const [search, setSearch] = useState('');
  const tokenPrices = useContext(TokenPricesContext);

  const [pools, arePoolsLoading] = hooks.usePoolsList({
    limit: pageCount,
    offset: (currentPage - 1) * pageCount,
    reefscanApi: 'https://testnet.reefscan.com',
    search,
    signer: '5DvcwghWVZW9BueQ1RzHYcosrKUX6tbbMPhnYGv6XdjMmubF',
    tokenPrices,
    queryType: 'All',
  });

  const history = useHistory();
  const openPool = (
    address: string,
    action: 'provide' | 'withdraw' = 'provide',
  ): void => history.push(
    POOL_CHART_URL
      .replace(':address', address || 'address')
      .replace(':action', action),
  );

  return (
    <>
      <div className="pools__table-top">
        <Uik.Text type="title">Pools</Uik.Text>
        <PoolsSearch
          value={search}
          onInput={(value) => { setSearch(value); }}
        />
      </div>

      <Uik.Table
        seamless
        pagination={{
          count: pageCount,
          current: currentPage,
          onChange: (page) => { changePage(page); },
        }}
      >
        <Uik.THead>
          <Uik.Tr>
            <Uik.Th>Pair</Uik.Th>
            <Uik.Th align="right">TVL</Uik.Th>
            <Uik.Th align="right">24h Vol.</Uik.Th>
            <Uik.Th align="right">24h Vol. %</Uik.Th>
            <Uik.Th />
          </Uik.Tr>
        </Uik.THead>

        <Uik.TBody>
          {
                pools.map((item: Pool, index) => (
                  <Uik.Tr
                    key={`pool-${index}`}
                    onClick={() => openPool(item.address || '')}
                  >
                    <Uik.Td>
                      <div className="pools__pair">
                        <img src={item.token1.image} alt={item.token1.name} />
                        <img src={item.token2.image} alt={item.token1.name} />
                      </div>
                      <span>
                        { item.token1.name }
                        {' '}
                        -
                        {' '}
                        { item.token2.name }
                      </span>
                    </Uik.Td>
                    <Uik.Td align="right">
                      $
                      { item.tvl }
                    </Uik.Td>
                    <Uik.Td align="right">
                      $
                      { item.volume24h }
                    </Uik.Td>
                    <Uik.Td align="right">
                      <Uik.Trend
                        type={item.volumeChange24h >= 0 ? 'good' : 'bad'}
                        direction={item.volumeChange24h >= 0 ? 'up' : 'down'}
                        text={`${item.volumeChange24h}%`}
                      />
                    </Uik.Td>
                    <Uik.Td align="right">
                      {
                        !!item.myLiquidity
                        && (
                        <Uik.Button
                          text="Withdraw"
                          icon={faArrowUpFromBracket}
                          fill
                          onClick={(e) => {
                            e.stopPropagation();
                            openPool(item.address || '', 'withdraw');
                          }}
                        />
                        )
                      }
                      <Uik.Button text="Provide" icon={faCoins} fill />
                    </Uik.Td>
                  </Uik.Tr>
                ))
              }
        </Uik.TBody>
      </Uik.Table>
    </>
  );
};

export default PoolsList;

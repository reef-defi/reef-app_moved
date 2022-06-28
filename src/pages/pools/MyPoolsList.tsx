import React, { useContext, useState } from 'react';
import Uik from '@reef-defi/ui-kit';
import './pools.css';
import { faArrowUpFromBracket, faCoins } from '@fortawesome/free-solid-svg-icons';
import PoolsSearch from './PoolsSearch';
import TokenPricesContext from '../../context/TokenPricesContext';
import { hooks } from '@reef-defi/react-lib';

const data = [
  {
    tvl: '$1.60 M',
    myLiquidity: '$56.5K',
    volume24h: '$140.150',
    volumeChange24h: 22,
    token1: {
      name: 'REEF',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
    },
    token2: {
      name: 'FISH',
      image: 'https://app.reef.io/img/token-icons/token-icon-7.png',
    },
  },
  {
    tvl: '$722.23 K',
    myLiquidity: '$56.5K',
    volume24h: '$120.584',
    volumeChange24h: -5,
    token1: {
      name: 'REEF',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
    },
    token2: {
      name: 'FISH',
      image: 'https://app.reef.io/img/token-icons/token-icon-7.png',
    },
  },
  {
    tvl: '$301.12 K',
    myLiquidity: '$56.5K',
    volume24h: '$90.050',
    volumeChange24h: 15,
    token1: {
      name: 'REEF',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
    },
    token2: {
      name: 'FISH',
      image: 'https://app.reef.io/img/token-icons/token-icon-7.png',
    },
  },
];

const MyPoolsList = (): JSX.Element => {
  const pageCount = 10;
  const [currentPage, changePage] = useState(1);
  const [search, setSearch] = useState('');
  const tokenPrices = useContext(TokenPricesContext)

  const [pools, arePoolsLoading] = hooks.usePoolsList({
    limit: pageCount,
    offset: (currentPage-1) * pageCount,
    reefscanApi: "https://testnet.reefscan.com",
    search,
    signer: "5DvcwghWVZW9BueQ1RzHYcosrKUX6tbbMPhnYGv6XdjMmubF",
    tokenPrices,
    queryType: 'User'
  })


  return (
    <>
      <div className="pools__table-top">
        <Uik.Text type="title">My Pools</Uik.Text>
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
            <Uik.Th align="right">My Liquidity</Uik.Th>
            <Uik.Th align="right">TVL</Uik.Th>
            <Uik.Th align="right">24h Vol.</Uik.Th>
            <Uik.Th align="right">24h Vol. %</Uik.Th>
            <Uik.Th />
          </Uik.Tr>
        </Uik.THead>

        <Uik.TBody>
          {
              pools.map((item, index) => (
                <Uik.Tr
                  key={`my-pool-${index}`}
                  onClick={() => {}}
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
                  <Uik.Td align="right">$ { item.myLiquidity }</Uik.Td>
                  <Uik.Td align="right">$ { item.tvl }</Uik.Td>
                  <Uik.Td align="right">$ { item.volume24h }</Uik.Td>
                  <Uik.Td align="right">
                    <Uik.Trend
                      type={item.volumeChange24h >= 0 ? 'good' : 'bad'}
                      direction={item.volumeChange24h >= 0 ? 'up' : 'down'}
                      text={`${item.volumeChange24h}%`}
                    />
                  </Uik.Td>
                  <Uik.Td align="right">
                    <Uik.Button text="Withdraw" icon={faArrowUpFromBracket} fill />
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

export default MyPoolsList;
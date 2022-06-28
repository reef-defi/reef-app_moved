import './pool.css';
import React from 'react';
import Stats from './Stats';
import Chart from './Chart';
import Actions from './Actions';

const data = {
  token1: {
    name: 'Reef',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
    percentage: 50,
    amountLocked: '460.57 k',
    myLiquidity: '12,78 k',
    fees24h: '36,50',
    ratio: {
      amount: 0.001,
      name: 'FISH',
    },
  },
  token2: {
    name: 'Fish',
    image: 'https://app.reef.io/img/token-icons/token-icon-7.png',
    percentage: 50,
    amountLocked: '460.57 k',
    myLiquidity: '12,78 k',
    fees24h: '36,50',
    ratio: {
      amount: 1000,
      name: 'REEF',
    },
  },
  totalValueLocked: '1.60 M',
  myLiquidity: '1.25 k',
  volume24h: '218.35 k',
  volumeChange24h: 20,
};

const Pool = () => (
  <div className="pool">
    <Stats data={data} />

    <div className="pool__content">
      <Actions />
      <Chart />
    </div>
  </div>
);

export default Pool;

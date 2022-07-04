import './pool.css';
import React, { useContext } from 'react';
import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import { useParams } from 'react-router-dom';
import Stats from './Stats';
import Chart from './Chart';
import Actions from './Actions';
import TokenPricesContext from '../../../context/TokenPricesContext';

const chartTokens = {
  firstToken: {
    name: 'Reef',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
  },
  secondToken: {
    name: 'Fish',
    image: 'https://app.reef.io/img/token-icons/token-icon-7.png',
  },
};

const chartData = {
  firstToken: [
    {
      open: 10, high: 10.63, low: 9.49, close: 9.55, time: '2021-01-01',
    },
    {
      open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: '2021-01-02',
    },
    {
      open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: '2021-01-03',
    },
    {
      open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: '2021-01-04',
    },
    {
      open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: '2021-01-05',
    },
    {
      open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: '2021-01-06',
    },
    {
      open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: '2021-01-07',
    },
    {
      open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: '2021-01-08',
    },
    {
      open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: '2021-01-09',
    },
    {
      open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: '2021-01-10',
    },
  ],
  secondToken: [
    {
      open: 10, high: 10.63, low: 9.49, close: 9.55, time: '2021-01-01',
    },
    {
      open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: '2021-01-02',
    },
    {
      open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: '2021-01-03',
    },
    {
      open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: '2021-01-04',
    },
    {
      open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: '2021-01-05',
    },
    {
      open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: '2021-01-06',
    },
    {
      open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: '2021-01-07',
    },
    {
      open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: '2021-01-08',
    },
    {
      open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: '2021-01-09',
    },
    {
      open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: '2021-01-10',
    },
  ],
  tvl: [
    { value: 1, time: 1642425322 },
    { value: 8, time: 1642511722 },
    { value: 10, time: 1642598122 },
    { value: 20, time: 1642684522 },
    { value: 3, time: 1642770922 },
    { value: 43, time: 1642857322 },
    { value: 41, time: 1642943722 },
    { value: 43, time: 1643030122 },
    { value: 56, time: 1643116522 },
    { value: 46, time: 1643202922 },
  ],
  volume: [
    { value: 25000, time: '2021-01-01' },
    { value: 20000, time: '2021-01-02' },
    { value: 35000, time: '2021-01-03' },
    { value: 60000, time: '2021-01-04' },
    { value: 40000, time: '2021-01-05' },
    { value: 35000, time: '2021-01-06' },
    { value: 80000, time: '2021-01-07' },
    { value: 20000, time: '2021-01-08' },
    { value: 25000, time: '2021-01-09' },
    { value: 50000, time: '2021-01-10' },
    { value: 250000, time: '2021-01-11' },
    { value: 30000, time: '2021-01-12' },
    { value: 40000, time: '2021-01-13' },
    { value: 35000, time: '2021-01-14' },
    { value: 15000, time: '2021-01-15' },
    { value: 200000, time: '2021-01-16' },
    { value: 250000, time: '2021-01-17' },
    { value: 20000, time: '2021-01-18' },
    { value: 35000, time: '2021-01-19' },
    { value: 30000, time: '2021-01-20' },
    { value: 400000, time: '2021-01-21' },
    { value: 35000, time: '2021-01-22' },
    { value: 150000, time: '2021-01-23' },
    { value: 20000, time: '2021-01-24' },
    { value: 200000, time: '2021-01-25' },
    { value: 350000, time: '2021-01-26' },
    { value: 300000, time: '2021-01-27' },
    { value: 40000, time: '2021-01-28' },
    { value: 35000, time: '2021-01-29' },
    { value: 150000, time: '2021-01-30' },
    { value: 200000, time: '2021-01-31' },
  ],
  fees: [
    { value: 15, time: '2021-01-01' },
    { value: 3, time: '2021-01-02' },
    { value: 4, time: '2021-01-03' },
    { value: 30, time: '2021-01-04' },
    { value: 35, time: '2021-01-05' },
    { value: 20, time: '2021-01-06' },
    { value: 2, time: '2021-01-07' },
    { value: 15, time: '2021-01-08' },
    { value: 35, time: '2021-01-09' },
    { value: 4, time: '2021-01-10' },
    { value: 3, time: '2021-01-11' },
    { value: 3, time: '2021-01-12' },
    { value: 2, time: '2021-01-13' },
    { value: 25, time: '2021-01-14' },
    { value: 20, time: '2021-01-15' },
    { value: 1, time: '2021-01-16' },
    { value: 3, time: '2021-01-17' },
    { value: 4, time: '2021-01-18' },
    { value: 3, time: '2021-01-19' },
    { value: 25, time: '2021-01-20' },
    { value: 5, time: '2021-01-21' },
    { value: 2, time: '2021-01-22' },
    { value: 2, time: '2021-01-23' },
    { value: 8, time: '2021-01-24' },
    { value: 3, time: '2021-01-25' },
    { value: 4, time: '2021-01-26' },
    { value: 20, time: '2021-01-27' },
    { value: 30, time: '2021-01-28' },
    { value: 5, time: '2021-01-29' },
    { value: 18, time: '2021-01-30' },
    { value: 9, time: '2021-01-31' },
  ],
};

const actionsData = {
  firstToken: {
    name: 'Reef',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
    available: 1000,
    provided: 500,
    ratio: 0.001,
  },
  secondToken: {
    name: 'Test',
    image: '',
    available: 1000000,
    provided: 500000,
    ratio: 1000,
  },
  fees: {
    provide: {
      amount: 0.02,
      token: {
        name: 'Reef',
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
      },
    },
    withdraw: {
      amount: 0.02,
      token: {
        name: 'Reef',
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png',
      },
    },
  },
};

interface Params {
  address: string;
  action: string;
}

const Pool = () => {
  const { address } = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );

  const [poolInfo, loading] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices,
  );

  if (!poolInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pool">
      <Stats data={poolInfo} />

      <div className="pool__content">
        <Actions data={actionsData} />
        <Chart
          tokens={chartTokens}
          data={chartData}
        />
      </div>
    </div>
  );
};

export default Pool;

import './pool.css';
import React, { useContext } from 'react';
import Stats from './Stats';
import Chart from './Chart';
import Actions from './Actions';
import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import { useParams } from 'react-router-dom';
import TokenPricesContext from '../../../context/TokenPricesContext';


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
  const {address} = useParams<Params>();
  const tokenPrices = useContext(TokenPricesContext);

  const signer: ReefSigner | undefined | null = hooks.useObservableState(
    appState.selectedSigner$,
  );
  
  const [poolInfo, loading] = hooks.usePoolInfo(
    address,
    signer?.address || '',
    tokenPrices
  );

  if (!poolInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="pool">
      <Stats data={poolInfo} />

      <div className="pool__content">
        <Actions data={actionsData} />
        <Chart />
      </div>
    </div>
  );
}

export default Pool;

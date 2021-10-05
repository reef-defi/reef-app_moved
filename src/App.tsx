import React, { useState } from 'react';
import Sidebar from './common/Sidebar';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';
import {availableNetworks, hooks} from "@reef-defi/react-lib";
import { useAppSelector } from './store';

const {useProvider} = hooks;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = useProvider(availableNetworks.mainnet.rpcUrl);
  
  return (
    <div className="App d-flex w-100 h-100">
      <Sidebar />
      <div className="w-100">
        <Nav />
        <ContentRouter />
      </div>
    </div>
  );
}

export default App;

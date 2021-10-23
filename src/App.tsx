import React from 'react';
import { availableNetworks, hooks } from '@reef-defi/react-lib';
import Sidebar from './common/Sidebar';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';
import { useLoadSigners } from './hooks/useLoadSigners';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadPools } from './hooks/useLoadPools';

const { useProvider } = hooks;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = useProvider(availableNetworks.mainnet.rpcUrl);
  useLoadSigners(provider);
  useLoadTokens();
  useLoadPools();

  return (
    <div className="App d-flex w-100 h-100">
      <Sidebar />
      <div className="w-100 main-content">
        <Nav />
        <ContentRouter />
        <div className="w-100" style={{ height: '600px' }}>
          <img src="/design.png" alt="" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default App;

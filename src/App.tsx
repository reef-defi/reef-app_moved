import React, { useEffect } from 'react';
import { hooks } from '@reef-defi/react-lib';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';
import { useLoadSigners } from './hooks/useLoadSigners';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadPools } from './hooks/useLoadPools';
import { currentNetwork } from './environment';
import { useAppSelector } from './store';

const { useProvider } = hooks;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = useProvider(currentNetwork.rpcUrl);
  useLoadSigners(provider);
  useLoadTokens();
  useLoadPools();

  return (
    <div className="App d-flex w-100 h-100">
      {/* <Sidebar /> */}
      <div className="w-100 main-content">
        <Nav />
        <ContentRouter />
      </div>
    </div>
  );
};

export default App;

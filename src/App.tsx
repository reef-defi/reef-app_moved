import React from 'react';
import { hooks } from '@reef-defi/react-lib';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';
import { useLoadSigners } from './hooks/useLoadSigners';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadPools } from './hooks/useLoadPools';
import { currentNetwork } from './environment';
import { useReloadSelectedBalance } from './hooks/useReloadSelectedBalance';

const { useProvider } = hooks;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = useProvider(currentNetwork.rpcUrl);
  useLoadSigners(provider);
  useLoadTokens();
  useLoadPools();
  useReloadSelectedBalance();

  return (
    <div className="App d-flex w-100 h-100">
      <div className="w-100 main-content">
        <Nav />
        <ContentRouter />
      </div>
    </div>
  );
};

export default App;

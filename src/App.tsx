import React from 'react';
import { hooks, hooks as reefHooks } from '@reef-defi/react-lib';
import { useGetSigner } from './hooks/useGetSigner';
import { useReloadSelectedBalance } from './hooks/useReloadSelectedBalance';
import { useLoadPools } from './hooks/useLoadPools';
import { useLoadTokens } from './hooks/useLoadTokens';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import { useAppProvider } from './hooks/useAppProvider';
import { useAppDispatch, useAppSelector } from './store';
import { useAppLoadSigners } from './hooks/useAppLoadSigners';
import { currentNetwork } from './environment';
import { useInitReefState } from './hooks/useInitReefState';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // const { provider } = useAppSelector((state) => state.app);
  // useAppProvider();
  useInitReefState();
  // useAppLoadSigners(provider);
  const currentSigner = useGetSigner();
  useLoadTokens();
  useLoadPools();
  useReloadSelectedBalance();
  reefHooks.useBindEvmAddressAlert(currentSigner, provider);

  return (
    <div className="App d-flex w-100 h-100 ">
      <div className="w-100 main-content">
        <Nav />
        <ContentRouter />
      </div>
    </div>
  );
};

export default App;

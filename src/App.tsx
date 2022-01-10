import React from 'react';
import { hooks } from '@reef-defi/react-lib';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import { useAppDispatch, useAppSelector } from './store';
import { useInitReefState } from './hooks/useInitReefState';
import { useObservableState } from './hooks/useObservableState';
import { providerSubj } from './state/providerState';

const App = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  // const { provider } = useAppSelector((state) => state.app);
  // useAppProvider();
  const provider = useObservableState(providerSubj);
  const [signers] = hooks.useLoadSigners('Reef App', provider);
  useInitReefState(signers);
  // useAppLoadSigners(provider);
  // const currentSigner = useGetSigner();
  // useLoadTokens();
  // useLoadPools();
  // useReloadSelectedBalance();
  // reefHooks.useBindEvmAddressAlert(currentSigner, provider);

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

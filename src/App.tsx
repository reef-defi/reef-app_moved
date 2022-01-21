import React, { useEffect } from 'react';
import { hooks } from '@reef-defi/react-lib';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import { useInitReefState } from './hooks/useInitReefState';
import { useObservableState } from './hooks/useObservableState';
import { providerSubj } from './state/providerState';
import { selectedSigner$ } from './state/accountState';

const App = (): JSX.Element => {
  const provider = useObservableState(providerSubj);
  const [signers] = hooks.useLoadSigners('Reef App', provider);
  useInitReefState(signers);
  const currentSigner = useObservableState(selectedSigner$);
  hooks.useBindEvmAddressAlert(currentSigner, provider);

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

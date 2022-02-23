import React from 'react';
import {
  appState, graphql, hooks, ReefSigner,
} from '@reef-defi/react-lib';
import { Provider } from '@reef-defi/evm-provider';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import NoExtension from "./pages/error/NoExtension"
import { currentNetwork } from './environment';
import { innitialNetwork } from './environment';

const App = (): JSX.Element => {
  const provider: Provider|undefined = hooks.useObservableState(appState.providerSubj);
  const [signers, loading, error] = hooks.useLoadSigners('Reef App', provider);
  hooks.useInitReefState(signers, innitialNetwork);
  const currentSigner: ReefSigner|undefined = hooks.useObservableState(appState.selectedSigner$);
  const apollo = hooks.useObservableState(graphql.apolloClientInstance$);
  hooks.useBindEvmAddressAlert(currentSigner, provider);

  return (
    <>
      {apollo && (
      <div className="App d-flex w-100 h-100">
        <div className="w-100 main-content">
          {!loading && !error && (
            <>
              <Nav display={!loading && !error} />
              <ContentRouter />
            </>
          )}

          {error && <NoExtension />}
        </div>
      </div>
      )}
    </>
  );
};

export default App;

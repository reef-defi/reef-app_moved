import React from 'react';
import {
  appState, availableNetworks, defaultOptions, graphql, hooks, ReefSigner,
} from '@reef-defi/react-lib';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import NoExtension from './pages/error/NoExtension';
import NoAccount from './pages/error/NoAccount';
import OptionContext from './context/OptionContext';
import { notify } from './utils/utils';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const { provider, loading, error } = hooks.useInitReefState(
    'Reef Wallet App', { ipfsHashResolverFn:(hash: string)=>`https://reef.infura-ipfs.io/ipfs/${hash}`}
  );
  const history = useHistory();
  const apollo: ApolloClient<any>|undefined = hooks.useObservableState(graphql.apolloClientInstance$);

  return (
    <>
      {apollo
    && (
    <ApolloProvider client={apollo}>
      <OptionContext.Provider value={{ ...defaultOptions, back: history.goBack, notify }}>
        <div className="App d-flex w-100 h-100">
          <div className="w-100 main-content">
            {!loading && !error && (
            <>
              <Nav display={!loading && !error} />
              <ContentRouter />
            </>
            )}

            {error?.code === 1 && <NoExtension />}
            {error?.code === 2 && <NoAccount />}
            <ToastContainer
              draggable
              newestOnTop
              closeOnClick
              hideProgressBar
              position={toast.POSITION.BOTTOM_LEFT}
              autoClose={5000}
              rtl={false}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
            />

          </div>
        </div>
      </OptionContext.Provider>
    </ApolloProvider>
    )}
    </>
  );
};

export default App;

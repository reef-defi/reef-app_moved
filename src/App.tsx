import { ApolloProvider } from '@apollo/client';
import { defaultOptions, graphql, hooks } from '@reef-defi/react-lib';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './common/Nav';
import OptionContext from './context/OptionContext';
import ContentRouter from './pages/ContentRouter';
import NoAccount from './pages/error/NoAccount';
import NoExtension from './pages/error/NoExtension';
import { notify } from './utils/utils';

const App = (): JSX.Element => {
  const { loading, error } = hooks.useInitReefState(
    'Reef Wallet App', { ipfsHashResolverFn: (hash: string) => `https://reef.infura-ipfs.io/ipfs/${hash}` },
  );
  const history = useHistory();
  const apollo = hooks.useObservableState(graphql.apolloClientInstance$);

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

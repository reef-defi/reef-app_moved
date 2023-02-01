import { ApolloProvider } from '@apollo/client';
import { defaultOptions, graphql, hooks } from '@reef-defi/react-lib';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './common/Nav';
import OptionContext from './context/OptionContext';
import ContentRouter from './pages/ContentRouter';
import NoAccount from './pages/error/NoAccount';
import NoExtension from './pages/error/NoExtension';
import { notify } from './utils/utils';
import HideBalance, { toggleHidden, getStoredPref } from './context/HideBalance';
import NetworkSwitch, { setSwitching } from './context/NetworkSwitch';
import Bind from './common/Bind/Bind';
import NetworkSwitching from './common/NetworkSwitching';
import InfoBar from './common/InfoBar';

const App = (): JSX.Element => {
  const { loading, error } = hooks.useInitReefState(
    'Reef Wallet App', { ipfsHashResolverFn: (hash: string) => `https://reef.infura-ipfs.io/ipfs/${hash}` },
  );
  const history = useHistory();
  const apollo = hooks.useObservableState(graphql.apolloClientInstance$);

  const [isBalanceHidden, setBalanceHidden] = useState(getStoredPref());
  const hideBalance = {
    isHidden: isBalanceHidden,
    toggle: () => toggleHidden(isBalanceHidden, setBalanceHidden),
  };

  const [isNetworkSwitching, setNetworkSwitching] = useState(false);
  const networkSwitch = {
    isSwitching: isNetworkSwitching,
    setSwitching: (value: boolean) => setSwitching(value, setNetworkSwitching),
  };

  useEffect(() => {
    if (!loading && isNetworkSwitching) setNetworkSwitching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {apollo
    && (
    <ApolloProvider client={apollo}>
      <InfoBar />
      <OptionContext.Provider value={{ ...defaultOptions, back: history.goBack, notify }}>
        <HideBalance.Provider value={hideBalance}>
          <NetworkSwitch.Provider value={networkSwitch}>
            <div className="App d-flex w-100 h-100">
              <div className="w-100 main-content">
                {!loading && !error && (
                <>
                  <Nav display={!loading && !error} />
                  <ContentRouter />
                </>
                )}

                <NetworkSwitching isOpen={isNetworkSwitching} />

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

                <Bind />
              </div>
            </div>
          </NetworkSwitch.Provider>
        </HideBalance.Provider>
      </OptionContext.Provider>
    </ApolloProvider>
    )}
    </>
  );
};

export default App;

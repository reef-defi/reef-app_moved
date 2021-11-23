import React, { useEffect, useState } from 'react';
import { Components, hooks } from '@reef-defi/react-lib';
import { BigNumber } from 'ethers';
import { useGetSigner } from './hooks/useGetSigner';
import { useReloadSelectedBalance } from './hooks/useReloadSelectedBalance';
import { currentNetwork } from './environment';
import { useLoadPools } from './hooks/useLoadPools';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadSigners } from './hooks/useLoadSigners';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import { useBindEvmAddress } from './hooks/useBindEvmAddress';

const { useProvider } = hooks;
const { Modal } = Components;
const {
  OpenModalButton, ModalFooter, ModalBody,
} = Modal;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = hooks.useProvider(currentNetwork.rpcUrl);
  const currentSigner = useGetSigner();
  useLoadSigners(provider);
  useLoadTokens();
  useLoadPools();
  useReloadSelectedBalance();
  useBindEvmAddress(currentSigner, provider);

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

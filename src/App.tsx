import React, { useEffect, useState } from 'react';
import { hooks, Components } from '@reef-defi/react-lib';
import { ethers } from 'ethers';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';
import { useLoadSigners } from './hooks/useLoadSigners';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadPools } from './hooks/useLoadPools';
import { currentNetwork } from './environment';
import { useReloadSelectedBalance } from './hooks/useReloadSelectedBalance';
import { useGetSigner } from './hooks/useGetSigner';

const { useProvider } = hooks;
const { Modal } = Components;
const {
  OpenModalButton, ModalFooter, ModalBody,
} = Modal;

const App = (): JSX.Element => {
  const [provider, isProviderLoading, providerError] = useProvider(currentNetwork.rpcUrl);
  useLoadSigners(provider);
  useLoadTokens();
  useLoadPools();
  useReloadSelectedBalance();
  const currentSigner = useGetSigner();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    async function bindEvmAddress(): Promise<void> {
      if (currentSigner && !currentSigner?.isEvmClaimed) {
        // eslint-disable-next-line no-restricted-globals
        const isCustom = confirm('Use your Ethereum address?');
        if (!isCustom) {
          currentSigner.signer.claimDefaultAccount();
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { ethereum } = window;
          if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            if (!accounts) {
              alert('Metamask connection refused');
              return;
            }
            const ethereumProvider = new ethers.providers.Web3Provider(ethereum);
            const ethereumSigner = ethereumProvider.getSigner(0);
            if (ethereumSigner) {
              const ethereumAddress = await ethereumSigner.getAddress();
              const signature = await ethereumSigner.signMessage(ethereumAddress);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              await currentSigner.signer.claimEvmAccount(ethereumAddress, signature);
            }
          } else {
            alert('You must install Metamask plugin');
          }
        }
      }
    }

    bindEvmAddress();
  }, [currentSigner]);

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

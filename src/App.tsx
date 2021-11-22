import React, { useEffect, useState } from 'react';
import { Components, hooks } from '@reef-defi/react-lib';
import { useGetSigner } from './hooks/useGetSigner';
import { useReloadSelectedBalance } from './hooks/useReloadSelectedBalance';
import { currentNetwork } from './environment';
import { useLoadPools } from './hooks/useLoadPools';
import { useLoadTokens } from './hooks/useLoadTokens';
import { useLoadSigners } from './hooks/useLoadSigners';
import ContentRouter from './pages/ContentRouter';
import Nav from './common/Nav';
import { claimEvmAccount, getMetamaskSigner } from './utils/evmBind';

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
      if (!provider) {
        return Promise.resolve();
      }
      if (currentSigner && !currentSigner?.isEvmClaimed) {
        // eslint-disable-next-line no-restricted-globals
        const isCustom = confirm('Use your Ethereum address?');
        if (!isCustom) {
          try {
            await currentSigner.signer.claimDefaultAccount();
          } catch (err: any) {
            if (err.startsWith('1010')) {
              alert('Add few Reef coins to this account\nto enable Ethereum functionality.');
            } else {
              alert(`Transaction failed, err= ${err.toString()}`);
            }
          }
        } else {
          return claimEvmAccount(currentSigner, provider);
        }
      }
      return Promise.resolve();
    }

    console.log('EEEE=', currentSigner, provider);
    bindEvmAddress();
  }, [currentSigner, provider]);

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

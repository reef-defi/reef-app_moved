import { appState, Components, hooks } from '@reef-defi/react-lib';
import React, { useContext } from 'react';
import TokenContext from '../context/TokenContext';
import { notify } from '../utils/utils';
import './overlay-swap.css';

const { Send, OverlayAction } = Components;

export interface OverlaySend {
  tokenAddress?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const OverlaySend = ({
  tokenAddress,
  isOpen,
  onClose,
}: OverlaySend): JSX.Element => {
  const { tokens } = useContext(TokenContext);

  const signer = hooks.useObservableState(appState.selectedSigner$);
  const accounts = hooks.useObservableState(appState.accountsSubj);
  const provider = hooks.useObservableState(appState.currentProvider$);

  return (
    <OverlayAction
      isOpen={isOpen}
      title="Send"
      onClose={onClose}
      className="overlay-swap"
    >
      <div className="uik-pool-actions pool-actions">
        { provider && signer
          && (
          <Send
            accounts={accounts || []}
            notify={notify}
            provider={provider}
            signer={signer}
            tokens={tokens}
            tokenAddress={tokenAddress}
          />
          )}
      </div>
    </OverlayAction>
  );
};

export default OverlaySend;

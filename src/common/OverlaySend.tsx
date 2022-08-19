import { appState, Components, hooks } from '@reef-defi/react-lib';
import React, { useContext } from 'react';
import TokenContext from '../context/TokenContext';
import { notify } from '../utils/utils';

const { Send, OverlayAction } = Components;

export interface OverlaySend {
  isOpen: boolean;
  onClose?: () => void;
}

const OverlaySend = ({
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
    >
      { provider && signer
        && (
        <Send
          accounts={accounts || []}
          notify={notify}
          provider={provider}
          signer={signer}
          tokens={tokens}
        />
        )}
    </OverlayAction>
  );
};

export default OverlaySend;

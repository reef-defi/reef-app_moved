import React, { useMemo, useState, useEffect } from 'react';
import { appState, hooks, ReefSigner } from '@reef-defi/react-lib';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Uik from '@reef-defi/ui-kit';
import './bind.css';

const Bind = (): JSX.Element => {
  const selectedSigner: ReefSigner|undefined | null = hooks.useObservableState(appState.selectedSigner$);

  const isBound = useMemo(() => !selectedSigner || selectedSigner?.isEvmClaimed, [selectedSigner]);

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isBound) setOpen(true);
  }, [isBound]);

  if (isBound) return <div />;

  return (
    <div className="evm-bind">
      <Uik.Modal
        title="Register Ethereum VM Address"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        ...
      </Uik.Modal>

      {
        !isOpen
        && (
        <Uik.Tooltip
          className="evm-bind__btn-wrapper"
          text="Bind EVM Address"
          position="left"
          delay={0}
        >
          <button
            title="Bind EVM Address"
            className={`
              evm-bind__open-popup-btn
              ${isOpen ? 'evm-bind__open-popup-btn--open' : ''}
            `}
            type="button"
            onClick={() => setOpen(true)}
          >
            <Uik.Icon icon={faLink} />
          </button>
        </Uik.Tooltip>
        )
      }
    </div>
  );
};

export default Bind;

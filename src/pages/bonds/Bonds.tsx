import React from 'react';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from './BondsComponent';
import { bonds, IBond } from './utils/bonds';
import './bonds.css';

export const Bonds = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined | null = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.currentNetwork$);

  return (
    <div className="bonds-page">
      {network && selectedSigner ? (
        bonds
          .filter((bond) => bond.network === network.name)
          .map((bond: IBond) => (
            <BondsComponent
              key={bond.id}
              account={selectedSigner}
              bond={bond}
            />
          ))

      ) : <div />}
    </div>
  );
};

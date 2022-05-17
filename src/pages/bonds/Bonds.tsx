import React from 'react';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from './BondsComponent';
import { bonds, IBond } from './utils/bonds';

export const Bonds = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.currentNetwork$);

  return (
    <>
      {network && selectedSigner ? (
        bonds.map((bond: IBond) => (
          <BondsComponent
            key={bond.id}
            account={selectedSigner}
            bond={bond}
          />
        ))

      ) : <div />}
    </>
  );
};

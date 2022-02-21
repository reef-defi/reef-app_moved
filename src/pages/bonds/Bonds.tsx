import React from 'react';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from './BondsComponent';
import { bonds, IBond } from '../bonds/utils/bonds';

export const Bonds = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);

  return (
    <>
      {network && selectedSigner ? (
        bonds.map((bond: IBond) =>
          <BondsComponent
            key={bond.id}
            account={selectedSigner}
            network={{ ...network }}
            bond={bond}
          />)

      ) : <div/>}
    </>
  );
};

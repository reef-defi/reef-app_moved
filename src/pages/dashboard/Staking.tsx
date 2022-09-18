import React from 'react';
import './Staking.css';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from '../bonds/BondsComponent';
import { bonds, IBond } from '../bonds/utils/bonds';

export const Staking = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined | null = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.currentNetwork$);

  return (
    <div className="staking">
      {
        bonds?.filter((bond) => bond.network === network?.name).length
          ? (
            <div className="col-12 staking__bonds">
              <>
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
              </>
            </div>
          )
          : <div>No bonds available.</div>
      }
    </div>
  );
};

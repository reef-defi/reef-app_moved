import React from 'react';
import './Staking.css';
import {
  appState, hooks, Network, ReefSigner,
} from '@reef-defi/react-lib';
import { BondsComponent } from './../bonds/BondsComponent';
import { bonds, IBond } from './../bonds/utils/bonds';

export const Staking = (): JSX.Element => {
  const selectedSigner: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
  const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);

  return (
    <div className="staking row">
      <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Staking</h5>
        </div>
      </div>

      {
        bonds?.length ?
        <div className="col-12 staking__bonds">
          <>
            {network && selectedSigner ? (
              bonds.map((bond: IBond) =>
                <BondsComponent
                  key={bond.id}
                  account={selectedSigner}
                  bond={bond}
                />)
            ) : <div/>}
          </>
        </div> :
        <div>No bonds available.</div>
      }
    </div>
  );
};




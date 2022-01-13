import React from 'react';
import { CreatorComponent } from './CreatorComponent';
import { useObservableState } from '../../hooks/useObservableState';
import { selectedSigner$ } from '../../state/appState';

export const Creator = (): JSX.Element => {
  const selectedSigner = useObservableState(selectedSigner$);

  return (
    <CreatorComponent signer={selectedSigner} />
  );
};

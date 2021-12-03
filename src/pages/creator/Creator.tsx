import React from 'react';
import { CreatorComponent } from './CreatorComponent';
import { useGetSigner } from '../../hooks/useGetSigner';

export const Creator = (): JSX.Element => {
  const selectedSigner = useGetSigner();

  return (
    <CreatorComponent signer={selectedSigner} />
  );
};

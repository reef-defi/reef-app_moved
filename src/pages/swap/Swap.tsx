import React from 'react';

import { availableNetworks, Components } from '@reef-defi/react-lib';
import { reloadTokensAvailable } from '../../store/actions/tokens';
import { useAppDispatch, useAppSelector } from '../../store';

const { SwapComponent } = Components;

// eslint-disable-next-line
const none = (): void => {};

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { approvedTokens } = useAppSelector((state) => state.tokens);

  const reloadToggle = (): void => {
    dispatch(reloadTokensAvailable());
  };

  return (
    <SwapComponent
      tokens={approvedTokens}
      reloadTokens={reloadToggle}
      network={{ ...availableNetworks.mainnet }}
      notify={none}
    />
  );
};

export default Swap;

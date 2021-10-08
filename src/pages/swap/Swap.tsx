import React from 'react';

import { availableNetworks, Components } from '@reef-defi/react-lib';
import { reloadTokens } from '../../store/actions/tokens';
import { useAppDispatch, useAppSelector } from '../../store';

const { SwapComponent } = Components;

const none = (): void => {};

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const reloadToggle = () => dispatch(reloadTokens())  
  const {tokens} = useAppSelector((state) => state.tokens);

  return (
    <SwapComponent
      tokens={tokens}
      reloadTokens={reloadToggle}
      network={{ ...availableNetworks.mainnet }}
      notify={none}
    />
  );
}

export default Swap;

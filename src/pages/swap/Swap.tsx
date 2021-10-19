import React from 'react';

import { availableNetworks, Components } from '@reef-defi/react-lib';
import { reloadTokens } from '../../store/actions/tokens';
import { useAppDispatch, useAppSelector } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { notify } from '../../utils/utils';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.tokens);

  const selectedAccount = useGetSigner();

  const reloadToggle = (): void => {
    dispatch(reloadTokens());
  };

  return (
    <SwapComponent
      tokens={tokens}
      account={selectedAccount}
      reloadTokens={reloadToggle}
      network={{ ...availableNetworks.mainnet }}
      notify={notify}
    />
  );
};

export default Swap;

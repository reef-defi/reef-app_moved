import React from 'react';

import { Components } from '@reef-defi/react-lib';
import { reloadTokens } from '../../store/actions/tokens';
import { useAppDispatch } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { notify } from '../../utils/utils';
import { currentNetwork } from '../../environment';
import { useAvailableTokens } from '../../hooks/useAvailableTokens';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const signer = useGetSigner();
  const tokensCombined = useAvailableTokens(signer);

  const selectedAccount = useGetSigner();

  const reloadToggle = (): void => {
    dispatch(reloadTokens());
  };

  return selectedAccount ? (
    <SwapComponent
      tokens={tokensCombined}
      account={selectedAccount}
      reloadTokens={reloadToggle}
      network={{ ...currentNetwork }}
      notify={notify}
    />
  ) : (<div />);
};

export default Swap;

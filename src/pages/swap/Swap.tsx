import React from 'react';

import { Components } from '@reef-defi/react-lib';
import { reloadTokens } from '../../store/actions/tokens';
import { useAppDispatch } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { currentNetwork } from '../../environment';
import { useAvailableTokens } from '../../hooks/useAvailableTokens';
import { onTxUpdate } from '../../utils/contract';

const { SwapComponent } = Components;

const Swap = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const signer = useGetSigner();
  const tokensCombined = useAvailableTokens(signer);

  const selectedAccount = useGetSigner();

  return selectedAccount ? (
    <SwapComponent
      tokens={tokensCombined}
      account={selectedAccount}
      network={{ ...currentNetwork }}
      onTxUpdate={(val) => onTxUpdate(dispatch, val)}
    />
  ) : (<div />);
};

export default Swap;

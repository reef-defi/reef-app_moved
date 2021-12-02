import React from 'react';

import { Components } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useGetSigner } from '../../hooks/useGetSigner';
import { POOLS_URL } from '../../urls';
import { reloadTokens } from '../../store/actions/tokens';
import { notify } from '../../utils/utils';
import { currentNetwork } from '../../environment';
import { useAvailableTokens } from '../../hooks/useAvailableTokens';

const AddLiqudity = (): JSX.Element => {
  const history = useHistory();
  const signer = useGetSigner();
  const dispatch = useAppDispatch();
  const tokensCombined = useAvailableTokens(signer);

  const back = (): void => history.push(POOLS_URL);
  const reload = (): void => {
    dispatch(reloadTokens());
  };

  return (
    <Components.AddLiquidityComponent
      tokens={tokensCombined}
      signer={signer}
      network={currentNetwork}
      back={back}
      reloadTokens={reload}
      notify={notify}
    />
  );
};

export default AddLiqudity;

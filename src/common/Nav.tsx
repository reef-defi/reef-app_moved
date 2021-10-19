import React from 'react';
import { availableNetworks, Components } from '@reef-defi/react-lib';
import './Nav.css';
import { useGetSigner } from '../hooks/useGetSigner';
import { useAppDispatch, useAppSelector } from '../store';
import { selectSigner } from '../store/actions/signers';
import { reloadTokens } from '../store/actions/tokens';
import { saveSignerLocalPointer } from '../store/localStore';

const Nav = (): JSX.Element => {
  const signer = useGetSigner();
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.signers);

  const selectAccount = (index: number): void => {
    saveSignerLocalPointer(index);
    dispatch(selectSigner(index));
    dispatch(reloadTokens());
  };

  return (
    <nav className="navigation px-3 py-2 d-flex justify-content-end">
      <Components.AccountSelector
        accounts={accounts}
        selectedSigner={signer}
        selectAccount={selectAccount}
        reefscanUrl={availableNetworks.mainnet.reefscanUrl}
      />
    </nav>
  );
};

export default Nav;

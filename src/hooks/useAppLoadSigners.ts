import { Provider } from '@reef-defi/evm-provider';
import { useEffect } from 'react';
import { ReefSigner, hooks } from '@reef-defi/react-lib';
import { useAppDispatch } from '../store';
import { selectSigner, setSigners, setSignersLoading } from '../store/actions/signers';
import { getSignerLocalPointer } from '../store/internalStore';
import { reloadTokens } from '../store/actions/tokens';

export const useAppLoadSigners = (provider?: Provider):[ReefSigner[], boolean, {code?: number, message:string}|undefined] => {
  const dispatch = useAppDispatch();
  const [signers, signersLoading, signersError] = hooks.useLoadSigners('Reef App', provider);

  useEffect(() => {
    if (signers) {
      dispatch(setSigners(signers));
      const pointer = getSignerLocalPointer();
      dispatch(selectSigner(pointer));
      dispatch(reloadTokens());
    }
  }, [signers]);

  useEffect(() => {
    dispatch(setSignersLoading(signersLoading));
  }, [signersLoading]);

  useEffect(() => {
    if (signersError) {
      // TODO make UI for displaying errors
      console.error(signersError.message);
    }
  }, [signersError]);

  return [signers, signersLoading, signersError];
};

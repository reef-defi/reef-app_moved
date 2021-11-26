import { hooks } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { currentNetwork } from '../environment';
import { setProvider, setProviderLoading } from '../store/actions/app';

export const useAppProvider = (): void => {
  const [provider, isProviderLoading, providerError] = hooks.useProvider(currentNetwork.rpcUrl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (provider) {
      dispatch(setProvider(provider));
    }
    return () => {
      provider?.api.disconnect();
    };
  }, [provider]);

  useEffect(() => {
    dispatch(setProviderLoading(isProviderLoading));
  }, [isProviderLoading]);
};

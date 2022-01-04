import { hooks } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { appState } from '../state';
import { useObservableState } from './useObservableState';

export const useInitReefState = (): void => {
  const network = useObservableState(appState.selectedNetwork$);
  const [provider, isProviderLoading] = hooks.useProvider(network?.rpcUrl);
  const [signers, signersLoading, signersError] = hooks.useLoadSigners('Reef App', provider);

  useEffect(() => {
    if (provider) {
      appState.provider$.next(provider);
    }
    return () => {
      provider?.api.disconnect();
    };
  }, [provider]);

  useEffect(() => {
    // dispatch(setProviderLoading(isProviderLoading));
  }, [isProviderLoading]);

  useEffect(() => {
    appState.accounts$.next(signers || []);
    ...
  }, [signers]);
};

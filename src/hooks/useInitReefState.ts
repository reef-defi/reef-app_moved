import { hooks, ReefSigner } from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { accountsSubj, providerSubj, selectedNetworkSubj } from '../state/appState';
import { useObservableState } from './useObservableState';

export const useInitReefState = (signers: ReefSigner[]): void => {
  const network = useObservableState(selectedNetworkSubj);
  const [provider, isProviderLoading] = hooks.useProvider(network?.rpcUrl);

  useEffect(() => {
    if (provider) {
      providerSubj.next(provider);
    }
    return () => {
      provider?.api.disconnect();
    };
  }, [provider]);

  useEffect(() => {
    // dispatch(setProviderLoading(isProviderLoading));
  }, [isProviderLoading]);

  useEffect(() => {
    accountsSubj.next(signers || []);
  }, [signers]);
};

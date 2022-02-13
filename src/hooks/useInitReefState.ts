import {
  hooks, ReefSigner, appState, Network, graphql,
} from '@reef-defi/react-lib';
import { useEffect } from 'react';
import { map } from 'rxjs';
import { useObservableState } from './useObservableState';
import { getGQLUrls } from '../environment';

export const useInitReefState = (signers: ReefSigner[], selectNetwork: Network): void => {
  const network = useObservableState(appState.selectedNetworkSubj);
  const [provider, isProviderLoading] = hooks.useProvider(network?.rpcUrl);

  useEffect(() => {
    appState.setCurrentNetwork(selectNetwork);
    const gqlUrls = getGQLUrls(selectNetwork);
    graphql.setApolloUrls(gqlUrls);
  }, [selectNetwork]);

  useEffect(() => {
    if (provider) {
      appState.providerSubj.next(provider);
    }
    return () => {
      provider?.api.disconnect();
    };
  }, [provider]);

  useEffect(() => {
    // dispatch(setProviderLoading(isProviderLoading));
  }, [isProviderLoading]);

  useEffect(() => {
    appState.accountsSubj.next(signers || []);
  }, [signers]);
};

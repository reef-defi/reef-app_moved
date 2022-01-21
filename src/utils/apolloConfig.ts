import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { map } from 'rxjs';
import { selectedNetworkSubj } from '../state/providerState';

const splitLink$ = selectedNetworkSubj.pipe(
  map((selNetwork) => {
    const httpLink = new HttpLink({
      uri: `${selNetwork.reefscanUrl}graphql`,
    });

    const wssBase = selNetwork.reefscanUrl.replace('https', 'wss');
    const wsLink = new WebSocketLink({
      options: {
        reconnect: true,
      },
      uri: `${wssBase}graphql`,
    });

    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition'
                    && definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
  }),
);

export const apolloClientInstance$ = splitLink$.pipe(
  map((splitLink) => new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([splitLink]),
  })),
);

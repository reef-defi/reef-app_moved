import { map, Observable } from 'rxjs';
import { graphql } from '@reef-defi/react-lib';
import { ApolloClient } from '@apollo/client';
import { selectedNetworkSubj } from '../state/providerState';
import { getGQLUrls } from '../environment';
/*

const splitLink$ = selectedNetworkSubj.pipe(
  map(getGQLUrls),
  map((urls:{ws:string, http:string}) => {
    const httpLink = new HttpLink({
      uri: urls.http,
    });
    const wsLink = new WebSocketLink({
      options: {
        reconnect: true,
      },
      uri: urls.ws,
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
); */
/*
const apolloUrlsSubj = new ReplaySubject<{ws:string, http:string}>(1);

const setApolloUrls = (urls:{ws:string, http:string}):void => {
  apolloUrlsSubj.next(urls);
};

const splitLink$ = apolloUrlsSubj.pipe(
  map((urls:{ws:string, http:string}) => {
    const httpLink = new HttpLink({
      uri: urls.http,
    });
    const wsLink = new WebSocketLink({
      options: {
        reconnect: true,
      },
      uri: urls.ws,
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
); */

export const apolloClientInstance$ = graphql.apolloClientInstance$ as Observable<ApolloClient<any>>;

/// ///////////

const gqlUrls$ = selectedNetworkSubj.pipe(
  map(getGQLUrls),
);
gqlUrls$.subscribe((urls) => {
  graphql.setApolloUrls(urls);
});

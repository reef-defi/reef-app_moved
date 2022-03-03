import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import '@reef-defi/react-lib/dist/index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import {ApolloClient, InMemoryCache, ApolloProvider, ApolloConsumer} from "@apollo/client"
import { innitialNetwork } from './environment';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: innitialNetwork.graphqlUrl
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <ApolloConsumer>
          { client => <App apollo={client} /> }
        </ApolloConsumer>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

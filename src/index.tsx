import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import '@reef-defi/react-lib/dist/index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { graphql } from '@reef-defi/react-lib';
import { ApolloProvider, ApolloConsumer } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { innitialNetwork } from './environment';

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: innitialNetwork.graphqlUrl
// });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

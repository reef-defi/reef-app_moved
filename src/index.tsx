import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import '@reef-defi/react-lib/dist/index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import { innitialNetwork } from './environment';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: innitialNetwork.graphqlUrl
});

// ReactDOM.render(

//   document.getElementById('root'),
// );


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

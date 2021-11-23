import React from 'react';
import ReactDOM from 'react-dom';
import '@reef-defi/react-lib/dist/index.css';
import './assets/index.css';
import { Provider as StoreProvider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import App from './App';
import { apolloClientInstance } from './apolloConfig';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider store={store}>
        <ApolloProvider client={apolloClientInstance}>
          <App />
        </ApolloProvider>
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

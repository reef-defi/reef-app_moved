import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import '@reef-defi/react-lib/dist/index.css';
import { Provider as StoreProvider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

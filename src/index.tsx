import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@reef-defi/react-lib/dist/index.css';
import { Provider as StoreProvider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { store } from './store';

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

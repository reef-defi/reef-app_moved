import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import '@reef-defi/react-lib/dist/index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();

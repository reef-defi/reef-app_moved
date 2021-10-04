import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import Nav from './common/Nav';
import { store } from './store';
import AppInitialization from './pages/AppInitialization';

const App = (): JSX.Element => (
  <Router>
    <StoreProvider store={store}>
      <div className="App d-flex w-100 h-100">
        <Sidebar />
        <div className="w-100">
          <Nav />
          <AppInitialization />
        </div>
      </div>
    </StoreProvider>
  </Router>
);

export default App;

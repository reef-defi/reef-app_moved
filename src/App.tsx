import React, { useState } from 'react';
import Sidebar from './common/Sidebar';
import Nav from './common/Nav';
import ContentRouter from './pages/ContentRouter';

const App = (): JSX.Element => {
  return (
    <div className="App d-flex w-100 h-100">
        <Sidebar />
        <div className="w-100">
          <Nav />
          <ContentRouter />
        </div>
    </div>
  );
}

export default App;

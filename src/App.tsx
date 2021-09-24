import React, { useState } from 'react';
import {Components} from "@reef-defi/react-lib";
import ContentRouter from './pages/ContentRouter';
import Footer from './common/Footer';
import Nav from './common/Nav';

const App = (): JSX.Element => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  return (
    <div className="App d-flex" >
      <Nav />
      <div className="content">
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!
        hello everybody my name is Verkas I Ljučka. Me English night firštend. Lets zpeck then!

      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Bubbles from './Bubbles';
import './css/index.css';

const NoAccount = (): JSX.Element => (
  <div className="no-extension">
    <header className="header">
      <div className="header__content">
        <div className="header__main-content">
          <h1 className="header__title">Create Your Account</h1>
        </div>
        <div className="header__sub-content">Use Reef Chain Extension to create your account and refresh the page.</div>
      </div>

      <Bubbles />
    </header>

    <main>
      <div className="images">
        <div className="images__image">
          <img src="img/6.png" alt="Reef Extenstion screenshot" />
        </div>
        <div className="images__image">
          <img src="img/7.png" alt="Reef Extenstion screenshot" />
        </div>
        <div className="images__image">
          <img src="img/8.png" alt="Reef Extenstion screenshot" />
        </div>
        <div className="images__image">
          <img src="img/9.png" alt="Reef Extenstion screenshot" />
        </div>
      </div>
    </main>
  </div>
);

export default NoAccount;

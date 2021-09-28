import React from 'react';
import { Components } from '@reef-defi/react-lib';
import './Nav.css';

const Nav = (): JSX.Element => {
  const signersExist = true;

  return (
    <nav className="navigation px-3 py-2 d-flex justify-content-end">
      {signersExist && <div>Available</div>}
    </nav>
  );
};

export default Nav;

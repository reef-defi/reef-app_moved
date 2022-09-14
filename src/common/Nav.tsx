import React, { useMemo, useContext } from 'react';
import {
  Components, appState, hooks, ReefSigner, Network,
} from '@reef-defi/react-lib';
import './Nav.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Uik from '@reef-defi/ui-kit';
import { saveSignerLocalPointer } from '../store/internalStore';
import {
  BONDS_URL,
  CREATE_ERC20_TOKEN_URL, DASHBOARD_URL, POOLS_URL,
} from '../urls';
import { appAvailableNetworks } from '../environment';
import HideBalance from '../context/HideBalance';

export interface Nav {
    display: boolean;
}

const Nav = ({ display }: Nav): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();
  const signer: ReefSigner|undefined|null = hooks.useObservableState(appState.selectedSigner$);
  const accounts: ReefSigner[]|undefined|null = hooks.useObservableState(appState.signers$);
  const network: Network|undefined = hooks.useObservableState(appState.currentNetwork$);
  const menuItems = [
    { title: 'Dashboard', url: DASHBOARD_URL },
    { title: 'Pools', url: POOLS_URL },
    { title: 'Bonds', url: BONDS_URL },
    { title: 'Creator', url: CREATE_ERC20_TOKEN_URL },
  ];

  const hideBalance = useContext(HideBalance);

  const selectAccount = (index: number): void => {
    saveSignerLocalPointer(index);
    appState.setCurrentAddress(index != null ? accounts?.[index].address : undefined);
  };

  const selectNetwork = (key: 'mainnet' | 'testnet'): void => {
    document.body.style.overflow = '';
    const toSelect = appAvailableNetworks.find((item) => item.name === key);
    if (toSelect) {
      appState.setCurrentNetwork(toSelect);
    }
  };

  const menuItemsView = menuItems
    .map((item) => {
      let classes = 'navigation_menu-items_menu-item';
      if (pathname === item.url) {
        classes += ' navigation_menu-items_menu-item--active';
      }
      return (
        <li key={item.title} className={classes}>
          <Link to={item.url} className="navigation_menu-items_menu-item_link">
            {item.title}
          </Link>
        </li>
      );
    });

  const selectedNetwork = useMemo(() => {
    const name = network?.name;

    if (name === 'mainnet' || name === 'testnet') {
      return name;
    }

    return undefined;
  }, [network]);

  return (
    <div className="nav-content navigation d-flex d-flex-space-between">
      <div className="navigation__wrapper">
        <button type="button" className="logo-btn" onClick={() => { history.push('/'); }}>
          <Uik.ReefLogo className="navigation__logo" />
        </button>

        {display && (
          <nav className="d-flex justify-content-end d-flex-vert-center">
            <ul className="navigation_menu-items ">
              {menuItemsView}
            </ul>
            {accounts && !!accounts.length && network && (

            <Components.AccountSelector
              accounts={accounts}
              selectedSigner={signer || undefined}
              selectAccount={selectAccount}
              onNetworkSelect={selectNetwork}
              selectedNetwork={selectedNetwork}
              isBalanceHidden={hideBalance.isHidden}
              showBalance={hideBalance.toggle}
            />
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Nav;

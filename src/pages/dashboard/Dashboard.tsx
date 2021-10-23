import React from 'react';
import { useHistory } from 'react-router-dom';
import { Token, utils, Components } from '@reef-defi/react-lib';
import { getTokenEthAddressListPrices } from '@reef-defi/react-lib/dist/api/prices';
import { useAppSelector } from '../../store';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { TokenBalancePills } from './TokenBalancesPills';

const { convert2Normal } = utils;

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { isLoading } = useAppSelector((state) => state.tokens);
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const selectedSigner = selectedAccount > -1 && accounts.length > 0 ? accounts[selectedAccount].signer : undefined;
  const signerTokens = useLoadSignerTokens(selectedSigner);
  console.log('TTT', signerTokens);

  return (
    <div className="">
      <div className="mb-4 row">
        <div className="dashboard_balance col-12 col-md-6">
          <div>
            <h5 className="text-semi-bold">Balance</h5>
          </div>
          <div>
            <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">$1423</span>
          </div>
        </div>
        <div className="dashboard_actions col-12 col-md-6 d-flex d-flex-end d-flex-vert-center">
          <div className="mr-1">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-swap radius-border ">Swap</button>
          </div>
          <div className="mr-1">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-send radius-border">Send</button>
          </div>
          <div className="">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-buy radius-border">Buy</button>
          </div>
        </div>
      </div>
      <div className="mb-4 d-flex d-flex-space-between d-flex-vert-base">
        <div>
          <h5 className="my-auto title-color text-semi-bold">Tokens</h5>
        </div>
        <div>
          <button type="button" className="dashboard_refresh-btn button-light radius-border text-color-dark-accent text-regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" /></svg>
            Refresh
          </button>
        </div>
      </div>

      { isLoading && (
      <div className="mt-5">
        {/* <Components.Loading /> */}
        LOADING
      </div>
      )}
      {!isLoading && <TokenBalancePills tokens={signerTokens} />}
    </div>
  );
};

export default Dashboard;

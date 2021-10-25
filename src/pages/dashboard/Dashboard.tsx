import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { utils } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';
import { useLoadSignerTokens } from '../../hooks/useLoadSignerTokens';
import { TokenBalancePills } from './TokenBalancesPills';
import { TokenWithPrice, useSignerTokenBalances } from '../../hooks/useSignerTokenBalances';

const { convert2Normal } = utils;

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { isLoading: tokensLoading } = useAppSelector((state) => state.tokens);
  const { pools } = useAppSelector((state) => state.pools);
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const selectedSigner = selectedAccount > -1 && accounts.length > 0 ? accounts[selectedAccount].signer : undefined;
  const signerTokens = useLoadSignerTokens(selectedSigner);
  const reefPrice = 0.031;
  const signerTokenBalances: TokenWithPrice[] = useSignerTokenBalances(signerTokens, pools, reefPrice);

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
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-swap radius-border" onClick={() => { history.push('/swap'); }}>
              <svg className="fill-white" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" /></svg>
              <br />
              <span className="dashboard_actions_button_text">Swap</span>
            </button>
          </div>
          <div className="mr-1">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-send radius-border">
              <span className="dashboard_actions_button_text">Send</span>
            </button>
          </div>
          <div className="">
            <button type="button" className="button-light dashboard_actions_button dashboard_actions_button-buy radius-border">
              <span className="dashboard_actions_button_text">Buy</span>
            </button>
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

      { tokensLoading && (
      <div className="mt-5">
        {/* <Components.Loading /> */}
        LOADING
      </div>
      )}
      {!tokensLoading && <TokenBalancePills tokens={signerTokenBalances} />}
    </div>
  );
};

export default Dashboard;

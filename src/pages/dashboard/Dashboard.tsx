import React from 'react';
import { useHistory } from 'react-router-dom';
import { hooks, Token, utils } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';

const { convert2Normal } = utils;
const { useLoadSignerTokens } = hooks;

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { selectedAccount, accounts } = useAppSelector((state) => state.signers);
  const accountTokens = useLoadSignerTokens(accounts[selectedAccount].signer);
  const tokenList = accountTokens
    .map((token: Token) => (
      <li key={token.address} className="list-item mt-2">
        {token.name}
        =
        {convert2Normal(token.decimals, token.balance.toString())}
      </li>
    ));

  return (
    <div>

      <div className="d-flex flex-row justify-content-between mx-2 mb-2">
        <h5 className="my-auto">Wallet</h5>
      </div>

      {/* { isLoading && (
      <div className="mt-5">
        <LoadingWithText text="Loading assets..." />
      </div>
      )} */}
      <div className="row overflow-auto" style={{ maxHeight: 'auto' }}>
        <ul className="list-group list-group-full col-12">
          {tokenList}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

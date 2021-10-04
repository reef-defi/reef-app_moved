import React from 'react';
import { useHistory } from 'react-router-dom';
import { math, Token } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store/hooks';

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const accountTokens = useAppSelector((state) => state.accounts.tokens);
  console.log('TKNS=', accountTokens);
  const tokenList = accountTokens
    .map((token: Token) => (
      <li key={token.address} className="list-item mt-2">
        {token.name}
        =
        {math.convert2Normal(token.decimals, token.balance.toString())}
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

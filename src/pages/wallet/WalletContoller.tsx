import React from 'react';
import { useHistory } from 'react-router-dom';
import { Token, utils } from '@reef-defi/react-lib';
import { useAppSelector } from '../../store';

const { convert2Normal } = utils;

const WalletContoller = (): JSX.Element => {
  const history = useHistory();
  const accountTokens = useAppSelector((state) => state.signers.selectedAccountTokens);
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
      <div className="row overflow-auto" style={{ maxHeight: 'auto' }}>
        <ul className="list-group list-group-full col-12">
          {tokenList}
        </ul>
      </div>
    </div>
  );
};

export default WalletContoller;

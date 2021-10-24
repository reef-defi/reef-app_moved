import { Token } from '@reef-defi/react-lib';
import React, { useEffect } from 'react';
import { TokenPill } from './TokenPill';
import { useAppSelector } from '../../store';

interface TokenBalancesPills {
    tokens: Token[]
}

export const TokenBalancePills = ({ tokens }: TokenBalancesPills): JSX.Element => {
  const pools = useAppSelector((state) => state.pools);
  useEffect(() => () => {
    console.log('pp', pools);
  }, [pools]);

  return (
    <div className="row overflow-auto" style={{ maxHeight: 'auto' }}>
      {tokens.map((token: Token) => (<TokenPill token={token} key={token.address} />
      ))}
    </div>
  );
};

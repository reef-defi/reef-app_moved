import { Token } from '@reef-defi/react-lib';
import React, { useEffect } from 'react';
import { TokenPill } from './TokenPill';
import { useAppSelector } from '../../store';
import { TokenWithPrice } from '../../hooks/useSignerTokenBalances';

interface TokenBalancesPills {
    tokens: TokenWithPrice[]
}

export const TokenBalancePills = ({ tokens }: TokenBalancesPills): JSX.Element => (
  <div className="row overflow-auto" style={{ maxHeight: 'auto' }}>
    {tokens.map((token: TokenWithPrice) => (<TokenPill token={token} key={token.address} />
    ))}
  </div>
);

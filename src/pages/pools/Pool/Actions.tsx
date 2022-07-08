import Uik from '@reef-defi/ui-kit';
import './actions.css';
import React from 'react';

export interface Token {
  name: string,
  symbol: string,
  image?: string,
}

export interface PoolToken extends Token {
  available: number,
  providing?: number,
  price: number
}

export interface Data {
  firstToken: PoolToken,
  secondToken: PoolToken
}

export interface Props {
  data?: Data
}

const onProvide = (e: any): void => console.log('Provide', e);
const onWithdraw = (e: any): void => console.log('Withdraw', e);
const onTrade = (e: any): void => console.log('Trade', e);

const Actions = ({ data }: Props): JSX.Element => (
  <>
    {
      !!data
      && (
      <Uik.PoolActions
        className="pool-actions"
        data={data}
        onProvide={onProvide}
        onWithdraw={onWithdraw}
        onTrade={onTrade}
      />
      )
    }
  </>
);

export default Actions;

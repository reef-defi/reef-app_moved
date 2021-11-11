import React from 'react';
import { Components } from '@reef-defi/react-lib';
import { isValueWithStatusSet, ValueStatus, ValueWithStatus } from '../../hooks/useSignerTokenBalances';
import { toCurrencyFormat } from '../../utils/utils';

const { Loading } = Components.Loading;

interface Balance {
    balance: ValueWithStatus;
}

export const Balance = ({ balance }:Balance): JSX.Element => (
  <div className="dashboard_balance col-12 col-md-6">
    <div>
      <h5 className="text-semi-bold">Balance</h5>
    </div>
    <div>
      {isValueWithStatusSet(balance) && (
        <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">
          {toCurrencyFormat(balance as number, { maximumFractionDigits: balance < 10000 ? 2 : 0 })}
        </span>
      )}
      {!isValueWithStatusSet(balance) && balance === ValueStatus.LOADING && <Loading />}
      {!isValueWithStatusSet(balance) && balance === ValueStatus.NO_DATA && ' - '}
    </div>
  </div>
);

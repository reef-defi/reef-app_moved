import React from 'react';
import { toCurrencyFormat } from '../../utils/utils';

interface Balance {
  balance: number;
  loading: boolean;
}

export const Loading = (): JSX.Element => (
  <span className="dashboard-balance-loading dashboard_balance-txt title-font text-bold text-color-dark-accent">
    <div className="dashboard-balance-loading__container">
      <span>$</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </span>
);

export const Balance = ({ balance, loading }:Balance): JSX.Element => (
  <div className="dashboard_balance col-12 col-md-6">
    <div>
      <h5 className="text-semi-bold">Balance</h5>
    </div>
    <div>
      {!loading && (
        <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">
          {toCurrencyFormat(balance as number, { maximumFractionDigits: balance < 10000 ? 2 : 0 })}
        </span>
      )}
      {loading && <Loading />}
    </div>
  </div>
);

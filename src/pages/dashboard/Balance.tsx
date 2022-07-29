import React from 'react';
import { Components, utils } from '@reef-defi/react-lib';
import { toCurrencyFormat } from '../../utils/utils';

const { isDataSet, DataProgress } = utils;

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
      {/* {!isDataSet(balance) && balance === DataProgress.NO_DATA && (
      <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">
        {toCurrencyFormat(0, { maximumFractionDigits: 0 })}
      </span>
      )} */}
    </div>
  </div>
);

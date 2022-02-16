import React from 'react';
import { Components, utils } from '@reef-defi/react-lib';
import { toCurrencyFormat } from '../../utils/utils';

const { isDataSet, DataProgress } = utils;

const { Loading } = Components.Loading;

interface Balance {
    balance: utils.DataWithProgress<number>;
}

export const Balance = ({ balance }:Balance): JSX.Element => (
  <div className="dashboard_balance col-12 col-md-6">
    <div>
      <h5 className="text-semi-bold">Balance</h5>
    </div>
    <div>
      {isDataSet(balance) && (
        <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">
          {toCurrencyFormat(balance as number, { maximumFractionDigits: balance < 10000 ? 2 : 0 })}
        </span>
      )}
      {!isDataSet(balance) && balance === DataProgress.LOADING && <Loading />}
      {!isDataSet(balance) && balance === DataProgress.NO_DATA && (
      <span className="dashboard_balance-txt title-font text-bold text-color-dark-accent">
        {toCurrencyFormat(0, { maximumFractionDigits: 0 })}
      </span>
      )}
    </div>
  </div>
);

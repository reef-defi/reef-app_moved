import Uik from '@reef-defi/ui-kit';
import React, { useContext, useMemo } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toCurrencyFormat } from '../../utils/utils';
import HideBalance from '../../context/HideBalance';
import { displayBalance } from '../../utils/displayBalance';

interface Balance {
  balance: number;
  loading: boolean;
  className?: string;
}

export const Loading = (): JSX.Element => (
  <span className="dashboard__balance-loading">
    <div className="dashboard__balance-loading__container">
      <span>$</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </span>
);

export const Balance = ({
  balance,
  loading,
  className,
}: Balance): JSX.Element => {
  const { isHidden, toggle } = useContext(HideBalance);

  const getBalance = useMemo((): string => {
    if (balance >= 1000000) {
      return `$${displayBalance(balance)}`;
    }

    return toCurrencyFormat(balance as number, { maximumFractionDigits: balance < 10000 ? 2 : 0 });
  }, [balance]);

  const toggleHidden = (): void => {
    if (isHidden) toggle();
  };

  return (
    <div className={`
      dashboard__balance
      ${className || ''}
    `}
    >
      <div className="dashboard__balance-label">
        <Uik.Text type="lead">Balance</Uik.Text>
        <button
          key={String(isHidden)}
          type="button"
          className={`
              dashboard__balance-hide-btn
              ${isHidden ? 'dashboard__balance-hide-btn--hidden' : ''}
            `}
          onClick={toggle}
        >
          <Uik.Icon icon={isHidden ? faEyeSlash : faEye} />
        </button>
      </div>
      {
        loading ? <Loading />
          : (
            <button
              type="button"
              className={`
                dashboard__balance-value
                ${isHidden ? 'dashboard__balance-value--hidden' : ''}
              `}
              onClick={toggleHidden}
            >
              {
                isHidden
                  ? (
                    <>
                      $
                      <div />
                      <div />
                      <div />
                      <div />
                      <div />
                    </>
                  )
                  : getBalance
              }
            </button>
          )
      }
    </div>
  );
};

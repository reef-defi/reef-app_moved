import Uik from '@reef-defi/ui-kit';
import React, { useContext, useMemo } from 'react';
import { toCurrencyFormat } from '../../utils/utils';
import HideBalance from '../../context/HideBalance';
import { displayBalance } from '../../utils/displayBalance';

interface Rewards {
  rewards?: number | string;
  className?: string;
}

export const Rewards = ({
  rewards = 0,
  className,
}: Rewards): JSX.Element => {
  const { isHidden, toggle } = useContext(HideBalance);

  const getRewards = useMemo((): string => {
    if (rewards >= 1000000) {
      return `$${displayBalance(rewards)}`;
    }

    return toCurrencyFormat(rewards as number, { maximumFractionDigits: rewards < 10000 ? 2 : 0 });
  }, [rewards]);

  const toggleHidden = (): void => {
    if (isHidden) toggle();
  };

  return (
    <div className={`
      dashboard__balance
      dashboard__rewards
      ${className || ''}
    `}
    >
      <div className="dashboard__balance-label">
        <Uik.Text type="mini">Rewards</Uik.Text>
      </div>
      <button
        type="button"
        className={`
            dashboard__balance-value
            dashboard__rewards-value
            ${!rewards ? 'dashboard__rewards-value--empty' : ''}
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
              : getRewards
          }
      </button>
    </div>
  );
};

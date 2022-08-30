import Uik from '@reef-defi/ui-kit';
import React, { useContext, useMemo } from 'react';
import HideBalance from '../../context/HideBalance';

interface Rewards {
  rewards?: number | string;
  className?: string;
}

export const Rewards = ({
  rewards,
  className,
}: Rewards): JSX.Element => {
  const { isHidden, toggle } = useContext(HideBalance);

  const getRewards = useMemo((): string => {
    if (!rewards) return '$0.00';

    return `$${Uik.utils.formatAmount(Uik.utils.maxDecimals(rewards, 2).toFixed(2))}`;
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

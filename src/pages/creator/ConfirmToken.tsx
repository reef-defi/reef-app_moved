import React from 'react';
import './confirm-token.css';
import Uik from '@reef-defi/ui-kit';

export interface SummaryItemProps {
  label?: string
  value?: string | number
  action?: (...args: any[]) => any
  className?: string
}

export const SummaryItem = ({
  label,
  value,
  action,
  className,
}: SummaryItemProps): JSX.Element => (
  <div
    className={`
      confirm-token-summary-item
      ${className || ''}
    `}
  >
    <div className="confirm-token-summary-item-label">{ label }</div>
    {
      action
        ? (
          <button
            type="button"
            className="confirm-token-summary-item-value"
            onClick={action}
          >
            { value }

          </button>
        )
        : <div className="confirm-token-summary-item-value">{ value }</div>
    }
  </div>
);

export interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  name?: string
  symbol?: string
  supply?: string
  icon?: string
  isBurnable?: boolean
  isMintable?: boolean
}

const openIcon = (src?: string, name?: string): void => {
  if (!src) return;

  const image = new Image();
  image.src = src;

  const tab = window.open('');
  if (tab) {
    tab.document.write(image.outerHTML);
    tab.document.title = `${name} Logo`;
  }
};

const ConfirmToken = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  symbol,
  icon,
  supply,
  isBurnable,
  isMintable,
}: Props): JSX.Element => (
  <Uik.Modal
    className="confirm-token"
    title="Confirm Your Token"
    isOpen={isOpen}
    onClose={onClose}
    footer={(
      <Uik.Button
        text="Create Token"
        fill
        size="large"
        onClick={() => {
          if (onConfirm) onConfirm();
          if (onClose) onClose();
        }}
      />
  )}
  >
    <div className="confirm-token__container">
      <div className="confirm-token-summary">
        <SummaryItem
          label="Token name"
          value={name}
        />
        <SummaryItem
          label="Token symbol"
          value={(symbol || '').toUpperCase()}
        />
        <SummaryItem
          label="Initial supply"
          value={Uik.utils.formatAmount(supply || '')}
        />
        <SummaryItem
          label="Burnable"
          value={isBurnable ? 'Yes' : 'No'}
        />
        <SummaryItem
          label="Mintable"
          value={isMintable ? 'Yes' : 'No'}
        />
        <SummaryItem
          label="Token logo"
          value={icon ? 'Custom' : 'Generated'}
          action={icon ? () => openIcon(icon, name) : undefined}
          className={!icon ? 'confirm-token-summary-item--faded' : ''}
        />
      </div>
    </div>
  </Uik.Modal>
);

export default ConfirmToken;

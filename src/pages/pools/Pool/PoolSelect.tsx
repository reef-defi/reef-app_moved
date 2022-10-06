import React, { useContext } from 'react';
import { Components } from '@reef-defi/react-lib';
import PoolsList from '../PoolsList';
import './pool-select.css';
import TokenContext from '../../../context/TokenContext';

const { OverlayAction } = Components;

export interface Props {
  isOpen: boolean,
  onClose: () => void
}

const PoolSelect = ({ isOpen, onClose }: Props): JSX.Element => {
  const { tokens } = useContext(TokenContext);

  return (
    <OverlayAction
      title="Select Pool"
      className="pool-select"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PoolsList tokens={tokens} />
    </OverlayAction>
  );
};

export default PoolSelect;

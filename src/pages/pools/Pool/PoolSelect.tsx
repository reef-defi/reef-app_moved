import React from 'react';
import { Components } from '@reef-defi/react-lib';
import PoolsList from '../PoolsList';
import './pool-select.css';

const { OverlayAction } = Components;

export interface Props {
  isOpen: boolean,
  onClose: () => void
}

const PoolSelect = ({ isOpen, onClose }: Props): JSX.Element => (
  <OverlayAction
    title="Select Pool"
    className="pool-select"
    isOpen={isOpen}
    onClose={onClose}
  >
    <PoolsList />
  </OverlayAction>
);

export default PoolSelect;

import React from 'react';
import OverlayAction from './OverlayAction';

export interface Props {
  isOpen: boolean,
  onClose?: () => any
}

const Swap = ({
  isOpen,
  onClose,
}: Props): JSX.Element => (
  <OverlayAction
    isOpen={isOpen}
    title="Swap"
    onClose={onClose}
  >
    { '<Swap component>' }
  </OverlayAction>
);

export default Swap;

import React from 'react';
import OverlayAction from './OverlayAction';

export interface Props {
  isOpen: boolean,
  onClose?: () => any
}

const Send = ({
  isOpen,
  onClose,
}: Props): JSX.Element => (
  <OverlayAction
    isOpen={isOpen}
    title="Send"
    onClose={onClose}
  >
    { '<Send component>' }
  </OverlayAction>
);

export default Send;

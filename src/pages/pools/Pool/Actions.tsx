import Uik from '@reef-defi/ui-kit';
import './actions.css';
import React from 'react';

export interface Props {
  data?: any
}

const Actions = ({ data }: Props) => (
  <div className="pool-actions">
    <Uik.Card>
      Actions component in making ...
    </Uik.Card>
  </div>
);

export default Actions;

import React from 'react';

import { availableNetworks, Components } from '@reef-defi/react-lib';

const { SwapComponent, Display } = Components;

const none = (): void => {
  const a = 1;
};

const Swap = (): JSX.Element => (
  <Display.CenterColumn>
    <div style={{ minWidth: '500px' }}>
      <SwapComponent
        tokens={[]}
        reloadTokens={none}
        network={{ ...availableNetworks.mainnet }}
        notify={none}
      />
    </div>
  </Display.CenterColumn>
);

export default Swap;

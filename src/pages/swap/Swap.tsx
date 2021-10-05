import React from 'react';

import {availableNetworks, Components} from '@reef-defi/react-lib';

const {SwapComponent, Display} = Components;

const Swap = (): JSX.Element => {

  return (
    <Display.CenterColumn>
      <div style={{ minWidth: "500px" }}>
        <SwapComponent
          tokens={[]}
          reloadTokens={() => {}}
          network={{...availableNetworks.mainnet}}
          notify={(message, type) => {}}
          />
      </div>
    </Display.CenterColumn>
  )
}

export default Swap;

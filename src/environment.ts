import { availableNetworks, Network } from '@reef-defi/react-lib';

export const innitialNetwork: Network = {
  ...availableNetworks.localhost,
  genesisHash: availableNetworks.testnet.genesisHash,
};
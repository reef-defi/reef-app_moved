import { availableNetworks, Network } from '@reef-defi/react-lib';

interface ExtraNetwork extends Network {
  reefscanFrontendUrl: string; 
}

export const innitialNetwork: ExtraNetwork = {
  name: 'testnet',
  rpcUrl: 'ws://localhost:9944',
  reefscanUrl: 'http://localhost:8000',
  factoryAddress: '0xD3ba2aA7dfD7d6657D5947f3870A636c7351EfE4',
  routerAddress: '0x818Be9d50d84CF31dB5cefc7e50e60Ceb73c1eb5',
  graphqlUrl: 'ws://localhost:8080/v1/graphql',
  genesisHash: "", // TODO ?
  reefscanFrontendUrl: "http://localhost:3000",
};

import { availableNetworks, Network, appState } from '@reef-defi/react-lib';

export const currentNetwork = /* availableNetworks.testnet || */ /* availableNetworks.mainnet;  ||  */ {
  name: 'testnet',
  rpcUrl: 'ws://localhost:9944',
  reefscanUrl: 'http://localhost:8000',
  factoryAddress: '0xcA36bA38f2776184242d3652b17bA4A77842707e',
  routerAddress: '0x0A2906130B1EcBffbE1Edb63D5417002956dFd41',
} as Network;

export const getGQLUrls = (network: Network): {ws:string, http:string} => {
  const { testnet } = availableNetworks;
  const { mainnet } = availableNetworks;
  if (network.rpcUrl === testnet.rpcUrl || network.rpcUrl === mainnet.rpcUrl) {
    const wssBase = network.reefscanUrl.replace('https', 'wss');
    return { ws: `${wssBase}/graphql`, http: `${network.reefscanUrl}/graphql` };
  }
  return { ws: 'ws://localhost:8080/v1/graphql', http: 'http://localhost:8080/v1/graphql' };
};

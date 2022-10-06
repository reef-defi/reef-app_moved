export interface IBond {
  id: number;
  bondName: string;
  bondDescription: string;
  bondContractAddress: string;
  bondValidatorAddress?: string;
  stake: string;
  stakeTokenAddress: string;
  stakeTokenLogo: string;
  stakeDecimals: number;
  farm: string;
  farmTokenAddress: string;
  farmTokenLogo: string;
  farmDecimals: number;
  entryStartTime: string;
  apy: string;
  network: 'mainnet' | 'testnet';
}

export const bonds: IBond[] = [
  {
    id: 1,
    bondName: 'Reef Community Staking Bond',
    bondDescription: '',
    bondContractAddress: '0x7D3596b724cEB02f2669b902E4F1EEDeEfad3be6',
    bondValidatorAddress: '5Hax9GZjpurht2RpDr5eNLKvEApECuNxUpmRbYs5iNh7LpHa',
    stake: 'REEF',
    stakeTokenAddress: '0x0000000000000000000000000000000001000000',
    stakeTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    stakeDecimals: 0,
    farm: 'REEF',
    farmTokenAddress: '0x0000000000000000000000000000000001000000',
    farmTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    farmDecimals: 0,
    entryStartTime: '',
    apy: '32',
    network: 'mainnet',
  },
  {
    id: 2,
    bondName: 'Test Bond 1',
    bondDescription: '',
    bondContractAddress: '0xA8E81f5DA3C01426Fd3eEC8105d1541F99E4E2c4',
    bondValidatorAddress: '5G6qCzHmfKgk9W5QBidVndsbhXQ2PvfUDu1YKuizqfDP7j3y',
    stake: 'REEF',
    stakeTokenAddress: '0x0000000000000000000000000000000001000000',
    stakeTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    stakeDecimals: 0,
    farm: 'REEF',
    farmTokenAddress: '0x0000000000000000000000000000000001000000',
    farmTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    farmDecimals: 0,
    entryStartTime: '',
    apy: '32',
    network: 'testnet',
  },
  {
    id: 3,
    bondName: 'Test Bond 2',
    bondDescription: '',
    bondContractAddress: '0x4Ac657cCAA4BBC3a234a2014e7AF8d46878554EB',
    bondValidatorAddress: '5G6qCzHmfKgk9W5QBidVndsbhXQ2PvfUDu1YKuizqfDP7j3y',
    stake: 'REEF',
    stakeTokenAddress: '0x0000000000000000000000000000000001000000',
    stakeTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    stakeDecimals: 0,
    farm: 'REEF',
    farmTokenAddress: '0x0000000000000000000000000000000001000000',
    farmTokenLogo: 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
    farmDecimals: 0,
    entryStartTime: '',
    apy: '32',
    network: 'testnet',
  },
  /* {
  'id': 2,
  'bondName': 'Reef community staking bond',
  'bondDescription': '',
  'bondContractAddress': '0x6d53c4252263403554c0c89DA3890D5c2c487141',
  'stake': 'REEF',
  'stakeTokenAddress': '0x0000000000000000000000000000000001000000',
  'stakeTokenLogo': 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
  'stakeDecimals': 0,
  'farm': 'REEF',
  'farmTokenAddress': '0x0000000000000000000000000000000001000000',
  'farmTokenLogo': 'https://stake.reef.finance/assets/images/reef/reef-token.svg',
  'farmDecimals': 0,
  'entryStartTime': '',
  'apy': '32'
  }, */
];

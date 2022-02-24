export interface IBond {
  id: number;
  bondName: string;
  bondDescription: string;
  bondContractAddress: string;
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
}

export const bonds: IBond[] = [{
  'id': 1,
  'bondName': 'Reef for All',
  'bondDescription': 'An initiation',
  'bondContractAddress': '0x002424c680A04a25A5d27a9D9e35df5862ff1eda',
  // 'bondContractAddress': '0xB4537c819D7aA60029641859E6029617D5ad0c10',
  // 'bondContractAddress': '0x6b7F37fcEe320a089cdde3eB61cEc89f6A6591eD',
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
  },
];
/*

export const bond =
  {
    'id': 1,
    'bondName': 'Reef For The People',
    'bondDescription': 'For All our Reefians',
    'bondContractAddress': '0x6b7F37fcEe320a089cdde3eB61cEc89f6A6591eD',
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
  };
*/

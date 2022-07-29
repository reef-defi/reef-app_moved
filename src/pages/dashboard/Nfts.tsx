import React from 'react';
import { NFT as NFTData, TokenNFT, utils } from '@reef-defi/react-lib';
import './Nfts.css';

import NFT from './NFT';

const { isDataSet, DataProgress } = utils;

const placeholderImage = 'https://cryptotelegram.com/wp-content/uploads/2021/04/reef-crypto-explained.jpg';

export const Skeleton = (): JSX.Element => (
  <div className="nft-skeleton">
    <div className="nft-skeleton__image" />
    <div className="nft-skeleton__name" />
  </div>
);

interface Nfts {
  nfts: NFTData[];
}

export const Nfts = ({ nfts }: Nfts): JSX.Element => (
  <div className="nfts">
    {nfts.length === 0 && (
    <div className="col-12 card">
      <div className="nfts__empty-nft-list">No NFTs in your wallet.</div>
    </div>
    )}
    {nfts.length > 0 && (
      <div className="col-12">
        {!!nfts.length && (
        <div className="nfts__container">
          {nfts.map((nft) => (
            <NFT key={`${nft.address}-${nft.nftId}`} {...nft} />
          ))}
        </div>
        )}
      </div>
    )}
    {/* {nfts.length  && (
      <div className="col-12">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    ) } */}
  </div>

);

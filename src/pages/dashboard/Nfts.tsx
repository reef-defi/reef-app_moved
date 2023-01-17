import { NFT as NFTData } from '@reef-defi/react-lib';
import React from 'react';
import './Nfts.css';
import Uik from '@reef-defi/ui-kit';
import NFT from './NFT';
import SqwidButton from './SqwidButton/SqwidButton';

// const { isDataSet, DataProgress } = utils;
// const placeholderImage = 'https://cryptotelegram.com/wp-content/uploads/2021/04/reef-crypto-explained.jpg';

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
    <div className="nfts__empty">
      <Uik.Text type="light">Your wallet doesn&apos;t own any NFTs.</Uik.Text>
      <Uik.Text type="light">We&apos;re adding NFTs soon.</Uik.Text>
      <SqwidButton />
    </div>
    )}
    {nfts.length > 0 && (
      <div className="col-12">
        {!!nfts.length && (
        <div className="nfts__container">
          {nfts.map((nft) => (
            <NFT
              key={`${nft.address}-${nft.nftId}`}
              iconUrl={nft.iconUrl}
              name={nft.name}
              balance={nft.balance}
            />
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

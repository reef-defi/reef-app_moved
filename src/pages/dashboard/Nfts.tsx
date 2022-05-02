import React from 'react';
import { Components, TokenWithAmount, utils } from '@reef-defi/react-lib';
import { TokenPill } from './TokenPill';
import './Nfts.css';
import {TokenActivityItem, TokenActivityType} from "./TokenActivityItem";

import NFT from "./NFT"

const { isDataSet, DataProgress } = utils;

const placeholderImage = 'https://cryptotelegram.com/wp-content/uploads/2021/04/reef-crypto-explained.jpg';

export const Skeleton = (): JSX.Element => (
  <div className="nft-skeleton">
    <div className="nft-skeleton__image" />
    <div className="nft-skeleton__name" />
  </div>
);

interface Nfts {
    tokens: any;
}

export const Nfts = ({tokens}: Nfts): JSX.Element => {
    return (
    <div className="nfts">
    <div className="col-12">
        {!!tokens && !tokens.length && <div>No NFTs in your wallet.</div>}

        {!!tokens && !!tokens.length && (
            <div className="nfts__container">
                {tokens.map((token, i) => (
                    <NFT data={token} key={i}/>
                ))}
            </div>
        )}
        {!tokens && <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </> }
      </div>
    </div>

)};

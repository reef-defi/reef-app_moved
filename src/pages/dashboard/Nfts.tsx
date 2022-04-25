import React from 'react';
import { Components, TokenWithAmount, utils } from '@reef-defi/react-lib';
import { TokenPill } from './TokenPill';
import './Nfts.css';
import {TokenActivityItem, TokenActivityType} from "./TokenActivityItem";

const { isDataSet, DataProgress } = utils;

const placeholderImage = 'https://cryptotelegram.com/wp-content/uploads/2021/04/reef-crypto-explained.jpg';

export const Skeleton = (): JSX.Element => (
  <div className='nft-skeleton'>
    <div className='nft-skeleton__image'/>
    <div className='nft-skeleton__name'/>
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
                {tokens.map((t, i) => (
                    <div className="nfts__item" key={i}>
                        <div
                            className="nfts__item-image"
                            style={{ backgroundImage: `url(${t.iconUrl})` }}
                        />
                        <div className="nfts__item-info">
                            <div className="nfts__item-name">{t.name} <small> ({t.balance})</small></div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        {!tokens && <>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </> }







        {/* <Skeleton />
        <Skeleton />
        <Skeleton /> */}

      </div>
    </div>

)};

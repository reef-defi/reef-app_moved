import React from 'react';
import { Components, TokenWithAmount, utils } from '@reef-defi/react-lib';
import { TokenPill } from './TokenPill';
import './Nfts.css';

const { isDataSet, DataProgress } = utils;

const { Loading } = Components.Loading;

const placeholderImage = 'https://cryptotelegram.com/wp-content/uploads/2021/04/reef-crypto-explained.jpg';

export const Nfts = (): JSX.Element => (
  <div className="nfts">
    <div className="mb-4 col-12 d-flex d-flex-space-between d-flex-vert-base">
      <div>
        <h5 className="my-auto title-color text-semi-bold">NFTs</h5>
      </div>
    </div>

    <div className="col-12">
      <div className="nfts__container">

        <div className="nfts__item">
          <div
            className="nfts__item-image"
            style={{ backgroundImage: `url(${placeholderImage})` }}
          />
          <div className="nfts__item-info">
            <div className="nfts__item-name">NFT Title</div>
          </div>
        </div>

      </div>
    </div>

    <div>No NFTs in your wallet.</div>
  </div>

);

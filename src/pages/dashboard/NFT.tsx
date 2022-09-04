import React from 'react';
import {BigNumber} from "ethers";

interface NFTData {
    iconUrl: string;
    name: string;
    balance: BigNumber;
}

const NFT = ({ iconUrl, name, balance }: NFTData): JSX.Element => {
    const loading = false;
  return (
    <div className="nfts__item">
      <div
        className={`
              nfts__item-image
              ${loading ? 'nfts__item-image--loading' : ''}
          `}
        style={
            iconUrl && !loading
              ? { backgroundImage: `url(${iconUrl})` } : {}
          }
      />
      <div className="nfts__item-info">
        <div className="nfts__item-name">{name}</div>
        <div className="nfts__item-balance">{balance.toString()}</div>
      </div>
    </div>
  );
};

export default NFT;

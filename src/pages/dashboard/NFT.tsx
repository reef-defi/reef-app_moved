import React, { useState, useEffect, useMemo } from 'react';
import preloadImage from '../../utils/preloadImage';
import {ERC721ContractData, NFT as NFTData} from "@reef-defi/react-lib";

const NFT = ({ balance, iconUrl, data, type }: NFTData): JSX.Element => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const name = type === 'ERC721' ? (data as ERC721ContractData).name : '';

  useEffect(() => {
    if (iconUrl) {
      setImgLoaded(true);
      return;
    }

    preloadImage(iconUrl, () => setImgLoaded(true));

    // eslint-disable-next-line consistent-return,@typescript-eslint/no-empty-function
    return function () {};
  }, []);

  return (
    <div className="nfts__item">
      <div
        className={`
              nfts__item-image
              ${!imgLoaded ? 'nfts__item-image--loading' : ''}
          `}
        style={
            iconUrl && imgLoaded
              ? { backgroundImage: `url(${iconUrl})` } : {}
          }
      />
      <div className="nfts__item-info">
        <div className="nfts__item-name">{name}</div>
        <div className="nfts__item-balance">{balance}</div>
      </div>
    </div>
  );
};

export default NFT;

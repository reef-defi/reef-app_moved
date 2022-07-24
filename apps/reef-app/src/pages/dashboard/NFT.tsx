import React, { useState, useEffect } from 'react';
import preloadImage from '../../utils/preloadImage';

const NFT = ({ data }: any): JSX.Element => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!data?.iconUrl) {
      setImgLoaded(true);
      return;
    }

    preloadImage(data.iconUrl, () => setImgLoaded(true));

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
            data.iconUrl && imgLoaded
              ? { backgroundImage: `url(${data.iconUrl})` } : {}
          }
      />
      <div className="nfts__item-info">
        <div className="nfts__item-name">{data.name}</div>
        <div className="nfts__item-balance">{data.balance}</div>
      </div>
    </div>
  );
};

export default NFT;

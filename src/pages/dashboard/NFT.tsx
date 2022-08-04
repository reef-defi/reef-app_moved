import { NFT as NFTData, hooks, utils } from '@reef-defi/react-lib';
import React, { useState } from 'react';

interface NftComponent {
  icon: string;
  name: string;
  balance: string;
}

type UseNftState = [NftComponent, boolean];

// TODO Matjaž load name and from IPFS
// This function will only be triggered if the address is of ERC1155 contract type
const loadNft1155Data = async (address: string, balance: string): Promise<NftComponent> => {
  // Retrieve mata data from IPFS
  const name = '';

  // Extract url of image
  const icon = utils.getIconUrl(address);
  // Replace name and icon with loaded data
  return ({ name, icon, balance });
};
const useNftState = ({
  address, type, name, balance,
}: NFTData): UseNftState => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<NftComponent>({
    balance,
    name,
    icon: utils.getIconUrl(address),
  });

  hooks.useAsyncEffect(async () => {
    if (type === 'ERC1155') {
      Promise.resolve()
        .then(() => setLoading(true))
        .then(() => loadNft1155Data(address, balance))
        .then(setState)
        .catch((err) => {
          console.error('ERC1155 IPFS data went sideways');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address, type]);

  return [state, loading];
};

const NFT = (defautlData: NFTData): JSX.Element => {
  const [
    { icon, name, balance },
    loading,
  ] = useNftState(defautlData);

  return (
    <div className="nfts__item">
      <div
        className={`
              nfts__item-image
              ${loading ? 'nfts__item-image--loading' : ''}
          `}
        style={
            icon && !loading
              ? { backgroundImage: `url(${icon})` } : {}
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

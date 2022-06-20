import { useContext } from 'react';

import { appState, Components, hooks, utils } from '@reef-defi/react-lib';
import { useHistory } from 'react-router-dom';
import TokenPricesContext from '../../context/TokenPricesContext';
import { ADD_LIQUIDITY_URL, POOL_CHART_URL } from '../../urls';

const { PoolList, PoolTransactions } = Components;

const Pools = (): JSX.Element => {
  const history = useHistory();
  const network = hooks.useObservableState(appState.currentNetwork$);

  const tokenPrices = useContext(TokenPricesContext);

  // TODO Hudlajf total supply of all pools in USD
  const totalSupply = hooks.useTotalSupply(tokenPrices);
  console.log(`Total supply ${totalSupply.toString()}`);
  
  // TODO Hudlajf total volume for last 24h in USD
  const volume = hooks.usePoolVolume(tokenPrices);
  console.log(`Total volume ${volume.toString()}`);
    
  // TODO Hudlajf total supply of each pool { address -> BigNumber }
  const poolSupplies = hooks.usePoolsTotalSupply();
  console.log("Pool supplies: ", poolSupplies)

  // TODO Hudlajf total supply of some pool
  const poolSupply = hooks.usePoolTotalSupply('0xFc23bb0DaaedfbA8dC4f1A1Bc0295d2DdeBed88B');
  console.log(`Pool supply: ${poolSupply.toString()}`);
  
  // TODO Hudlajf find user pools
  const userPools = hooks.useFindUserPools('5DvcwghWVZW9BueQ1RzHYcosrKUX6tbbMPhnYGv6XdjMmubF');
  console.log('User pools: ', userPools);

  // TODO Hudlajf how to find out use pool supply
  const userPoolSupply = hooks.useQueryUserPool(
    '5DvcwghWVZW9BueQ1RzHYcosrKUX6tbbMPhnYGv6XdjMmubF',
    '0xFc23bb0DaaedfbA8dC4f1A1Bc0295d2DdeBed88B',
  )
  console.log(`User pool supply: ${userPoolSupply.toString()}`);

  const openAddLiquidity = (): void => history.push(
    ADD_LIQUIDITY_URL
      .replace(':address1', utils.REEF_ADDRESS)
      .replace(':address2', '0x'),
  );
  const openPool = (address: string): void => history.push(
    POOL_CHART_URL.replace(':address', address),
  );

  return (<>
    {network &&
    <div className="w-100 row justify-content-center">
      <div className="col-xl-10 col-lg-10 col-md-12">
        <PoolList
            openPool={openPool}
            openAddLiquidity={openAddLiquidity}
        />
        <Components.Display.MT size="4"/>
        <PoolTransactions
            reefscanFrontendUrl={network.reefscanFrontendUrl}
        />
      </div>
    </div>
    }
    </>
  );
};

export default Pools;

import React, { useEffect, useState } from 'react';

import {Components, Pool, utils} from "@reef-defi/react-lib"
import { useAppSelector } from '../../store';

interface DefaultState {
  pool: Pool;
}

interface State extends DefaultState {
  toggle: () => void;
}

const DefaultState = ({pool}: DefaultState): JSX.Element => (
  <Components.Display.FlexRow>
  <Components.Icons.TokenIcon src={pool.token1.iconUrl} />
  <Components.Icons.TokenIcon src={pool.token2.iconUrl} />
  <Components.Display.CenterRow>
    <Components.Display.MS size="2">
      <Components.Text.Text>
        {pool.token1.name}/{pool.token2.name}
      </Components.Text.Text>
    </Components.Display.MS>
  </Components.Display.CenterRow>
</Components.Display.FlexRow>
);

const CloseState = ({pool, toggle}: State): JSX.Element => (
  <>
    <DefaultState pool={pool} />
    <Components.Display.FlexColumn>
      <Components.Text.MiniText>
        <Components.Text.MutedText>Liquidity:</Components.Text.MutedText>
      </Components.Text.MiniText>
      <Components.Text.Text>{utils.convert2Normal(pool.decimals, pool.minimumLiquidity).toFixed(4)}</Components.Text.Text>
    </Components.Display.FlexColumn>
    <Components.Display.FlexColumn>
      <Components.Text.MiniText>
        <Components.Text.MutedText>Supply:</Components.Text.MutedText>
      </Components.Text.MiniText>
      <Components.Text.Text>{utils.convert2Normal(pool.decimals, pool.totalSupply).toFixed(4)}</Components.Text.Text>
    </Components.Display.FlexColumn>
    <Components.Button.EmptyButton onClick={toggle}>
      <Components.Icons.DownIcon />
    </Components.Button.EmptyButton>
  </>
);

const OpenState = ({pool, toggle}: State): JSX.Element => {

  return (
    <Components.Display.FullColumn>
      <Components.Display.ContentBetween>
        <DefaultState pool={pool} />
        <Components.Button.EmptyButton onClick={toggle}>
          <Components.Icons.UpIcon />
        </Components.Button.EmptyButton>
      </Components.Display.ContentBetween>
      <Components.Display.ContentBetween>
        <div className="w-50 me-1 p-3 border border-1 border-rad">Basic Chart WIP...</div>
        <div className="w-50 ms-1">
          <Components.Card.SubCard>
            <Components.Label.ConfirmLabel 
              title="Supply: "
              value={utils.convert2Normal(pool.decimals, pool.totalSupply).toFixed(4)}
            />
            <Components.Label.ConfirmLabel 
              title="Liquidity: "
              value={utils.convert2Normal(pool.decimals, pool.minimumLiquidity).toFixed(4)}
            />
            <Components.Label.ConfirmLabel 
              title="Locked 1: "
              value={utils.toBalance(pool.token1).toFixed(4)}
            />
            <Components.Label.ConfirmLabel 
              title="Locked 2: "
              value={utils.toBalance(pool.token2).toFixed(4)}
            />
            <Components.Label.ConfirmLabel 
              title="Your share: "
              value={`${utils.calculatePoolShare(pool).toFixed(4)} %`}
            />
          </Components.Card.SubCard>
        </div>
      </Components.Display.ContentBetween>
      <Components.Display.MT size="2" />
      <Components.Display.ContentEnd>
        <Components.Button.Button>Open pool</Components.Button.Button>
      </Components.Display.ContentEnd>
    </Components.Display.FullColumn>
  )
}

const Pools = (): JSX.Element => {
  const {isLoading, pools} = useAppSelector((state) => state.pools);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);

  const closeAll = () => {
    setIsOpen(pools.map(() => false))
  };
  const open = (index: number) => {
    closeAll();
    setIsOpen([
      ...isOpen.slice(0, index),
      true,
      ...isOpen.slice(index+1, isOpen.length)
    ]);
  };
  useEffect(() => {
    closeAll();
  }, [pools]);
  

  const poolsView = pools
    .map((pool, index) => (
      <Components.List.ListItem key={pool.poolAddress}>
        {isOpen[index] 
          ? <OpenState
            pool={pool}
            toggle={closeAll}
          />
          : <CloseState 
            pool={pool}
            toggle={() => open(index)}
          />
        }
      </Components.List.ListItem>
    ));

  return (
    <Components.Display.CenterColumn>
      <Components.Display.MinWidth size={500}>
        <Components.Card.Card>
          <Components.Card.CardHeader>
            <Components.Card.CardTitle title="Pools" />
            <Components.Display.FlexRow>
              <Components.Button.Button>Remove supply</Components.Button.Button>
              <Components.Display.MS size="1" />
              <Components.Button.Button>Add supply</Components.Button.Button>
            </Components.Display.FlexRow>
          </Components.Card.CardHeader>
          <Components.Display.MT size="3">
            {/* .default is kind of lame to write.... */}
            <Components.List.default> 
              <Components.List.ListEmptyItem />
              {isLoading ? <Components.Loading.Loading /> : poolsView}
              <Components.List.ListEmptyItem />
            </Components.List.default>
          </Components.Display.MT>
        </Components.Card.Card>
      </Components.Display.MinWidth>
    </Components.Display.CenterColumn>
  )
};

export default Pools;

import './stats.css';
import Uik from '@reef-defi/ui-kit';
import React from 'react';
import { hooks } from '@reef-defi/react-lib';

interface StatsProps {
  data: hooks.PoolStats;
}
interface TokenStatsProps {
  token: hooks.TokenStats;
}

const Token = ({token}: TokenStatsProps) => (
  <div className="pool-stats__token">
    <div className="pool-stats__token-info">
      <div className="pool-stats__token-main">
        <img
          src={token.icon}
          alt={token.symbol}
          className={`
              pool-stats__token-image
              pool-stats__token-image--${Uik.utils.slug(token.symbol)}
            `}
        />

        <div>
          <div className="pool-stats__token-name">{ token.symbol }</div>
          <div className="pool-stats__token-percentage">
            { token.percentage }
            %
          </div>
        </div>
      </div>

      <div className="pool-stats__token-value-ratio">
        1
        {' '}
        {token.symbol}
        {' '}
        =
        {' '}
        {token.ratio.amount}
        {' '}
        {token.ratio.symbol}
      </div>
    </div>

    <div className="pool-stats__token-stats">
      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">Amount Locked</div>
        <div className="pool-stats__token-stat-value">{ Uik.utils.formatHumanAmount(token.amountLocked) }</div>
      </div>

      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">My Liquidity</div>
        <div className="pool-stats__token-stat-value">{ token.mySupply }</div>
      </div>

      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">Fees 24h</div>
        <div className="pool-stats__token-stat-value">{ token.fees24h }</div>
      </div>
    </div>
  </div>
);

const Stats = ({ data }: StatsProps) => (
  <div className="pool-stats">
    <div className="pool-stats__wrapper">
      <div className="pool-stats__main">
        <Uik.Container flow="spaceBetween">
          <button
            className="pool-stats__pool-select"
            type="button"
          >
            <div className="pool-stats__pool-select-pair">
              <img
                src={data.firstToken.icon}
                alt={data.firstToken.symbol}
                className={`pool-stats__pool-select-pair--${Uik.utils.slug(data.firstToken.symbol)}`}
              />
              <img
                src={data.secondToken.icon}
                alt={data.firstToken.symbol}
                className={`pool-stats__pool-select-pair--${Uik.utils.slug(data.secondToken.symbol)}`}
              />
            </div>
            <span className="pool-stats__pool-select-name">
              { data.firstToken.symbol }
              {' '}
              /
              {' '}
              { data.secondToken.symbol }
            </span>
          </button>

          <Uik.Button
            className="pool-stats__transactions-btn"
            size="small"
            text="Show Transactions"
          />
        </Uik.Container>

        <Uik.Container className="pool-stats__main-stats">
          <div className="pool-stats__main-stat">
            <div className="pool-stats__main-stat-label">Total Value Locked</div>
            <div className="pool-stats__main-stat-value">
              $
              { Uik.utils.formatHumanAmount(data.tvlUSD) }
            </div>
          </div>

          <div className="pool-stats__main-stat">
            <div className="pool-stats__main-stat-label">My Liquidity</div>
            <div className="pool-stats__main-stat-value">
              $
              { data.mySupplyUSD }
            </div>
          </div>

          <div className="pool-stats__main-stat">
            <div className="pool-stats__main-stat-label">24h Volume</div>
            <div className="pool-stats__main-stat-value">
              <span>
                $
                { data.volume24hUSD }
              </span>
              <Uik.Trend
                type={data.volumeChange24h >= 0 ? 'good' : 'bad'}
                direction={data.volumeChange24h >= 0 ? 'up' : 'down'}
                text={`${data.volumeChange24h}%`}
              />
            </div>
          </div>
        </Uik.Container>
      </div>

      <div className="pool-stats__tokens">
        <Token token={data.firstToken} />
        <Token token={data.secondToken} />
      </div>
    </div>

    <Uik.Bubbles />
  </div>
);

export default Stats;

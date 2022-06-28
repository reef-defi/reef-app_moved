import './stats.css';
import Uik from '@reef-defi/ui-kit';
import React from 'react';

export interface Props {
  data?: any
}

const Token = ({ token }: any) => (
  <div className="pool-stats__token">
    <div className="pool-stats__token-info">
      <div className="pool-stats__token-main">
        <img
          src={token.image}
          alt={token.name}
          className={`
              pool-stats__token-image
              pool-stats__token-image--${Uik.utils.slug(token.name)}
            `}
        />

        <div>
          <div className="pool-stats__token-name">{ token.name }</div>
          <div className="pool-stats__token-percentage">
            { token.percentage }
            %
          </div>
        </div>
      </div>

      <div className="pool-stats__token-value-ratio">
        1
        {' '}
        {token.name}
        {' '}
        =
        {' '}
        {token.ratio.amount}
        {' '}
        {token.ratio.name}
      </div>
    </div>

    <div className="pool-stats__token-stats">
      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">Amount Locked</div>
        <div className="pool-stats__token-stat-value">{ token.amountLocked }</div>
      </div>

      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">My Liquidity</div>
        <div className="pool-stats__token-stat-value">{ token.myLiquidity }</div>
      </div>

      <div className="pool-stats__token-stat">
        <div className="pool-stats__token-stat-label">Fees 24h</div>
        <div className="pool-stats__token-stat-value">{ token.fees24h }</div>
      </div>
    </div>
  </div>
);

const Stats = ({ data }: Props) => (
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
                src={data.firstToken.image}
                alt={data.firstToken.name}
                className={`pool-stats__pool-select-pair--${Uik.utils.slug(data.firstToken.name)}`}
              />
              <img
                src={data.secondToken.image}
                alt={data.firstToken.name}
                className={`pool-stats__pool-select-pair--${Uik.utils.slug(data.secondToken.name)}`}
              />
            </div>
            <span className="pool-stats__pool-select-name">
              { data.firstToken.name }
              {' '}
              /
              {' '}
              { data.secondToken.name }
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
              { data.totalValueLocked }
            </div>
          </div>

          <div className="pool-stats__main-stat">
            <div className="pool-stats__main-stat-label">My Liquidity</div>
            <div className="pool-stats__main-stat-value">
              $
              { data.myLiquidity }
            </div>
          </div>

          <div className="pool-stats__main-stat">
            <div className="pool-stats__main-stat-label">24h Volume</div>
            <div className="pool-stats__main-stat-value">
              <span>
                $
                { data.volume24h }
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

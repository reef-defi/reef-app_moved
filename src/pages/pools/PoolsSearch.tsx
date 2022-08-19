import React from 'react';
import Uik from '@reef-defi/ui-kit';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import './pools.css';

export interface PoolsSearch {
  value?: string,
  onInput?: (value: string) => void,
}

const PoolsSearch = ({
  value,
  onInput,
}: PoolsSearch): JSX.Element => (
  <div
    className={`
        pools-search
        ${value ? 'pools-search--open' : ''}
      `}
  >
    <div className="pools-search__wrapper">
      <Uik.Icon icon={faSearch} className="pools-search__icon" />
      <input
        className="pools-search__input"
        value={value}
        onInput={(e) => {
          // @ts-ignore-next-line
          onInput(e.target.value);
        }}
        placeholder="Search"
      />

      {
        !!value
        && (
        <button
          className="pools-search__clear-btn"
          type="button"
          onClick={() => {
            if (onInput) onInput('');
          }}
        >
          <Uik.Icon icon={faXmark} />
        </button>
        )
      }
    </div>
  </div>
);

export default PoolsSearch;

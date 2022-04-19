import React from 'react';
import './Tabs.css';

interface Tabs {
  tabs: {
    title: string;
    key: string;
    notification?: number;
  }[];
  selected: string;
  onChange: (key: string) => void;
}

const Tabs: React.FC<Tabs> = ({ tabs, selected, onChange }): JSX.Element => (
  <div className="tabs">
    {
        tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`
              tabs__tab
              ${selected === tab.key ? 'tabs__tab--selected' : ''}
              ${tab.notification ? 'tabs__tab--notification' : ''}
            `}
            onClick={() => { onChange(tab.key); }}
          >
            { tab.notification ? <div className="tabs__tab-notification">{ tab.notification }</div> : ''}
            <span>{tab.title}</span>
          </button>
        ))
      }
  </div>
);

export default Tabs;

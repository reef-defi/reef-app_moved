import React from 'react';
import './Tabs.css';


const Tabs: React.FC<unknown> = ({ tabs, selected, onChange }): JSX.Element => {
  return (
    <div className="tabs">
    {
        tabs.map(tab => (
          <button
            key={tab.key}
            className={`
              tabs__tab
              ${selected === tab.key ? 'tabs__tab--selected' : ''}
              ${tab.notification ? 'tabs__tab--notification' : ''}
            `}
            onClick={() => { onChange(tab.key) }}
          >
            { tab.notification ? <div className='tabs__tab-notification'>{ tab.notification }</div> : ""}
            <span>{tab.title}</span>
          </button>
        ))
      }
  </div>
  );
};

export default Tabs;

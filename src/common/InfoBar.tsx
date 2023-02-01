import React, { useState, useEffect } from 'react';
import Uik from '@reef-defi/ui-kit';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './InfoBar.css';

export default function InfoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 4000);
  }, []);

  return (
    <div className={`infobar ${isVisible ? 'visible' : 'hidden'} ${show ? 'show' : ''}`}>
      <div className="infobar-content">
        <span>Reef Web App down for indexer maintenance. Back soon!</span>
        <Uik.Button onClick={handleClose} text="Hide" icon={faTimes} iconPosition="right" />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  BsFillGrid1X2Fill, BsBagFill, BsHammer, BsArrowLeftRight,
} from 'react-icons/bs';
import './Sidebar.css';
import useWindowDimensions from '../hooks/useWindowDimension';
import { ReefLogo } from './Icons';

const menuItems = [
  { title: 'Dashboard', icon: <BsFillGrid1X2Fill /> },
  { title: 'Swap', icon: <BsArrowLeftRight /> },
  { title: 'Pools', icon: <BsBagFill /> },
  { title: 'Creator', icon: <BsHammer /> },
];

const SCREEN_BREAK_POINT = 700;

const Sidebar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const { width } = useWindowDimensions();

  // Width toggle
  useEffect(() => {
    if (isOpen && width < SCREEN_BREAK_POINT) {
      setIsOpen(false);
    }
    if (!isOpen && width >= SCREEN_BREAK_POINT) {
      setIsOpen(true);
    }
  }, [width]);

  // TODO add references
  const menuItemsView = menuItems
    .map((item) => (
      <li key={item.title} className="sidebar__listItem">
        <div className="sidebar__icon">
          {item.icon}
        </div>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <span className="">{item.title}</span>
        </CSSTransition>
      </li>
    ));

  // TODO adjust logo size!
  return (
    <div className={`sidebar ${!isOpen && 'sidebar-closed'}`}>
      <div className="d-flex justify-content-center w-100 my-2">
        {/* TODO change the URL! */}
        <a className="w-50" href="localhost:3000">
          <ReefLogo />
        </a>
      </div>
      <ul className="sidebar-list">
        {menuItemsView}
      </ul>
    </div>
  );
};
export default Sidebar;

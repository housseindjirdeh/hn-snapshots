import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export function makeIsActive(path) {
  return function isActive(match, location) {
    return location.pathname.indexOf(path) !== -1;
  };
}

function Header() {
  return (
    <nav className="Header">
      {/* <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/news"
        isActive={makeIsActive('/')}
      >
        Top
      </NavLink> */}
      {/* <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/show"
        isActive={makeIsActive('/show')}
      >
        Show
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/ask"
        isActive={makeIsActive('/ask')}
      >
        Ask
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/jobs"
        isActive={makeIsActive('/jobs')}
      >
        Jobs
      </NavLink> */}
      <a href="https://github.com/taehwanno/hnpwa-react" target="_blank" rel="noopener noreferrer">
        <span className="Header__title">HNPWA with React</span>
      </a>
    </nav>
  );
}

export default Header;

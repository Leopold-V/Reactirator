import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export const SideNav = () => {
  const location = useLocation();

  return (
    <div className="nav bg-primary">
      <Link className="nav__logo" to="/">
        <img src="../assets/icons/png/32x32.png" alt="icon" />
        <span>Reactirator</span>
      </Link>
      <ul className="nav__list">
        <li className="nav__item">
          <Link className={`nav__link ${location.pathname === '/' ? 'active' : ''}`} to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-gauge"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#cccccc"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="1" />
              <line x1="13.41" y1="10.59" x2="16" y2="8" />
              <path d="M7 12a5 5 0 0 1 5 -5" />
            </svg>
            <span className="nav__item-name">Overview</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className={`nav__link ${location.pathname === '/packages' ? 'active' : ''}`}
            to="/packages"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-package"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#cccccc"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
              <line x1="12" y1="12" x2="20" y2="7.5" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <line x1="12" y1="12" x2="4" y2="7.5" />
              <line x1="16" y1="5.25" x2="8" y2="9.75" />
            </svg>
            <span className="nav__item-name">Packages</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className={`nav__link ${location.pathname === '/documentation' ? 'active' : ''}`}
            to="/documentation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-book"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#cccccc"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <line x1="3" y1="6" x2="3" y2="19" />
              <line x1="12" y1="6" x2="12" y2="19" />
              <line x1="21" y1="6" x2="21" y2="19" />
            </svg>
            <span className="nav__item-name">Documentation</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className={`nav__link ${location.pathname === '/command' ? 'active' : ''}`}
            to="/command"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-prompt"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#cccccc"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="5 7 10 12 5 17" />
              <line x1="13" y1="17" x2="19" y2="17" />
            </svg>

            <span className="nav__item-name">Command</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className={`nav__link ${location.pathname === '/github' ? 'active' : ''}`}
            to="/github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-github"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#cccccc"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            <span className="nav__item-name">Github</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

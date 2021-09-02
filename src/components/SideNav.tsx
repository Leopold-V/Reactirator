import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidenav.css';

export const SideNav = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  const location = useLocation();

  const changeTheme = async () => {
    if (localStorage.theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <div className="nav bg-primary">
      <div>
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e0e0e0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e0e0e0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e0e0e0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e0e0e0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              className={`nav__link ${location.pathname === '/architecture' ? 'active' : ''}`}
              to="/architecture"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-building-castle"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#e0e0e0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 19v-2a3 3 0 0 0 -6 0v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14h4v3h3v-3h4v3h3v-3h4v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <line x1="3" y1="11" x2="21" y2="11" />
              </svg>
              <span className="nav__item-name">Architecture</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav__footer">
        <button className="btn-bug flex items-center" id="button_bug">
          <span className="mr-2">Report a bug</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bug" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cf2424" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
            <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
            <line x1="3" y1="13" x2="7" y2="13" />
            <line x1="17" y1="13" x2="21" y2="13" />
            <line x1="12" y1="20" x2="12" y2="14" />
            <line x1="4" y1="19" x2="7.35" y2="17" />
            <line x1="20" y1="19" x2="16.65" y2="17" />
            <line x1="4" y1="7" x2="7.75" y2="9.4" />
            <line x1="20" y1="7" x2="16.25" y2="9.4" />
          </svg>
        </button>
        <button
          className="btn-theme opacity-100 px-4 py-2 outline-none font-bold select-none
          tracking-wider text-white rounded-lg hover:opacity-90 focus:outline-none transition duration-250"
          onClick={changeTheme}
        >
          <span className="mr-2">Theme</span>
          {theme === 'dark' ? (
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgb(255, 240, 193)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgb(255, 240, 193)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

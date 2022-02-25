import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { Bar } from './common/Bar';
import { Card } from './common/Card';
import Creator from './creator';
import Manager from './manager';

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <HashRouter>
      <Bar />
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/creator" render={() => <Creator theme={theme} setTheme={setTheme} />} />
        <Route path="/manager" render={() => <Manager theme={theme} setTheme={setTheme} />} />
      </Switch>
    </HashRouter>
  );
};

const Menu = () => {
  return (
    <div className="relative bg-gray-50 dark:bg-primary space-y-8 overflow-y-auto flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <Link
          className="flex rounded flex-col items-center space-y-4 justify-around font-extrabold text-4xl"
          to="/"
        >
          <img src="../assets/icons/png/64x64.png" alt="icon" />
          <span className="dark:text-white">Reactirator</span>
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/creator">
          <Card>
            <div className="text-xl text-center font-semibold w-32">Creation</div>
          </Card>
        </Link>
        <Link to="/manager">
          <Card>
            <div className="text-xl text-center font-semibold w-32">Development</div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();

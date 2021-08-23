import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import PackageJsonProvider from './components/Contexts/PackageJsonProvider';
import { PackagesPage } from './components/pages/PackagesPage';
import { MainContent } from './components/MainContent';
import { Bar } from './components/Bar';
import { Layout } from './components/Layout';
import { SideNav } from './components/SideNav';

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
    <PackageJsonProvider>
      <Bar theme={theme} setTheme={setTheme} />
      <Layout>
        <HashRouter>
          <SideNav />
          <Switch>
            <Route exact path="/" component={MainContent} />
            <Route exact path="/packages" component={PackagesPage} />
          </Switch>
        </HashRouter>
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            margin: '300px',
          },
        }}
      />
    </PackageJsonProvider>
  );
};

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();

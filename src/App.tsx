import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { HashRouter, Route, Switch } from 'react-router-dom';

import PackageJsonProvider from './components/Contexts/PackageJsonProvider';
import { PackagesPage } from './components/pages/PackagesPage';
import { OverviewPage } from './components/pages/OverviewPage';
import { Bar } from './components/Bar';
import { Layout } from './components/Layout';
import { SideNav } from './components/SideNav';
import { GithubPage } from './components/pages/GithubPage';
import { CommandPage } from './components/pages/CommandPage';
import { DocumentationPage } from './components/pages/DocumentationPage';

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const [readme, setReadme] = useState('');

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
      <HashRouter>
        <Layout>
          <Switch>
            <div className="flex flex-col flex-grow items-center pt-8">
              <Route exact path="/" render={() => <OverviewPage readme={readme} />} />
              <Route exact path="/packages" component={PackagesPage} />
              <Route
                exact
                path="/documentation"
                render={() => <DocumentationPage readme={readme} setReadme={setReadme} />}
              />
              <Route exact path="/command" component={CommandPage} />
              <Route exact path="/github" component={GithubPage} />
            </div>
          </Switch>
        </Layout>
      </HashRouter>
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

import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import PackageJsonProvider from './components/Contexts/PackageJsonProvider';
import { PackagesPage } from './components/pages/PackagesPage';
import { OverviewPage } from './components/pages/OverviewPage';
import { Bar } from './components/Bar';
import { Layout } from './components/Layout';
import { GithubPage } from './components/pages/GithubPage';
import { CommandPage } from './components/pages/CommandPage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import initialState from './helpers/initialState';

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const [input, setInput] = useState(initialState);
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
              <Route exact path="/" render={() => <OverviewPage input={input} setInput={setInput} readme={readme} />} />
              <Route exact path="/packages" render={() => <PackagesPage input={input} setInput={setInput} />} />
              <Route
                exact
                path="/documentation"
                render={() => <DocumentationPage readme={readme} setReadme={setReadme} />}
              />
              <Route exact path="/command" component={CommandPage} />
              <Route exact path="/github" component={GithubPage} />
          </Switch>
        </Layout>
      </HashRouter>
    </PackageJsonProvider>
  );
};

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();

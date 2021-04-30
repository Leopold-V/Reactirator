import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/pages/Home';
import Layout from './components/Layout';
import PackageProvider from './components/context/PackageContext';

const App = () => {
  return (
    <Layout>
      <PackageProvider>
        <Home />
      </PackageProvider>
    </Layout>
  )
}

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/pages/Home';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
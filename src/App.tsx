import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/pages/Home';


const App = () => {
  return (
    <Home />
  )
}


function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
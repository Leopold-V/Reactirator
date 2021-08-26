import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './splash.css'

const Splash = () => {
  return (
    <>
      <h1 id="splash_title">Reactirator</h1>
      <img src="../assets/icons/png/64x64.png" />
    </>
  );
};

function render() {
  ReactDOM.render(<Splash />, document.querySelector('#splash_screen'));
}

render();

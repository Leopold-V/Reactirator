import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PackageProvider from './components/context/PackageContext';

import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';

const App = () => {
  return (
    <PackageProvider>
      <Navbar />
      <div id="layout" className="relative py-8 bg-gray-200 text-gray-500 h-screen overflow-y-auto">
        <div className="flex justify-center flex-col items-center">
          <div className="absolute top-0 left-0 h-72 w-full bg-navbar"></div>
          <Header />
          <MainContent />
        </div>
      </div>
    </PackageProvider>
  )
}

function render() {
  ReactDOM.render(<App />, document.querySelector('#app'));
}

render();
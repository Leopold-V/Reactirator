const { shell } = require('electron');
const remote = require('electron').remote;

import './index.css';
import './App';

const win = remote.getCurrentWindow();

document.onreadystatechange = () => {
  if (document.readyState == 'complete') {
    handleWindowControls();
    addExternalLink();
  }
};

window.onbeforeunload = () => {
  win.removeAllListeners();
};

function addExternalLink() {
  document.getElementById('button_git').addEventListener('click', () => {
    shell.openExternal('https://github.com/Leopold-V/cra-generator.git');
  });
}

function handleWindowControls() {
  document.getElementById('min-button').addEventListener('click', () => {
    win.minimize();
  });

  document.getElementById('max-button').addEventListener('click', () => {
    win.maximize();
  });

  document.getElementById('restore-button').addEventListener('click', () => {
    win.unmaximize();
  });

  document.getElementById('close-button').addEventListener('click', () => {
    win.close();
  });

  toggleMaxRestoreButtons();
  win.on('maximize', toggleMaxRestoreButtons);
  win.on('unmaximize', toggleMaxRestoreButtons);

  function toggleMaxRestoreButtons() {
    if (win.isMaximized()) {
      document.body.classList.add('maximized');
    } else {
      document.body.classList.remove('maximized');
    }
  }
}

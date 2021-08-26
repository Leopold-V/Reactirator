import { remote, shell } from 'electron';

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
    shell.openExternal('https://github.com/Leopold-V/Reactirator.git');
  });
}

function handleWindowControls() {
  document.getElementById('min-button').addEventListener('click', () => {
    win.minimize();
  });

  document.getElementById('close-button').addEventListener('click', () => {
    win.close();
  });
}

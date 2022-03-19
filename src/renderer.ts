import { shell } from 'electron';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remote = require('@electron/remote');
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
  console.log('Add external link');
  document.getElementById('button_git').addEventListener('click', () => {
    shell.openExternal('https://github.com/Leopold-V/Reactirator.git');
  });
  document.getElementById('button_bug').addEventListener('click', () => {
    shell.openExternal('https://github.com/Leopold-V/Reactirator/issues/new/choose');
  });
  document.getElementById('open_project').addEventListener('click', () => {
    console.log('yes');
    shell.openExternal('https://localhost:3000');
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

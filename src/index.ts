import { app, BrowserWindow, dialog, ipcMain, session } from 'electron';
import { spawn } from 'child_process';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const SPLASH_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@electron/remote/main').initialize();

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('update-electron-app')();

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    show: false,
    frame: false,
    width: 1050,
    height: 750,
    minHeight: 750,
    minWidth: 1050,
    maxHeight: 750,
    maxWidth: 1050,
    icon: 'src/assets/icons/win/icon.ico',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: process.env.NODE_ENV === 'development' ? true : false,
    },
  });

  const splash = new BrowserWindow({
    show: true,
    width: 500,
    height: 550,
    transparent: true,
    frame: false,
    icon: 'src/assets/icons/win/icon.ico',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });

  splash.loadURL(SPLASH_WINDOW_WEBPACK_ENTRY);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['connect-src *'],
      },
    });
  });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('open-directory', (event, arg) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const filePath: string[] = dialog.showOpenDialogSync(window, {
    properties: ['openFile', 'openDirectory'],
  });
  if (filePath) {
    event.sender.send('open-dialog-directory-selected', [filePath, arg]);
  } else {
    event.sender.send('open-dialog-directory-not-selected');
  }
});

// TODO: Should maintain a list of running process.
ipcMain.on('run-cmd', (event, arg) => {
  // TODO: manage exit/close event to know when stop loading state on the UI
  const taskProcess = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    ['run', arg.cmd],
    {
      cwd: arg.path,
      shell: false,
    });
    taskProcess.stdout.on('data', (data: string) => {
      console.log(data.toString());
      event.sender.send(`child-process-${arg.cmd}`, data.toString())
    });
    taskProcess.stderr.on('data', (data: string) => {
      console.log(data.toString());
      event.sender.send(`child-process-${arg.cmd}`, data.toString())
    });
    taskProcess.on('error', (error: Error) => {
      console.log(error.message);
      event.sender.send(`child-process-${arg.cmd}`, error.message);
    });
})
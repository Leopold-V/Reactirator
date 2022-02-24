import { app, BrowserWindow, dialog, ipcMain, session } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const SPLASH_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@electron/remote/main').initialize()

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
    backgroundColor: '#181b33',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
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
  }
});

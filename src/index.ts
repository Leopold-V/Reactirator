import { app, BrowserWindow, dialog, ipcMain, session } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import ElectronStore from 'electron-store';
import { spawn } from 'child_process';
import { killAllProcess } from './utils/killProcess';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const SPLASH_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@electron/remote/main').initialize();

ElectronStore.initRenderer();

if (require('electron-squirrel-startup')) {
  app.quit();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('update-electron-app')({
  logger: require('electron-log'),
});

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
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
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

// TODO:
// Maybe rename the "taskName property to something more generic since we're using it for tasks + dependencies name as well"
let listTaskPid: { pid: number; taskName: string }[] = [];

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    const newListProcess = await killAllProcess(listTaskPid);
    listTaskPid = [...newListProcess];
    console.log(listTaskPid);
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
  if (arg === 'component') {
    if (filePath) {
      event.sender.send('open-dialog-directory-selected-component', [filePath, arg]);
    } else {
      event.sender.send('open-dialog-directory-not-selected-component');
    }
  } else {
    if (filePath) {
      event.sender.send('open-dialog-directory-selected', [filePath, arg]);
    } else {
      event.sender.send('open-dialog-directory-not-selected');
    }
  }
});

ipcMain.on('open-directory-component', (event, arg) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const filePath: string[] = dialog.showOpenDialogSync(window, {
    properties: ['openFile', 'openDirectory'],
  });
  if (filePath) {
    event.sender.send('open-dialog-directory-selected-component', [filePath, arg]);
  } else {
    event.sender.send('open-dialog-directory-not-selected-co');
  }
});

ipcMain.on('run-cmd', (event, arg: { path: string; taskName: string }) => {
  const taskProcess = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    ['run', arg.taskName],
    {
      cwd: arg.path,
      shell: false,
    }
  );

  listTaskPid.push({ pid: taskProcess.pid, taskName: arg.taskName });
  console.log(listTaskPid);

  taskProcess.stdout.on('data', (data: string) => {
    console.log(data.toString());
    console.log(taskProcess.pid);
    event.sender.send(`task-running`, { taskName: arg.taskName, data: data.toString() });
  });
  taskProcess.stderr.on('data', (data: string) => {
    console.log('#Error : ' + data.toString());
    event.sender.send(`task-running-error`, { taskName: arg.taskName, data: data.toString() });
  });
  taskProcess.on('error', (error: Error) => {
    console.log(error.message);
    event.sender.send(`task-running-error`, { taskName: arg.taskName, data: error.message });
  });
  taskProcess.on('exit', () => {
    console.log(`Exit task process: ${arg.taskName} with pid: ${taskProcess.pid}`);
    listTaskPid = listTaskPid.filter((task) => task.taskName !== arg.taskName);
    console.log(listTaskPid);
    event.sender.send(`task-running-exit`, { taskName: arg.taskName });
  });
});

ipcMain.on(
  'dep-install',
  (event, arg: { path: string; depName: string; isDevDep: boolean; version: string }) => {
    const depProcess = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['install', arg.depName],
      {
        cwd: arg.path,
        shell: false,
      }
    );
    listTaskPid.push({ pid: depProcess.pid, taskName: arg.depName + '-install' });
    console.log(listTaskPid);

    depProcess.stdout.on('data', (data: string) => {
      console.log(data.toString());
    });
    depProcess.stderr.on('data', (data: string) => {
      console.log('#Error : ' + data.toString());
    });
    depProcess.on('error', (error: Error) => {
      console.log(error.message);
    });

    depProcess.on('exit', () => {
      console.log(`Exit dependency process: ${arg.depName} with pid: ${depProcess.pid}`);
      listTaskPid = listTaskPid.filter((task) => task.taskName !== arg.depName + '-install');
      console.log(listTaskPid);
      console.log(arg.version);
      event.sender.send(`dep-install-exit`, {
        depName: arg.depName,
        isDevDep: arg.isDevDep,
        version: arg.version,
      });
    });
  }
);

ipcMain.on('dep-uninstall', (event, arg: { path: string; depName: string; isDevDep: boolean }) => {
  const depProcess = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    ['uninstall', arg.depName],
    {
      cwd: arg.path,
      shell: false,
    }
  );
  listTaskPid.push({ pid: depProcess.pid, taskName: arg.depName + '-uninstall' });
  console.log(listTaskPid);

  depProcess.stdout.on('data', (data: string) => {
    console.log(data.toString());
  });
  depProcess.stderr.on('data', (data: string) => {
    console.log('#Error : ' + data.toString());
  });
  depProcess.on('error', (error: Error) => {
    console.log(error.message);
  });

  depProcess.on('exit', () => {
    console.log(`Exit dependency process: ${arg.depName} with pid: ${depProcess.pid}`);
    listTaskPid = listTaskPid.filter((task) => task.taskName !== arg.depName + '-uninstall');
    console.log(listTaskPid);
    event.sender.send(`dep-uninstall-exit`, { depName: arg.depName, isDevDep: arg.isDevDep });
  });
});

ipcMain.on(
  'dep-update',
  (event, arg: { path: string; depName: string; isDevDep: boolean; version: string }) => {
    const depProcess = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['install', `${arg.depName}@${arg.version}`],
      {
        cwd: arg.path,
        shell: false,
      }
    );
    listTaskPid.push({ pid: depProcess.pid, taskName: arg.depName + '-update' });
    console.log(listTaskPid);

    depProcess.stdout.on('data', (data: string) => {
      console.log(data.toString());
    });
    depProcess.stderr.on('data', (data: string) => {
      console.log('#Error : ' + data.toString());
    });
    depProcess.on('error', (error: Error) => {
      console.log(error.message);
    });

    depProcess.on('exit', () => {
      console.log(`Exit dependency process: ${arg.depName} with pid: ${depProcess.pid}`);
      listTaskPid = listTaskPid.filter((task) => task.taskName !== arg.depName + '-update');
      console.log(listTaskPid);
      event.sender.send(`dep-update-exit`, {
        depName: arg.depName,
        isDevDep: arg.isDevDep,
        version: arg.version,
      });
    });
  }
);

ipcMain.on('kill-process', (event, arg) => {
  const pid = listTaskPid.find((task) => task.taskName === arg.taskName).pid;
  event.sender.send(`task-running-kill`, { taskName: arg.taskName, pid: pid });
});

ipcMain.on('kill-all-running-process', async () => {
  const newListProcess = await killAllProcess(listTaskPid);
  listTaskPid = [...newListProcess];
  console.log(listTaskPid);
});

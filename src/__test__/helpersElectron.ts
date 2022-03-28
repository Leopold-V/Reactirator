import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers';
import { Page, _electron as electron } from 'playwright';
import { pause } from '../utils/pause';

export const startApp = async () => {
  const latestBuild = findLatestBuild();
  const appInfo = parseElectronApp(latestBuild);

  const electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
  });

  await electronApp.firstWindow();

  while (electronApp.windows().length === 2) {
    await pause(100);
  }

  const windows = electronApp.windows();

  if (windows.length !== 1) {
    throw new Error('too many windows open');
  }

  const appWindow: Page = windows[0];
  appWindow.on('console', console.log);

  return { appWindow, appInfo, electronApp };
};

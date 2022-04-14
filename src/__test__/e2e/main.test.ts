import { ElectronApplication, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { startApp } from '../helpersElectron';

let electronApp: ElectronApplication;
let appWindow: Page;

test.beforeEach(async () => {
  const startAppResponse = await startApp();
  electronApp = startAppResponse.electronApp;
  appWindow = startAppResponse.appWindow;
});

test.afterEach(async () => {
  await electronApp.close();
});

test.describe('app renders correctly', () => {
  test('display the correct window', async () => {
    const title = await appWindow.title();
    expect(title).toBe('Reactirator');
  });

  test('renders the menu', async () => {
    await expect(appWindow.locator('text=New Project')).toBeVisible();
    await expect(appWindow.locator('text=Open project')).toBeVisible();
  });
});

test.describe('creator part functions correctly', () => {
  test('display the creator part', async () => {
    const buttonCreator = appWindow.locator('text=New Project');
    buttonCreator.click();
    await appWindow.waitForSelector('text=Creation process');
    expect(appWindow.locator('text=Creation process')).toBeVisible();
  });
});

/*
test.describe('manager part functions correctly', () => {
  test('display the manager part', async () => {
    const buttonManager = appWindow.locator('text=Open project');
    buttonManager.click();
    await appWindow.waitForSelector('text=Tasks:');
    const titlePage = appWindow.locator('text=Tasks:');
    expect(titlePage).toBeVisible();
  })
});
*/

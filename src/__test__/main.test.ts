import { ElectronApplication, Page } from 'playwright';
import { startApp } from './helpersElectron';

let electronApp: ElectronApplication;
let appWindow: Page;

beforeAll(async () => {
  const startAppResponse = await startApp();
  electronApp = startAppResponse.electronApp;
  appWindow = startAppResponse.appWindow;
});

afterAll(async () => {
  await electronApp.close();
});

test('renders the first page', async () => {
  const title = await appWindow.title();
  expect(title).toBe('Reactirator');
});

test('renders the creator page', async () => {
  const buttonCreator = appWindow.locator('text=New project');
  await buttonCreator.click();
  const titlePage = await appWindow.locator('text=Creation process').textContent();
  expect(titlePage).toBe('Creation process');
});

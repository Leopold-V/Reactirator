import { Application } from 'spectron';
import path from 'path';

// Should detect the OS env for the output path.
const packageName = 'Reactirator';
const app = new Application({
  path: path.join(
    process.cwd(), // This works assuming you run npm test from project root
    `out/${packageName}-win32-x64/${packageName}.exe`
  ),
  port: 4567,
});

describe('App is running 10 sec', function () {
  beforeEach(async () => {
    await app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) await app.stop();
  });

  it('shows an initial window', async () => {
    const count = await app.client.getWindowCount();
    expect(count).toBe(1);
  });

  it('show a title', async () => {
    const title = await app.client.getTitle();
    expect(title).toBe('Reactirator');
  });
});

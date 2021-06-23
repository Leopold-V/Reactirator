import { Application } from 'spectron';
import path from 'path';
import assert from 'assert';

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

  it('shows an initial window', () => {
    return app.client.getWindowCount().then((count: any) => {
      console.log(count);
      assert.strictEqual(count, 1);
    });
  });
});

import { AuthOptions } from '../helpers/types';
import { Constants } from '../helpers/gitServicesOptions';
const { remote } = require('electron');
const BrowserWindow = remote.BrowserWindow;

export const authGitHub = (
  authOptions = Constants.DEFAULT_AUTH_OPTIONS
): Promise<{
  authCode: string;
  authOptions: AuthOptions;
}> => {
  return new Promise((resolve, reject) => {
    const authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
    });

    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${authOptions.clientId}&scope=${Constants.AUTH_SCOPE}`;

    const session = authWindow.webContents.session;
    session.clearStorageData();

    authWindow.loadURL(githubUrl);

    const handleCallback = async (url: string) => {
      const raw_code = /code=([^&]*)/.exec(url) || null;
      const authCode = raw_code && raw_code.length > 1 ? raw_code[1] : null;
      const error = /\?error=(.+)$/.exec(url);
      if (authCode || error) {
        authWindow.destroy();
      }
      if (authCode) {
        resolve({ authCode, authOptions });
      } else if (error) {
        reject(
          "Oops! Something went wrong and we couldn't " +
            'log you in using Github. Please try again.'
        );
      }
    };

    authWindow.on('close', () => {
      reject('Cancel authentication window.');
      authWindow.destroy();
    });

    authWindow.webContents.on(
      'did-fail-load',
      (event, errorCode, errorDescription, validatedURL) => {
        if (validatedURL.includes(authOptions.hostname)) {
          authWindow.destroy();
          reject(`Invalid Hostname. Could not load https://${authOptions.hostname}/.`);
        }
      }
    );

    authWindow.webContents.on('will-navigate', async (event, url) => {
      event.preventDefault();
      await handleCallback(url);
    });
  });
};

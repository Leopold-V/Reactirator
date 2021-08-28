const { remote } = require('electron');
const BrowserWindow = remote.BrowserWindow;

const PROXY_URL = 'https://cors.bridged.cc'; // use to prevent cors blockage when fetching github access_token endpoint from client side.

interface AuthOptions {
  hostname: string;
  clientId: string;
  clientSecret: string;
}

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

export const getToken = async (
  authCode: string,
  authOptions = Constants.DEFAULT_AUTH_OPTIONS
): Promise<any> => {
  
  const url = `${PROXY_URL}/https://${authOptions.hostname}/login/oauth/access_token`;
  const data = {
    client_id: authOptions.clientId,
    client_secret: authOptions.clientSecret,
    code: authCode,
  };
  try {
    const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
    const json = await response.json();
    console.log(json);
    return {
      hostname: authOptions.hostname,
      token: json.access_token,
    };
  } catch (error) {
      console.log(error.message);
  }
};

const Constants = {
  AUTH_SCOPE: ['user:email', 'notifications'],

  DEFAULT_AUTH_OPTIONS: {
    hostname: 'github.com',
    clientId: 'Iv1.f5f104add4022b9a',
    clientSecret: 'c8c02043b965daf08189c79d5963dc6a90fe914e',
  },
};

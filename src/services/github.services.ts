import { AuthOptions } from '../creator/helpers/types';
import { Constants } from '../creator/helpers/gitServicesOptions';
import { GithubStateType } from '../creator/components/Contexts/GithubProvider';

export const createGithubRepo = async (github: GithubStateType) => {
  try {
    await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + github.token,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name: github.reponame, visibility: github.visibility }),
    });
  } catch (error) {
    console.log(error);
  }
};
/*
export const pushToGithubRepo = async (github: GithubStateType, filename: string, filecontent: string) => {
  try {
    await fetch(`https://api.github.com/repos/leopold-v/${github.reponame}/contents/${filename}`, {
      method: 'PUT',
      headers: {
          'Authorization': 'Token ' + github.token,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({message: 'update', content: btoa(filecontent)})
    })
  } catch (error) {
    console.log(error);
  }
}
*/
export const getToken = async (
  authCode: string,
  authOptions: AuthOptions = Constants.DEFAULT_AUTH_OPTIONS
): Promise<any> => {
  const url = `https://github.com/login/oauth/access_token`;
  const data = {
    client_id: authOptions.clientId,
    client_secret: authOptions.clientSecret,
    code: authCode,
  };
  try {
    //@ts-ignore
    const response = await fetchPostWithNode(url, data);
    console.log(response);
    return {
      hostname: authOptions.hostname,
      newToken: response.access_token,
    };
  } catch (error) {
    console.log(error.message);
  }
};

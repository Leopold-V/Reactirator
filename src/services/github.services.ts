import { AuthOptions } from "../helpers/types";
import { Constants } from "../helpers/gitServicesOptions";
import { GithubStateType } from "../components/Contexts/GithubProvider";

const PROXY_URL = 'https://cors.bridged.cc'; // use to prevent cors blockage when fetching github access_token endpoint from client side.

export const createGithubRepo = async (github: GithubStateType) => {
  try {
    await fetch("https://api.github.com/user/repos", {
      method: 'POST',
      headers: {
          'Authorization': 'Token ' + github.token,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({name: github.reponame, visibility: github.visibility})
    })
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async (
    authCode: string,
    authOptions: AuthOptions = Constants.DEFAULT_AUTH_OPTIONS
  ): Promise<any> => {
    
    const url = `${PROXY_URL}/https://github.com/login/oauth/access_token`;
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
      return {
        hostname: authOptions.hostname,
        newToken: json.access_token,
      };
    } catch (error) {
        console.log(error.message);
    }
  };
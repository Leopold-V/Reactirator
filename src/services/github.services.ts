import { AuthOptions } from "../helpers/types";
import { Constants } from "../helpers/gitServicesOptions";

const PROXY_URL = 'https://cors.bridged.cc'; // use to prevent cors blockage when fetching github access_token endpoint from client side.

export const createRepo = (token: string, repo_name: string) => {
    fetch("https://api.github.com/user/repos", {
        method: 'POST',
        headers: {
            "Authorization": token,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({name: repo_name})
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
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
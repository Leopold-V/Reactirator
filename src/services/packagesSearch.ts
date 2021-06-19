const request = require('request');

const API_URL = 'https://api.npms.io/v2/search?q=';
const REGISTRY_URL = 'https://registry.npmjs.org';

export const getPackages = async (packageName: string, size = 30): Promise<any> => {
  try {
    const rep = await fetch(`${API_URL}${packageName}&size=${size}`);
    const res = await rep.json();
    return res.results;
  } catch (error) {
    throw error;
  }
};

export const getPackageRegistryInfo = (name: string, version: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request({ url: `${REGISTRY_URL}/${name}/${version}`, json: true }, (err: Error, res: any) => {
      if (!err) {
        let status = null;
        switch (res.statusCode) {
          case 400:
            status = 'Invalid data';
            break;
          case 404:
            status = 'Package not found';
            break;
          case 412:
            status = 'Precondition failed';
            break;
        }
        resolve(res.body);
      } else {
        reject(err);
      }
    });
  });
};

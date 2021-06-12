const request = require('request');

export const calculateAllPackagesSize = async (list: { [key: string]: string }) => {
  const listPromise = [];
  for (const ele in list) {
    const [name, version] = [ele, list[ele].replace('^', '')];
    listPromise.push(calculatePackageSize(name, version));
  }
  const result = await Promise.all(listPromise);
  const totalSize = result.reduce((a, b) => a + b, 0);
  return totalSize;
};

export const calculatePackageSize = (name: string, version: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    request(
      { url: `https://registry.npmjs.org/${name}/${version}`, json: true },
      (err: Error, res: any) => {
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
          resolve(res.body.dist.unpackedSize);
        } else {
          reject(err);
        }
      }
    );
  });
};

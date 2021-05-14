const request = require("request");

export const calculateAllPackagesSize = (list: {name:string, version:string}[]) => {
    console.log(Object.keys(list));
}

export const calculatePackageSize = (name: string, version: string) => {
  return new Promise((resolve, reject) => {
    request({ url: `https://registry.npmjs.org/${name}/${version}`, json: true }, (err: Error, res: any) => {
      if (!err) {
        let status = null;
        switch (res.statusCode) {
          case 400:
            status = "Invalid data";
            break;
          case 404:
            status = "Package not found";
            break;
          case 412:
            status = "Precondition failed";
            break;
        }
        resolve(res.body.dist.unpackedSize);
      } else {
        reject(err)
      }
  });
  })
}

/*const calculateDepsSize = (name: string, version: string): any => {

    
}*/

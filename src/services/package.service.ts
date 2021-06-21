const API_URL = 'https://api.npms.io/v2/search?q=';
const REGISTRY_URL = 'https://registry.npmjs.org';
const PROXY_URL = 'https://cors.bridged.cc';

export const searchPackages = async (packageName: string, size = 30): Promise<any> => {
  try {
    const rep = await fetch(`${API_URL}${packageName}&size=${size}`);
    const res = await rep.json();
    return res.results;
  } catch (error) {
    throw error;
  }
};

export const getOnePackage = async (name: string, version: string): Promise<any> => {
  try {
    const rep = await fetch(`${PROXY_URL}/${REGISTRY_URL}/${name}/${version}`);
    const res = await rep.json();
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSizeOfPackagesList = async (listPkg: any[]) => {
  const listSize: number[] = [];
  for (const ele of listPkg) {
    await getOnePackage(ele.package.name, ele.package.version).then((result) => {
      listSize.push(result.dist.unpackedSize);
    });
  }
  const totalSize = listSize.reduce((a, b) => a + b, 0);
  return totalSize;
};

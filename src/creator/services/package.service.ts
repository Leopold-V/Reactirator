const API_URL = 'https://api.npms.io/v2/search?q=';
const REGISTRY_URL = 'https://registry.npmjs.org';

export const searchPackages = async (packageName: string, size = 30): Promise<any> => {
  const rep = await fetch(`${API_URL}${packageName}&size=${size}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const res = await rep.json();
  return res.results;
};

export const getOnePackage = async (name: string, version: string): Promise<any> => {
  //@ts-ignore
  const res = await fetchWithNode(`${REGISTRY_URL}/${name}/${version}`);
  return res;
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
//@ts-nocheck
import fetchNode from 'node-fetch';

// Because of CORS issues with the npm registry
// we are using preload and exposed this function as a workaround to do server-to-server requests.
window.fetchWithNode = async (url) => {
  const rep = await fetchNode(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const res = await rep.json();
  return res;
};

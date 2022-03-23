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

window.fetchPostWithNode = async (url, data) => {
  const rep = await fetchNode(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const res = await rep.json();
  return res;
};

const findStartScript = (starterName: string) => {
  if (starterName === 'CRA' || starterName === 'gatsby') {
    return 'start';
  }
  if (starterName === 'next' || starterName === 'remix' || starterName === 'vite') {
    return 'dev';
  }
  return null;
};

export default findStartScript;

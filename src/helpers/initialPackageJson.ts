const initialPackageJson = {
  name: '',
  version: '0.1.0',
  description: '',
  private: true,
  dependencies: {
    '@testing-library/jest-dom': '',
    '@testing-library/react': '',
    '@testing-library/user-event': '',
    react: '',
    'react-dom': '',
    'react-scripts': '',
    'web-vitals': '',
  },
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject',
  },
  eslintConfig: {
    extends: ['react-app', 'react-app/jest'],
  },
  browserslist: {
    production: ['>0.2%', 'not dead', 'not op_mini all'],
    development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
  },
  devDependencies: {},
};

export default initialPackageJson;

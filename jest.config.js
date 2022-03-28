module.exports = {
  preset: "jest-playwright-preset",
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testTimeout: 20000,
};
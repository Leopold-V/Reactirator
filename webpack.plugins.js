const path = require('path');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = [ 'assets' ]; // asset directories

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new Dotenv(),
  new CopyWebpackPlugin({
    patterns: assets.map(asset => ({
      from: path.resolve(__dirname, 'src', asset), to: path.resolve(__dirname, '.webpack/renderer', asset)
    }))
  }),
];

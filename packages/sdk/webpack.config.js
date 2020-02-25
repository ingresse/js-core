
const nodeExternals = require('webpack-node-externals');
const path            = require('path');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'sdk.js',
    path: __dirname + '/dist',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    '@ingresse/request': path.resolve(__dirname, '../request/src'),
  }
};
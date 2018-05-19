const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client', 'src')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/index.html' })
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map'
};

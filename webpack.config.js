const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';

module.exports = {
  mode,
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'client', 'src')
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './client/index.html' })
  ],
  devtool: isProd ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
    ]
  }
};

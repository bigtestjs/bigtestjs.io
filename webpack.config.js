const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => ({
  mode: env.production ? 'production' : 'development',

  entry: [
    './source/javascripts/index.js',
    './source/stylesheets/app.scss'
  ],

  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: 'app.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    })
  ],

  devtool: env.development && 'inline-source-map',
  stats: 'errors-only'
});

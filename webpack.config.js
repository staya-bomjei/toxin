const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: path.resolve(__dirname, 'src', 'entry.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      filename: '[name].html',
      template: path.resolve(__dirname, 'src', 'pepega', 'index.pug')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }, 
      {
        test: /\.(png|jpg|gif|ttf|woff|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      }
    ]
  }
};
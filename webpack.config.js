const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const pages = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'));
  const htmlPlugins = pages.map((page) => new HTMLWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(__dirname, 'src', 'pages', page, `${page}.pug`),
  }));

  const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'entry.js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      ...htmlPlugins,
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.pug$/i,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        {
          test: /\.(png|jpg|gif|ttf|woff|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
  };

  if (env.production) {
    return {
      mode: 'production',
      ...baseConfig,
    };
  }
  return {
    mode: 'development',
    devServer: {
      port: 4200,
    },
    ...baseConfig,
  };
};

const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const pages = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'));
  const htmlPlugins = pages.map((page) => new HTMLWebpackPlugin({
    getData: () => {
      try {
        return JSON.parse(fs.readFileSync(`./src/pages/${page}/data.json`, 'utf8'));
      } catch (e) {
        return {};
      }
    },
    filename: `${page}.html`,
    template: path.resolve(__dirname, 'src', 'pages', page, `${page}.pug`),
  }));

  const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'entry.js'),
    output: {
      filename: (env.production) ? '[name].[hash].js' : '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      ...htmlPlugins,
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
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
          type: 'asset/resource',
          generator: {
            filename: './assets/[name].[hash][ext]',
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
      open: '/test-page.html',
    },
    ...baseConfig,
  };
};

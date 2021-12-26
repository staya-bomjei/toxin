const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    chunks: [page],
  }));
  const entryPoints = pages.reduce((result, page) => ({
    ...result,
    [page]: path.resolve(__dirname, 'src', 'pages', page, 'index.js'),
  }), {});

  function filename(ext) {
    return `${ext}/[name]${(env.production) ? '.[contenthash]' : ''}.${ext}`;
  }

  const baseConfig = {
    entry: entryPoints,
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      ...htmlPlugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'assets', 'favicons'),
            to: 'assets/favicons',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                    ],
                  ],
                },
              },
            },
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
          test: /\.(png|jpg|gif|svg)$/i,
          type: 'asset/resource',
          exclude: /fonts/,
          generator: {
            filename: './assets/img/[contenthash][ext]',
          },
        },
        {
          test: /\.(ttf|woff|svg)$/i,
          type: 'asset/resource',
          exclude: /img/,
          generator: {
            filename: './assets/fonts/[name][ext]',
          },
        },
      ],
    },
  };

  if (env.production) {
    return {
      mode: 'production',
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
      ...baseConfig,
    };
  }
  return {
    mode: 'development',
    devServer: {
      port: 4200,
      open: '/index.html',
    },
    ...baseConfig,
  };
};

const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  ROOT: __dirname,
  DIST: path.resolve(__dirname, 'dist'),
  PAGES: path.resolve(__dirname, 'src', 'pages'),
  FAVICONS: path.resolve(__dirname, 'src', 'assets', 'favicons'),
};

const pages = fs.readdirSync(PATHS.PAGES);

const htmlPlugins = pages.map((page) => new HTMLWebpackPlugin({
  getData: () => {
    try {
      const dataPath = path.resolve(PATHS.PAGES, page, 'data.json');
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
      return {};
    }
  },
  filename: `${page}.html`,
  template: path.resolve(PATHS.PAGES, page, `${page}.pug`),
  chunks: [page],
}));

const entryPoints = pages.reduce((result, page) => ({
  ...result,
  [page]: path.resolve(PATHS.PAGES, page, 'index.js'),
}), {});

const cssLoaders = [
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
];

module.exports = (env) => {
  const isDev = Boolean(env.development);
  const filename = (ext) => `${ext}/[name]${(isDev) ? '' : '.[contenthash]'}.${ext}`;

  const baseConfig = {
    entry: entryPoints,
    output: {
      filename: filename('js'),
      path: PATHS.DIST,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: PATHS.FAVICONS, to: 'assets/favicons' }],
      }),
      ...htmlPlugins,
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [...cssLoaders],
        },
        {
          test: /\.s[ac]ss$/,
          use: [...cssLoaders, 'sass-loader'],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          exclude: /fonts/,
          generator: {
            filename: './assets/img/[contenthash][ext]',
          },
        },
        {
          test: /\.(ttf|woff|svg)$/,
          type: 'asset/resource',
          exclude: /img/,
          generator: {
            filename: './assets/fonts/[name][ext]',
          },
        },
      ],
    },
  };

  if (isDev) {
    return {
      mode: 'development',
      devServer: {
        port: 4200,
        open: '/index.html',
      },
      ...baseConfig,
    };
  }
  return {
    mode: 'production',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    ...baseConfig,
  };
};

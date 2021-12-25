const fs = require('fs');
const path = require('path');
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
  }));

  function filename(ext) {
    return `${ext}/[name].${(env.production) ? '[contenthash]' : ''}.${ext}`;
  }

  const baseConfig = {
    entry: path.resolve(__dirname, 'src', 'entry.js'),
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
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

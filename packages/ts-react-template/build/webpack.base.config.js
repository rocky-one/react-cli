const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const app = process.env.NODE_ENV_APP;

function getBaseConfig(processEnv) {

  return {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    mode: processEnv,
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name].[chunkhash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx'],
      modules: [path.resolve(__dirname, '../node_modules')],
      alias: {
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': '@hot-loader/react-dom',
        'react-router-dom': path.resolve(__dirname, '../node_modules/react-router-dom'),
        axios: path.resolve(__dirname, '../node_modules/axios'),
        '@': path.resolve(__dirname, '../src'),
      },
      fallback: { "events": require.resolve("events") }
    },
    cache: true,
    optimization: {
      splitChunks: {
        minSize: 0,
        cacheGroups: {
          // 抽取公用方法
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
          },
          // 抽取第三方模块的公共库 
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|axios|react-router-dom)[\\/]/,
            minChunks: 1,
            priority: 20,
          }
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:7].[ext]',
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'iconfont/[name].[hash:7].[ext]',
            },
          }],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:4]',
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
          ],
        },
        {
          oneOf: [
            {
              test: /\.(scss|sass)$/,
              resourceQuery: /modules/,
              use: [
                {
                  loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]-[hash:base64:4]',
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.(scss|sass)$/,
              use: [
                {
                  loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'css-loader',
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(processEnv),
        'process.env.NODE_ENV_APP': `'${app}'`,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[chunkhash:8].css',
        chunkFilename: 'css/[name].[chunkhash:8].css',
      }),
      // new DashboardPlugin(),
    ],
  };
}

module.exports = getBaseConfig;

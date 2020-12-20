const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const getBaseConfig = require('./webpack.base.config.js');
const baseConfig = getBaseConfig('development');
const DEVPORT = 8086;

const devConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const serverOptions = {
  hot: true,
  open: true,
  contentBase: path.join(__dirname, '../dist/'),
  historyApiFallback: true,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}

const config = merge(baseConfig, devConfig);
webpackDevServer.addDevServerEntrypoints(config, serverOptions);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, serverOptions);

server.listen(DEVPORT, '127.0.0.1', () => {
  console.log(`dev server listening on port ${DEVPORT}`);
});

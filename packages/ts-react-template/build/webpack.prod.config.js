const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config.js');
const baseConfig = getBaseConfig('production');

const prodConfig = {
  plugins: [
    new CleanWebpackPlugin(['dist/js/*.js','dist/js/*.txt', 'dist/css/*.css', 'dist/images', 'dist/index.html'], {
      root: process.cwd(),
      verbose: true,
      dry: false,
      exclude: ['dist/js/vendor'],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, autoprefixer: false, discardComments: { removeAll: true } },
      canPrint: true,
    }),
    // new ParallelUglifyPlugin({
    // 	output: {
    // 		comments: false,
    // 	},
    // 	uglifyJS: {
    // 		compress: {
    // 			warnings: false,
    // 			drop_console: true,
    // 		}
    // 	}
    // }),
    // new CompressionPlugin({
    //   filename: '[path][base].gz',
    //   algorithm: 'gzip',
    //   test: /\.(js|ts|jsx|tsx)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
  ],
};

webpack(merge(baseConfig, prodConfig), (err, stats) => {
  if(err) {
    console.log(err)
    return;
  }
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    performance: false,
  }));
});

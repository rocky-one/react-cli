const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new ParallelUglifyPlugin({
    	uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
    		compress: {
    			drop_console: true,
        },
    		warnings: false,
    	}
    }),
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

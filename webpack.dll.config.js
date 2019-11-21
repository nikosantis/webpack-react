const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    modules: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].dll.js',
    'library': '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/*.dll.*'],
    })
  ],
}

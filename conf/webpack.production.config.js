import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),]
});

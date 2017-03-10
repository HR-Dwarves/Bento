var path = require('path');
var webpack = require('webpack');
var postCSSConfig = require('./postcss.config.js');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/, // may apply this only for some modules
      options: {
        postcss: function() {
          return postCSSConfig;
        }
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [
    // js
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client')
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
    alias: {'react-grid-layout': path.join(__dirname, '/index-dev.js')}
  }
};


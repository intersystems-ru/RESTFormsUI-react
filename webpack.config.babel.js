import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


export default {
  stats: 'errors-only',
  devtool: 'source-map',
  entry:  [ "babel-polyfill", path.resolve(__dirname, 'src/index') ],
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      { from: 'static', to: './' }
    ])
    //new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.csp$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-1'],
              plugins: [[ "import", { "libraryName": "antd", "style": "css" }]]
            }
          }
        ]
      },

      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },

      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [ 'file-loader' ]},
      {test: /\.(woff|woff2)$/, use: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png$/, exclude: /node_modules/, use: 'file-loader?name=images/[name].[ext]'}
    ]
  }
};

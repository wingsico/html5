const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin  = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: "./src/index.ts",
  output: {
    filename: "bundle.[hash:9].js",
    path: __dirname + "/dist"
  },

  devServer: {
    contentBase: './build',
    // 自动在浏览器内打开 端口号
    port: 3000,
    // 是否压缩
    compress: true,
    hot: true,
    watchContentBase: true
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by
      // 'awesome-typescript-loader'.
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }, {
        test: /\.scss?$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
      },

      // All output '.js' files will have any sourcemaps re-processed by
      // 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: "H5 - draggable",
      minify: {
        removeAttributeQuotes: true,
        removeTagWhitespace: true,
        collapseWhitespace: true
      },
      inject: 'body',
      hash: true
    }),
    new CleanWebpackPlugin(['./dist']),
    new ExtractTextPlugin("./css/style?[hash].css"), // separate css
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
};
const webpack = require('webpack')
const WebpackNotifier = require('webpack-notifier')
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const styleLoaders = require('./styleLoaders.js')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: {
    main: join(__dirname, '..', 'src', 'index.js')
  },
  output: {
    path: join(__dirname, '../dist'),
  },
  performance: {
    hints: false,
  },
  resolve: {
    alias: {
      '@views': join(__dirname, '..', 'src', 'views'),
      '@pages': join(__dirname, '..', 'src', 'pages'),
      '@api': join(__dirname, '..', 'src', 'api'),
      '@components': join(__dirname, '..', 'src', 'components'),
      '@app': join(__dirname, '..', 'src', 'app.vue'),
      '@utils': join(__dirname, '..', 'src', 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        // 对图片文件进行打包编译
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/imgs/[name].[hash:7].[ext]'
        }
      },
      {
        // 对视频文件进行打包编译
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/medias/[name].[hash:7].[ext]'
        }
      },
      {
        // 对字体文件进行打包编译
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      },
      ...styleLoaders(),
    ]
  },
  plugins: [
    new WebpackNotifier({
      title: 'build completed...',
      alwaysNotify: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{
      ignore: ['.*'],
      from: join(__dirname, '..', 'public'),
      to: 'public',
    }]),
    new HtmlWebpackPlugin({
      template: join(__dirname, '..', 'index.html'),
      filename: 'index.html',
      // UnhandledPromiseRejectionWarning: Error: Cyclic dependency
      "chunksSortMode": 'none',
    }),
  ],
}

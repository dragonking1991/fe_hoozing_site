const config = require('./config.json');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const TwigDataPlugin = require('./twig-data-plugin');

const htmls = fs.readdirSync('./app').filter(f => /\.twig$/g.test(f));

module.exports = {
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: false,
                modules: false,
                minimize: false,
                url: false
              }
            },
            'sass-loader',
            'import-glob-loader'
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        include: path.resolve(__dirname, 'app/assets/images'),
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false,
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?#(.))?$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false,
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      }
    ]
  },
  entry: {
    app: `./app/assets/js/app.js`
  },
  output: {
    path: path.resolve(__dirname, '.tmp'),
    // publicPath: '../',
    filename: 'assets/js/[name].js'
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "./.modernizrrc.js")
    }
  },
  plugins: [
    FailPlugin,
    new TwigDataPlugin('./app/_data/app.json'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', minChunks: (module, count) => {
        let context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    }),
    new ExtractTextPlugin('assets/css/[name].css'),
    new BrowserSyncPlugin({
      notify: false,
      port: 9000,
      reloadDelay: 100,
      logLevel: 'info',
      online: true,
      open: 'external',
      server: {
        baseDir: ['.tmp', 'app'],
        directory: true
      }
    })
  ].concat(htmls.map(html => new HtmlWebpackPlugin({
    template: `./app/${html}`,
    filename: html.replace('.twig', '.html')
  })
  ))
}
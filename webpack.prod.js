const config = require('./config.json');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');

const htmls = fs.readdirSync('./app').filter(f => /\.twig$/g.test(f));
const data = JSON.parse(fs.readFileSync('./app/_data/app.json', 'utf-8'));

module.exports = {
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
                sourceMap: false,
                importLoaders: true,
                modules: false,
                minimize: true,
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
    path: path.resolve(__dirname, config.dist),
    // publicPath: '../',
    filename: 'assets/js/[name].js'
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, "./.modernizrrc.js")
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins:[
    FailPlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: (module, count) => {
        let context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    }),
    new ExtractTextPlugin('assets/css/[name].css')
  ].concat(htmls.map(html => {
      let htmlData = {};
      for(prop in data) {
        htmlData[prop] = data[prop];
      }
      htmlData.template = `./app/${html}`;
      htmlData.filename = html.replace('.twig', '.html');
      return new HtmlWebpackPlugin(htmlData);
    }
  ))
}
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const WebpackForceReloadPlugin   = require('webpack-force-reload-plugin');
const _                          = require('lodash');
const configHelpers              = require('webpack-config-helpers');
const globImporter               = require('node-sass-glob-importer');
const path                       = require("path");
const webpack                    = require('webpack');
const { VueLoaderPlugin }        = require('vue-loader');
const { glob }                   = require('glob');

let globalDevServer = null;

module.exports = env => {
  return {
    mode: configHelpers.ifProduction(env, 'production', 'development'),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.vue\.(coffee|js)$/,
          use: [
            {
              loader: 'vue-loader',
            },
            {
              loader: 'vue-component-merge-loader',
            },
          ]
        },
        {
          test: /\.coffee$/,
          use: [
            {
              loader: 'coffee-loader',
              options: {
                bare: true,
              },
            },
          ]
        },
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/u,
              use: [
                {
                  loader: 'ejs-pug-vue-resource-loader',
                },
              ]
            },
            {
              use: [
                {
                  loader: 'ejs-loader-compiled',
                },
                {
                  loader: 'pug-plain-loader',
                },
              ]
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            configHelpers.ifNotProduction(
              env,
              'vue-style-loader',
              MiniCssExtractPlugin.loader
            ),
            {
              loader: 'css-loader',
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.(sass)$/,
          use: [
            configHelpers.ifNotProduction(
              env,
              'vue-style-loader',
              MiniCssExtractPlugin.loader
            ),
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  importer: globImporter(),
                  indentedSyntax: true,
                }
              }
            }
          ],
          sideEffects: true,
        },

      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: configHelpers.ifProduction(
            env,
            '"production"',
            '"development"'
          ),
          'termlog': env.termlog,
        },
      }),
      new HtmlWebpackPlugin({
        minify: false,
        alwaysWriteToDisk: true,
        template: path.resolve(
          __dirname,
          'src',
          'markup',
          'templates',
          'index.pug'
        ),
        filename: path.resolve(
          __dirname,
          'templates',
          'index.html'
        ),
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css',
        //chunkFilename: '[id].css'
      }),
      configHelpers.ifNotProduction(
        env,
        new WebpackBuildNotifierPlugin({
          title: 'Webpack',
        })
      ),
      new VueLoaderPlugin(),
      new WebpackForceReloadPlugin({
        devServer: function() {
          return globalDevServer;
        },
        cwd: __dirname,
        files: 'src/markup/templates/**/*'
      }),
    ],
    entry: {
      app: [
        './src/scripts/main.js',
        //'./src/scripts/app.coffee',
      ],
    },
    output: {
      filename: 'assets/[name].[contenthash].js',
      chunkFilename: 'assets/[name].[contenthash].js',
      path: path.resolve(__dirname, 'static'),
      publicPath: '/static/',
      clean: true,
    },
    resolve: {
      alias: {
        'vue$':            'vue/dist/vue.esm-bundler',
        'markup-elements': path.resolve(__dirname, 'src/markup/elements'),
        'markup-actions':  path.resolve(__dirname, 'src/markup/actions'),
      },
    },
    devtool: false,
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        globalDevServer = devServer;
        return middlewares;
      },
      port: 3200,
      host: '0.0.0.0',
      devMiddleware: {
        writeToDisk: true,
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },

      },

    },
  }
}

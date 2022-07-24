require('process');
  const path = require('path');
  const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
  const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
  module.exports = {
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      port: 3000,
      historyApiFallback: true
    },
    webpack: {
      plugins: {
        add: [
          new webpack.ProvidePlugin({
            process: 'process/browser'
          })
        ]
      },
      configure: (config) => {
        // Remove guard against importing modules outside of `src`.
        // Needed for workspace projects.
        config.resolve.plugins = config.resolve.plugins.filter(
          (plugin) => !(plugin instanceof ModuleScopePlugin)
        );
        // Add support for importing workspace projects.
        config.resolve.plugins.push(
          new TsConfigPathsPlugin({
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.cjs'],
            mainFields: ['module', 'main'],
          })
        );

        config.resolve.extensions = ['.ts', '.tsx', '.js', '.cjs'];

        config.resolve.fallback = {
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify")
        }

        config.module.rules.push(
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(png|svg|jpe?g|gif)$/i,
            loader: 'file-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.m?js/,
            type: "javascript/auto",
          },
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /favicon\.ico$/,
            loader: 'url-loader',
          }
        );

        // Replace include option for babel loader with exclude
        // so babel will handle workspace projects as well.
        config.module.rules[1].oneOf.forEach((r) => {
          if (r.loader && r.loader.indexOf('babel') !== -1) {
            r.exclude = /node_modules/;
            delete r.include;
          }
        });
        return config;
      },
    },
    jest: {
      configure: (config) => {
        config.resolver = '@nrwl/jest/plugins/resolver';
        return config;
      },
    },
  };

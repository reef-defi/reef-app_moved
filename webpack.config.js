const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ProvidePlugin} = require('webpack');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  // target: 'node',
  entry: path.join(__dirname, "src", "index.tsx"),

  output: {
    path:path.resolve(__dirname, "public"),
  },
  
  module: {
    rules: [
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /favicon\.ico$/,
        loader: 'url-loader',
      },
    ]
  },
  // externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
    }
  },
  
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico")
    }),
    new ProvidePlugin({
      process: 'process/browser'
    })
  ],
}
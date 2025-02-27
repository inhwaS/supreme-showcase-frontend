const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Import webpack for using ProvidePlugin
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: './dist', // Webpack serves content from memory in development mode
    hot: true,        // Enable Hot Module Replacement
    historyApiFallback: true,  // Ensure client-side routing works with React Router
    port: 8080,       // Port to run the dev server
    open: true,       // Open the browser automatically
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // This will create an `index.html` in the dist folder dynamically
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Polyfill `process` for the browser
    }),
    new Dotenv() // This will automatically load the variables from your .env file
  ],
};

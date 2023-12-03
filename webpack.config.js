const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
     '.js': ['.js', '.ts'],
     '.cjs': ['.cjs', '.cts'],
     '.mjs': ['.mjs', '.mts']
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.([cm]?ts)$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
  })],
};

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/swm.js',
  output: {
    filename: 'swm.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'SWM',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    clean: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'swm.css'
    })
  ]
};
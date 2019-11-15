const path = require('path');

module.exports = {
  entry: {
    'layout': './src/assets/javascripts/layout.jsx',
    'index': './src/assets/javascripts/index.jsx',
    'edit': './src/assets/javascripts/edit.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js/'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    writeToDisk: true,
    host: 'localhost'
  }
};

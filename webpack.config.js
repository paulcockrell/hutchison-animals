const path = require('path');

module.exports = {
  entry: './src/assets/javascripts/app.jsx',
  output: {
    filename: 'app.js',
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

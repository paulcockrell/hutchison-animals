const path = require('path');

module.exports = {
  entry: {
    'layout': './src/assets/javascripts/layout.jsx',
    'index': './src/assets/javascripts/index.jsx',
    'manage_animals': './src/assets/javascripts/manage_animals.jsx',
    'manage_groups': './src/assets/javascripts/manage_groups.jsx',
    'manage_breeds': './src/assets/javascripts/manage_breeds.jsx',
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

const path = require('path');

module.exports = {
  entry: {
    'layout': './src/assets/javascripts/layout.jsx',
    'index': './src/assets/javascripts/index.jsx',
    'manage_animals': './src/assets/javascripts/manage_animals.jsx',
    'show_animal': './src/assets/javascripts/show_animal.jsx',
    'manage_groups': './src/assets/javascripts/manage_groups.jsx',
    'show_group': './src/assets/javascripts/show_group.jsx',
    'manage_breeds': './src/assets/javascripts/manage_breeds.jsx',
    'show_breed': './src/assets/javascripts/show_breed.jsx',
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

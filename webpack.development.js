module.exports = {
  entry: "./example/index.js",

  output: {
    filename: "./build/bundle.js",
  },

  resolve: {
    extensions: ["", ".js"]
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
};


module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "./dist/woof.min.js",
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


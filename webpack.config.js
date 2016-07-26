module.exports = {
  entry: "./example/index.js",

  output: {
    filename: "./dist/bundle.js",
  },

  resolve: {
    extensions: ["", ".ts", ".js"]
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loader: "ts-loader"
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
};

const path = require("path");

module.exports = {
  entry: { index_transfomed: "./src/index.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "src"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react", "@babel/preset-env"] },
        },
      },
    ],
  },
};

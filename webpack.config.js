const path = require("path");
const MiniCssPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function (env) {
  return {
    mode: env.production ? "production" : "development",
    entry: { index_transfomed: "./src/index.js" },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, env.production ? "dist" : "src"),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
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
        {
          test: /\.[sc]?css$/,
          include: /src/,
          use: [MiniCssPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new BundleAnalyzerPlugin(),
    ],
  };
};

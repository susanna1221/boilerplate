const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "./[name]_bundle.js",
  },
  resolve: {
    alias: {
      Stylesheets: path.resolve(__dirname, "./public/stylesheets"),
      Images: path.resolve(__dirname, "./public/images"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      inject: true,
      filename: path.resolve(__dirname, "./dist/index.html"),
    }),
  ],
  devServer: {
    port: 9000,
    hot: true,
  },
};

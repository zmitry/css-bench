const webpack = require("webpack");
const path = require("path");

const dev = process.env.NODE_ENV === "development";

module.exports = {
  mode: dev ? "development" : "production",
  target: "web",
  devtool: "source-map",
  entry: {
    app: "./src"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  optimization: { noEmitOnErrors: true },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: false,
    publicPath: "/dist/",
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    before(app) {
      const express = require("express");

      app.use("/production/dist", express.static("./dist"));
      app.use("/production", express.static("./public/production.html"));
    }
  }
};

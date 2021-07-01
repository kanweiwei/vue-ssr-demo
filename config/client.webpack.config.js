/**
 *
 */
const { merge } = require("webpack-merge");
const baseConfig = require("./base.webpack.config");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = merge(baseConfig, {
  entry: {
    app: "./src/entry-client.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true,
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "manifest",
      minChunks: Infinity,
    },
  },
  // 该插件会在生成 vue-ssr-client-manifest.json 文件
  plugins: [new VueSSRClientPlugin()],
});

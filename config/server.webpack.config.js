const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./base.webpack.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
    entry: "./src/entry-server.js",
    target: "node",
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    // 不打包 node_modules 第三方包，直接使用 require 加载
    externals: [nodeExternals({
        allowlist: [/\.css$/]
    })],
    plugins: [
        // 输出文件构建成一个 json 文件
        // vue-ssr-server-bundle.json
        new VueSSRServerPlugin()
    ]
})
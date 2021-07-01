const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

module.exports = (server, cb) => {
  let ready;
  const onReady = new Promise((r) => (ready = r));

  // 监视构建 -> 更新 renderer
  let template;
  let serverBundle;
  let clientManifest;

  const update = () => {
    if (template && serverBundle && clientManifest) {
      cb({ serverBundle, template, clientManifest });
      ready();
    }
  };

  // 监视 template
  const templatePath = path.resolve(__dirname, "../index.template.html");
  template = fs.readFileSync(templatePath, "utf-8");
  // fs.watch fs.watchFile
  // chokidar
  chokidar.watch(templatePath).on("change", () => {
    template = fs.readFileSync(templatePath, "utf-8");
    update();
  });

  // 监视 serverBundle
  const serverConfig = require("../config/server.webpack.config");
  const serverCompiler = webpack(serverConfig);

  const instance = devMiddleware(serverCompiler, {
    logLevel: "silent", // 关闭日志输出
  });

  serverCompiler.hooks.done.tap("server-build", () => {
    serverBundle = JSON.parse(
      instance.fileSystem.readFileSync(
        path.resolve(__dirname, "../dist/vue-ssr-server-bundle.json"),
        "utf-8"
      )
    );
    update();
  });

  // 监视 clientManifest
  const clientConfig = require("../config/client.webpack.config");

  clientConfig.entry.app = [
    "webpack-hot-middleware/client",
    clientConfig.entry.app,
  ]; // 热更新注入脚本
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.output.filename = "[name].js";

  const clientCompiler = webpack(clientConfig);

  const clientInstance = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: "silent", // 关闭日志输出
  });

  server.use(
    hotMiddleware(clientCompiler, {
      log: false,
    })
  );
  // 静态资源在内存中
  server.use(clientInstance);

  clientCompiler.hooks.done.tap("client-build", () => {
    clientManifest = JSON.parse(
      clientInstance.fileSystem.readFileSync(
        path.resolve(__dirname, "../dist/vue-ssr-client-manifest.json"),
        "utf-8"
      )
    );
    update();
  });

  update();

  return onReady;
};

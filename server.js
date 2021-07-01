const Vue = require("vue");
const express = require("express");
const fs = require("fs");
const setupDevServer = require("./scripts/setupDevServer");

const { createBundleRenderer } = require("vue-server-renderer");

const isProd = process.env.NODE_ENV === "production";

const server = express();

server.use("/dist", express.static("dist"));

let renderder;
let onReady;
if (isProd) {
  const template = fs.readFileSync("./index.template.html", "utf-8");

  const serverBundle = require("./dist/vue-ssr-server-bundle.json");
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");

  renderder = createBundleRenderer(serverBundle, {
    template,
    runInNewContext: false,
    clientManifest,
  });
} else {
  // 开发模式 监视打包
  onReady = setupDevServer(
    server,
    ({ serverBundle, template, clientManifest }) => {
      renderder = createBundleRenderer(serverBundle, {
        template,
        runInNewContext: false,
        clientManifest,
      });
    }
  );
}

const render = (req, res) => {
  const context = {
    url: req.url,
    title: "Vue SSR Demo",
    meta: `
  <meta name="description" content="vue,ssr" >
  `,
  };
  renderder.renderToString(context, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).end("Internal server error");
      return;
    }
    res.end(html);
  });
};

server.get(
  "*",
  isProd
    ? render
    : async (req, res) => {
        // 等待有了 renderer 渲染器后，才调用 render 来渲染
        await onReady;
        render(req, res);
      }
);

server.listen(8000, () => {
  console.log("server running");
});

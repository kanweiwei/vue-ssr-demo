const Vue = require("vue");
const express = require("express");
const fs = require("fs");

const { createBundleRenderer } = require("vue-server-renderer");
const template = fs.readFileSync("./index.template.html", "utf-8");

const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderder = createBundleRenderer(serverBundle, {
  template,
  runInNewContext: false,
  clientManifest,
});

const server = express();

server.use("/dist", express.static("dist"));

server.get("/", (req, res) => {
  const context = {
    url: req.url,
    title: "Vue SSR Demo",
    meta: `
  <meta name="description" content="vue,ssr" >
  `,
  };
  renderder.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end("Internal server error");
      return;
    }
    res.end(html);
  });
});

server.listen(8000, () => {
  console.log("server running");
});

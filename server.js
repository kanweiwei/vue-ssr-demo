const Vue = require("vue");
const express = require("express");
const fs = require("fs");

const renderder = require("vue-server-renderer").createRenderer({
  template: fs.readFileSync("./index.template.html", "utf-8"),
});

const server = express();

server.get("/", (req, res) => {
  const app = new Vue({
    template: `
              <div id="app">
                  <h1>{{ message }}</h1>
              </div>
          `,
    data: {
      message: "你好 世界",
    },
  });

  renderder.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("Internal server error");
      return;
    }
    res.setHeader("content-type", "text/html;charset=utf8");
    res.end(html);
  });
});

server.listen(8000, () => {
  console.log("server running");
});

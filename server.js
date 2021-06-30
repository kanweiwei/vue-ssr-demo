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
                  <h2>交互</h2>
                  <div>
                    <input v-model="message" />
                  </div>
                  <div>
                    <button @click="onclick">点击测试</button>
                  </div>
              </div>
          `,
    data: {
      message: "你好 世界",
    },
    methods: {
      onclick() {
        console.log("点击了");
      },
    },
  });

  renderder.renderToString(
    app,
    {
      title: "Vue SSR Demo",
      meta: `
      <meta name="description" content="vue,ssr" >
      `,
    },
    (err, html) => {
      if (err) {
        res.status(500).end("Internal server error");
        return;
      }
      res.setHeader("content-type", "text/html;charset=utf8");
      res.end(html);
    }
  );
});

server.listen(8000, () => {
  console.log("server running");
});

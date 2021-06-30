const Vue = require("vue");
const renderder = require("vue-server-renderer").createRenderer();

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
    return;
  }
  console.log(html);
});

import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import VueMeta from "vue-meta";

Vue.use(VueMeta);
Vue.mixin({
  metaInfo: {
    titleTemplate: "%s - LG",
  },
});

/**
 * 导出工厂函数，用于创建新的应用程序
 * @returns
 */
export function createApp() {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    // 渲染 App.vue
    render: (h) => h(App),
  });
  return { app, router, store };
}

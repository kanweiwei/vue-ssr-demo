import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

/**
 * 导出工厂函数，用于创建新的应用程序
 * @returns
 */
export function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    // 渲染 App.vue
    render: (h) => h(App),
  });
  return { app, router };
}

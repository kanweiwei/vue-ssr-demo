import Vue from "vue";
import App from "./App.vue";

/**
 * 导出工厂函数，用于创建新的应用程序
 * @returns
 */
export function createApp() {
  const app = new Vue({
    // 渲染 App.vue
    render: (h) => h(App),
  });
  return { app };
}

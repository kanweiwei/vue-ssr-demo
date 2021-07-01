/**
 *  客户端入口
 */
import { createApp } from "./app";

const { app, router } = createApp();

router.onReady(() => {
  app.$mount("#app");
});

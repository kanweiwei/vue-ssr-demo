/**
 * 服务端入口
 */
import { createApp } from "./app";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const meta = app.$meta();

    router.push(context.url);

    context.meta = meta;

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      context.rendered = () => {
        context.state = store.state;
      };

      resolve(app);
    }, reject);
  });
};

<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <h2>交互</h2>
    <div>
      <input v-model="message" />
    </div>
    <div>
      <button @click="onclick">点击测试</button>
    </div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return { message: "你好 世界" };
  },
  methods: {
    onclick() {
      console.log("点击了");
    },
  },
};
</script>

<style>
</style>
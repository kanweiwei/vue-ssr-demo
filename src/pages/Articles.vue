<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.slug">
        <span>{{ article.title }} {{ article.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "articles",
  computed: {
    ...mapState(["articles"]),
  },
  // Vue SSR 为服务端渲染提供的生命周期函数
  serverPrefetch() {
    return this.getArticles();
  },
  methods: {
    ...mapActions(["getArticles"]),
  },
};
</script>

<style>
</style>
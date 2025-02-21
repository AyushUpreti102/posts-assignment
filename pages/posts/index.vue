<template>
  <div class="px-5">
    <div v-for="post in posts" :key="post.id">
      <router-link :to="{ path: `/posts/${post.id}` }">
        <post-card :post="post" />
      </router-link>
    </div>
    <app-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="currentPage = $event"
    />
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore();
const { posts, currentPage, totalPages, totalPosts } = storeToRefs(postStore);

useHead({
  title: "Posts",
  meta: [{ name: "description", content: "Posts page showing all the posts" }],
});

postStore.fetchPosts();
</script>

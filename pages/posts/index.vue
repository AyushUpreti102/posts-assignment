<template>
  <div class="px-5">
    <div v-for="post in posts" :key="post.id">
      <router-link :to="{ path: `/posts/${post.id}` }">
        <post-card :post="post" />
      </router-link>
    </div>
    <div class="m-4">
      <app-pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :chunk="limit"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore();
const { posts, currentPage, totalPages, limit } = storeToRefs(postStore);

const router = useRouter();
const route = useRoute();

useHead({
  title: "Posts",
  meta: [{ name: "description", content: "Posts page showing all the posts" }],
});

const handlePageChange = (page: number) => {
  router.push({ query: { page } });
};

watch(
  () => route.query,
  (query) => {
    if (query.page) {
      currentPage.value = Number(query.page);
    }
    postStore.fetchPosts(currentPage.value);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="container mx-auto max-w-3xl py-10">
    <router-link
      to="/"
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
    >
      <MdiIcon icon="mdiArrowLeft" class="mr-2 text-xl" />
      <span>Back to Posts</span>
    </router-link>

    <div class="rounded-lg bg-white shadow-lg">
      <div class="px-6 py-4">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ currentPost?.title }}
        </h1>
      </div>

      <div class="mx-4 px-6 py-4 bg-gray-100 rounded-lg">
        <p class="text-gray-800 leading-relaxed">
          {{ currentPost?.body }}
        </p>
      </div>

      <div
        class="h-12 mt-4 px-5 flex gap-5 bg-gradient-to-r from-[#FF2760] to-[#8F00FF] rounded-b-lg"
      >
        <button
          class="flex justify-center items-center gap-2 text-white font-medium"
        >
          <MdiIcon icon="mdiThumbUpOutline" class="text-xl" />
          <span>{{ currentPost?.reactions.likes }}</span>
        </button>
        <button
          class="flex justify-center items-center gap-2 text-white font-medium"
        >
          <MdiIcon icon="mdiThumbDownOutline" class="text-xl" />
          <span>{{ currentPost?.reactions.dislikes }}</span>
        </button>
        <button
          class="flex justify-center items-center gap-2 text-white font-medium"
        >
          <MdiIcon icon="mdiEyeCircle" class="text-xl" />
          <span>{{ currentPost?.views }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const postId = route.params.id as string;

const postStore = usePostStore();
const { currentPost } = storeToRefs(postStore);

postStore.fetchCurrentPost(postId).then(() => {
  useHead({
    title: `${currentPost.value?.title}`,
    meta: [{ name: "description", content: `${currentPost.value?.body}` }],
  });
});

onBeforeUnmount(() => {
  currentPost.value = null;
});
</script>

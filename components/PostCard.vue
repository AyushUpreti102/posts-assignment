<template>
  <div class="rounded-lg shadow-lg bg-white mt-6">
    <div class="px-5">
      <div class="pt-6">
        <span class="font-semibold text-xl">Topic - {{ post.title }}</span>
      </div>
      <div class="flex flex-wrap gap-x-4 my-2">
        <div
          class="bg-slate-100 p-2 rounded-2xl"
          v-for="tag in post.tags"
          :key="tag"
        >
          #{{ tag }}
        </div>
      </div>
      <div class="mt-5 bg-[#f2efef] rounded-lg py-4 px-6">
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div
      class="h-12 mt-4 grid grid-cols-3 bg-gradient-to-r from-[#FF2760] to-[#8F00FF] rounded-b-lg"
    >
      <button class="flex justify-center text-white items-center gap-3">
        <MdiIcon icon="mdiThumbUpOutline" class="text-xl" />
        <span>{{ post.reactions.likes }}</span>
      </button>
      <button class="flex justify-center text-white items-center gap-3">
        <MdiIcon icon="mdiThumbDownOutline" class="text-xl" />
        <span>
          {{ post.reactions.dislikes }}
        </span>
      </button>
      <button class="flex justify-center text-white items-center gap-3">
        <MdiIcon icon="mdiEyeCircle" class="text-xl" />
        <span>{{ post.views }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  post: Post;
}>();
</script>

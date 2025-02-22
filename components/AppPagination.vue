<template>
  <nav class="flex items-center justify-center space-x-2">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
    >
      Prev
    </button>

    <ul
      v-for="page in pages"
      :key="page"
      @click="changePage(Number(page))"
      class="px-3 py-1 rounded-md"
      :class="page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'"
    >
      <li>
        {{ page }}
      </li>
    </ul>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
  chunk: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", value: number): void;
}>();

const paginate = (current_page: number, last_page: number) => {
  let pages = [];
  for (let i = 1; i <= last_page; i++) {
    let offset = 1;
    if (
      i === 1 ||
      (current_page - offset <= i && current_page + offset >= i) ||
      i === current_page ||
      i === last_page
    ) {
      pages.push(i);
    } else if (
      i === current_page - (offset + 1) ||
      i === current_page + (offset + 1)
    ) {
      pages.push("...");
    }
  }
  return pages;
};

const pages = computed(() => paginate(props.currentPage, props.totalPages));

// Change page function
const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page);
  }
};
</script>

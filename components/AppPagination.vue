<template>
  <nav class="flex items-center justify-center space-x-2">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
    >
      Prev
    </button>

    <!-- First Page -->
    <button
      v-if="shouldShowFirst"
      @click="changePage(1)"
      class="px-3 py-1 bg-gray-200 rounded-md"
    >
      1
    </button>

    <!-- Left Ellipsis -->
    <span v-if="shouldShowLeftDots" class="px-3 py-1">...</span>

    <!-- Middle Pages -->
    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      class="px-3 py-1 rounded-md"
      :class="page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'"
    >
      {{ page }}
    </button>

    <!-- Right Ellipsis -->
    <span v-if="shouldShowRightDots" class="px-3 py-1">...</span>

    <!-- Last Page -->
    <button
      v-if="shouldShowLast"
      @click="changePage(totalPages)"
      class="px-3 py-1 bg-gray-200 rounded-md"
    >
      {{ totalPages }}
    </button>

    <!-- Next Button -->
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
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", value: number): void;
}>();

// Change page function
const changePage = (page: number) => {
  console.log("change page");
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page);
  }
};

// Logic to display pagination numbers with "..."
const pages = computed(() => {
  const { totalPages, currentPage } = props;
  const visiblePages = 3; // Number of pages to show before & after current page

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let startPage = Math.max(2, currentPage - visiblePages);
  let endPage = Math.min(totalPages - 1, currentPage + visiblePages);

  if (currentPage <= 3) {
    endPage = 5;
  }
  if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

// Conditions for showing first page, last page, and ellipses
const shouldShowFirst = computed(
  () => props.totalPages > 5 && !pages.value.includes(1)
);
const shouldShowLast = computed(
  () => props.totalPages > 5 && !pages.value.includes(props.totalPages)
);
const shouldShowLeftDots = computed(
  () => shouldShowFirst.value && props.currentPage > 3
);
const shouldShowRightDots = computed(
  () => shouldShowLast.value && props.currentPage < props.totalPages - 2
);
</script>

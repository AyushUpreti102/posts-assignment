export const usePostStore = defineStore("post-store", () => {
  const posts = ref<Post[]>([]);
  const currentPage = ref(1);
  const totalPosts = ref(0);
  const limit = ref(10);
  const totalPages = computed(() => Math.ceil(totalPosts.value / limit.value));
  const currentPost = ref<Post | null>(null);

  const fetchPosts = async (page: number) => {
    try {
      const { data } = await useApiFetch<PostData>(
        `posts?limit=${limit.value}&skip=${(page - 1) * limit.value}`
      );

      posts.value = data.value?.posts || [];
      totalPosts.value = data.value?.total || 0;
    } catch (error) {
      console.log("error while fetching posts", error);
    }
  };

  const fetchCurrentPost = async (id: string) => {
    const { data } = await useApiFetch<Post>(`posts/${id}`);

    currentPost.value = data.value;
  };

  return {
    posts,
    limit,
    totalPages,
    totalPosts,
    currentPage,
    currentPost,
    fetchPosts,
    fetchCurrentPost,
  };
});

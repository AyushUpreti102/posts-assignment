export const usePostStore = defineStore("post-store", () => {
  const posts = ref<Post[]>([]);
  const currentPage = ref(1);
  const totalPosts = ref(0);
  const totalPages = computed(() => totalPosts.value / 10);
  const currentPost = ref<Post | null>(null);

  const fetchPosts = async () => {
    try {
      const { data } = await useFetch<PostData>("https://dummyjson.com/posts");
      posts.value = data.value?.posts || [];
      totalPosts.value = data.value?.total || 0;
    } catch (error) {
      console.log("error while fetching posts", error);
    }
  };

  const fetchCurrentPost = async (id: string) => {
    const { data } = await useFetch<Post>(`https://dummyjson.com/posts/${id}`);
    currentPost.value = data.value;
  };

  return {
    posts,
    totalPages,
    totalPosts,
    currentPage,
    currentPost,
    fetchPosts,
    fetchCurrentPost,
  };
});

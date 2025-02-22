export const useApiFetch = async <T>(endpoint: string) => {
  const nuxt = useNuxtApp();

  return await useFetch<T & { fetchedAt: Date }>(endpoint, {
    baseURL: "https://dummyjson.com/",
    transform: (input) => {
      return {
        ...input,
        fetchedAt: new Date(),
      };
    },
    getCachedData: (key) => {
      const data = nuxt.payload.data[key] || nuxt.static.data[key];
      if (!data) {
        return;
      }

      const fetchedAt = data.fetchedAt.getTime();
      const expirationTime = 15 * 60 * 1000;
      const currentTime = Date.now();
      const isExpired = currentTime - fetchedAt > expirationTime;

      if (isExpired) {
        return;
      }

      return data;
    },
  });
};

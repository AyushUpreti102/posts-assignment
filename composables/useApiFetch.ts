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

      const expirationDate = new Date(data.fetchedAt);
      expirationDate.setTime(expirationDate.getTime() * 1000);
      const isExpired = expirationDate.getTime() < Date.now();

      console.log(isExpired, key);
      if (isExpired) {
        return;
      }

      return data;
    },
  });
};

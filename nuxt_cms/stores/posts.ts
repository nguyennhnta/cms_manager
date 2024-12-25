export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[], 
    loading: false, 
    error: null as string | null,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.get('/posts')
        this.posts = response.data || [];
      } catch (err) {
        this.error = 'Failed to fetch posts';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});

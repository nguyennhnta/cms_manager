


export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[], // Danh sách bài viết
    loading: false, // Trạng thái tải dữ liệu
    error: null as string | null, // Trạng thái lỗi
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        // const { data } = await $axios.get('/api/posts');\
        const { $axios } = useNuxtApp()
        // const token = useCookie('token').value; 
        // const { data }: any = await useFetch('http://localhost:8080/api/posts', {
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         Authorization: `Bearer ${token}`,
        //       },
        //   });
        const response = await $axios.get('/posts')
        // this.$patch({
        //     thi = response.data
        // })

     
        console.log(response.data);
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

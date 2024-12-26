
export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[], 
    loading: false, 
    error: null as string | null,
  }),
  getters: {
    axiosInstance(): any {
      const { $axios } = useNuxtApp();
      return $axios;
    }
  },
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.axiosInstance.get('/posts')
        this.posts = response.data || [];
      } catch (err) {
        this.error = 'Failed to fetch posts';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addPost(newPost: { title: string; content: string;}) {
      try {
        const { data } = await this.axiosInstance.post("/api/posts", newPost);
        this.posts.push(data); 
      } catch (error: any) {
        this.error = error.response?.data?.message || "Lỗi thêm bài viết";
      }
    },

    async updatePost(updatedPost: { id: number; title: string; content: string }) {
      try {
        // const { $axios } = useNuxtApp();
        await this.axiosInstance.put(`/api/posts/${updatedPost.id}`, updatedPost);
        const index = this.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || "Lỗi cập nhật bài viết";
      }
    },
    
    async deletePost(postId: number) {
      try {
        // const { $axios } = useNuxtApp();
        await this.axiosInstance.delete(`/api/posts/${postId}`);
        this.posts = this.posts.filter((post) => post.id !== postId);
      } catch (error: any) {
        this.error = error.response?.data?.message || "Lỗi xóa bài viết";
      }
    },
  },
});

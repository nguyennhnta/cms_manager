import * as product from '~/models/products/types';


type State = {
  products: product.ProductsList;
  loading: boolean;
  error: string | null;
};
export const useProductstore = defineStore('products', {
  state: (): State => ({
    products: {
      current_page: '',
      data: [
        {
          id: 0,
          name: '',
          status: '',
          description: '',
          price: 0,
          quantity: 1,
          created_at: '',
        }
      ],
      first_page_url: '',
      from: 1,
      last_page: 1,
      last_page_url: '',
      link: [],
      next_page_url: '',
      path: '',
      per_page: 0,
      prev_page_url: '',
      to: 0,
      total: 0,
    },
    loading: false,
    error: null,
  }),
  getters: {
    axiosInstance(): any {
      const { $axios } = useNuxtApp();
      return $axios;
    }
  },
  actions: {
    async fetchProducts( page : number ,perPage : number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.axiosInstance.get('/products' ,{
          params: {
            per_page: perPage,
            page: page
          }
        });
        this.products = response.data || [];
      } catch (err) {
        this.error = 'Failed to fetch products';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addProduct(product: product.Product) {
      try {
        const { data } = await this.axiosInstance.post("/products", product);
        if(data)
        {
          this.products?.data.push(data); 
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || "Error product";
      }
    },

    // async updateProduct(product: { name: string, price: string, description: string, quantity: string }) {
    //   try {
    //     await this.axiosInstance.put(`/api/product/${product.id}`, product);
    //     const index = this.products.findIndex((post) => post.id === updatedPost.id);
    //     if (index !== -1) {
    //       this.products[index] = updatedPost;
    //     }
    //   } catch (error: any) {
    //     this.error = error.response?.data?.message || "Error update Product";
    //   }
    // },
    
    async deleteProductt(postId: number) {
      try {
        await this.axiosInstance.delete(`/api/product/${postId}`);
        this.products = this.products.filter((post) => post.id !== postId);
      } catch (error: any) {
        this.error = error.response?.data?.message || "Error delete Product";
      }
    },
  },
});

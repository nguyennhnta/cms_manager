import * as product from '~/models/products/types';


type State = {
  products: product.ProductsList;
  product: product.Product;
  loading: boolean;
  error: string | null;
  message: string | null; 
}
export const useProductstore = defineStore('products', {
  state: (): State => ({
    products: {
      current_page: '',
      data: [
        {
          id: 1,
          name: '',
          status: '',
          description: '',
          price: null,
          quantity: null,
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
      per_page: 1,
      prev_page_url: '',
      to: 1,
      total: 1,
    },
    product: {
      id: 1,
      name: '',
      status: '',
      description: '',
      price: null,
      quantity: null,
      created_at: '',
    }, 
    loading: false,
    error: null,
    message: null,
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
      this.message = null; 
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

    async showProduct(id : number) {
      this.loading = true;
      this.message = null;
      try {
        const response = await this.axiosInstance.get(`/products/${id}`)
        this.product = response.data;
      } catch (error) {
        this.error = 'Failed to show product'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addProduct(product: product.Product) {
      this.message = null;
      this.error = null;
      try {
        const { data } = await this.axiosInstance.post("/products", product);
        if(data)
        {
          this.products?.data.unshift(data);
          this.message = "Product added successfully";
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || "Error product";
      }
    },

    async updateProduct(productId : number, updatedProduct : product.Product) {
      this.loading = true;
      this.message = null;
      this.error = null;
      try {
        const response = await this.axiosInstance.put(`/products/${productId}`, updatedProduct);
        if(response) {
          this.product = response.data;
          this.message = "Product updated successfully"; 
          return response;
        }
      } catch (error) {
        console.error('Failed to update product:', error)
        this.error = 'Failed to update product'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteProduct(product: product.Product) {
      try {
        const response = await this.axiosInstance.delete(`/products/${product.id}`);
        if (response.status === 200) {
          this.message = `Product ${product.name} deleted successfully.`;
          return response;
        }
      } catch (error: any) {
        console.error('Failed to delete product:', error);
        this.error = error.response?.data?.message || "Error deleting product";
      }
    },
  },
});

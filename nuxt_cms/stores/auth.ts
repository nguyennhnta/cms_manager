


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token').value || null, // Initialize with cookie value if available
    authenticated: false,
    user: {
      name: '',
      email: '',
      avatar: '',
    },
    message: '',
  }),
  actions: {
    setUser(user :any) {
      try {
        this.user = user;
        if (user && typeof user === 'object') {
          useCookie('user').value = JSON.stringify(user); // Lưu vào cookie dưới dạng chuỗi JSON
        }
      } catch (error) {
        console.error('Lỗi khi lưu user vào cookie:', error);
      }
    },

    setToken(token : any) {
      this.token = token;
      const cookie = useCookie('token');
      cookie.value = token;
      this.authenticated = true;
    },

    logout() {
      this.token = null;
      this.authenticated = false;
      this.user = {
        name: '',
        email: '',
        avatar: ''
      };
      useCookie('token').value = null; // Xóa token cookie
      useCookie('user').value = null; // Xóa user cookie
    },
    setMessage( message : string){
      this.message = this.message;
    },

    loadFromCookies() {
      const token = useCookie('token').value;
      const user: any = useCookie('user').value; // Change here
      if (token) {
        this.token = token;
        this.authenticated = true;
      }

      if (user) {
      try {
          this.user = user;
        } catch (error) {
          console.error('Lỗi khi phân tích dữ liệu user từ cookie:', error);
          this.user = {name: '',
            email: '',
            avatar: '',}; 
        }
      }
    },
  },
});

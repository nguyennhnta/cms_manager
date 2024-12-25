


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token').value || null, // Initialize with cookie value if available
    authenticated: false,
  }),
  actions: {
    setToken(token : any) {
      this.token = token;
      const cookie = useCookie('token');
      cookie.value = token;
      this.authenticated = true;
    },
    logout() {
      this.token = null;
      const cookie = useCookie('token');
      cookie.value = null;
      this.authenticated = false;
    },
  },
});

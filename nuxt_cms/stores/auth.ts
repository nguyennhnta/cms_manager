

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): {
    authenticated: boolean;
    loading: boolean;
  } => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('http://localhost:8080/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
        // credentials: 'include',
      });
      this.loading = pending;
      // console.log(data.value);
      if (data.value) {
        const token = useCookie('token'); 
        const expires_at = useCookie('expires_at'); 
        token.value = data.value.access_token; // set token to cookie
        expires_at.value = data.value.expires_at;
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {

      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});


// interface UserPayloadInterface {
//   email: string;
//   password: string;
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): {
//     authenticated: boolean;
//     loading: boolean;
//     roles: string[]; 
//     permissions: string[];
//   } => ({
//     authenticated: false,
//     loading: false,
//     roles: [],
//     permissions: [],
//   }),
//   actions: {
//     async authenticateUser({ email, password }: UserPayloadInterface) {
//       const { data, pending }: any = await useFetch('http://localhost:8080/api/login', {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: {
//           email,
//           password,
//         },
//       });
//       this.loading = pending;
//       if (data.value) {
//         const token = useCookie('token'); 
//         const expires_at = useCookie('expires_at'); 
//         token.value = data.value.access_token; 
//         expires_at.value = data.value.expires_at;
//         this.authenticated = true; // set authenticated  state value to true

//          // Get role and permission from API
//         //  console.log(token.value);
//          const rolesAndPermissions = await this.fetchRolesAndPermissions(token.value);
//         this.roles = rolesAndPermissions.roles;
//         this.permissions = rolesAndPermissions.permissions;

//       }
//     },
//     async fetchRolesAndPermissions(token : any) {
//       const { $axios } = useNuxtApp()
//       const { data } : any = await $axios.get('get_user_role');

//       // Kiểm tra xem data có chứa các giá trị cần thiết hay không
//       return data || { roles: [], permissions: [] };
//     },
//     logUserOut() {

//       const token = useCookie('token'); // useCookie new hook in nuxt 3
//       this.authenticated = false; // set authenticated  state value to false
//       token.value = null; // clear the token cookie
//       this.roles = [];
//       this.permissions = [];
//     },
//   },
// });


// stores/auth.js

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

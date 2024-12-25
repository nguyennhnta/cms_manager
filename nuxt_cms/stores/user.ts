export const useUserStore = defineStore('user', {
    state: () => ({
      roles: [],
      permissions: [],
    }),
    actions: {
      async fetchRolesAndPermissions(token : any) {
        const { $axios } = useNuxtApp();
        const { data } = await $axios.get('get_user_role', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Ensure roles and permissions are set correctly
        this.roles = data.roles || [];
        this.permissions = data.permissions || [];
      },
    },
  });
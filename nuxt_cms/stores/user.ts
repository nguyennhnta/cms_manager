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
      
      this.roles = data.roles || [];
      this.permissions = data.permissions || [];
    },

    async fetchUserInfo(token: any) {
      const { $axios } = useNuxtApp();
      const { data } = await $axios.get('user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return  data || null;
    },
  },
});

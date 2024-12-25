import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

export const useAuthActions = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const authenticateUser = async ({ email, password } : any) => {
    const { data, pending } = await useFetch('http://localhost:8080/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
    });

    authStore.authenticated = pending;
    if (data.value) {
      authStore.setToken(data.value.access_token);
      await userStore.fetchRolesAndPermissions(data.value.access_token);
    }
  };

  return {
    authenticateUser,
  };
};

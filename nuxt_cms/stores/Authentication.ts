import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

interface User {
    email: string;
    password: string;
}
interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}
  
export const useAuthActions = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  const authenticateUser = async ({ email, password } : User) => {
    const { data } = await useFetch<LoginResponse>('http://localhost:8080/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
    });

    // authStore.authenticated = true;
    if (data.value && data.value.access_token) {
      authStore.setToken(data.value.access_token);
      await userStore.fetchRolesAndPermissions(data.value.access_token);
    }
  };

  return {
    authenticateUser,
  };
};

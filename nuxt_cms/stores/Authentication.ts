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
interface GoogleUrl
{
  url : string;
}

interface RegisterUser{
  firstName : string;
  lastName : string;
  email : string;
  password: string;
}
interface RegisterResponse{
  token: string;
  message: string;
}
export const useAuthActions = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const runtimeConfig = useRuntimeConfig(); // Lấy config từ Nuxt

  const registerUser = async ({ firstName, lastName, email, password }: RegisterUser) => {
    const fullName = `${firstName} ${lastName}`;
    try {
      const { data } = await useFetch<RegisterResponse>(`${runtimeConfig.public.apiUrl}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { name: fullName, email, password },
      });

      if (data.value && data.value.token) {
        authStore.setToken(data.value.token);
        await userStore.fetchRolesAndPermissions(data.value.token);
        const user = await userStore.fetchUserInfo(data.value.token);
        authStore.setUser(user);
        return { success: true, message: 'Registration successful!' };
      }
    } catch (error) {
      console.error('Error during user registration:', error);
    }
  };

  const authenticateUser = async ({ email, password } : User) => {
    const { data } = await useFetch<LoginResponse>(`${runtimeConfig.public.apiUrl}/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password },
    });

    // authStore.authenticated = true;
    if (data.value && data.value.access_token) {
      authStore.setToken(data.value.access_token);
      await userStore.fetchRolesAndPermissions(data.value.access_token);
      const user = await userStore.fetchUserInfo(data.value.access_token);
      authStore.setUser(user);
    }
  };

  const authenticateUserGoogle = async () => {
    try {
        const { data } = await useFetch<GoogleUrl>(`${runtimeConfig.public.apiUrl}/auth/google`);
        if (data.value && data.value.url) {
          window.location.href = data.value.url;

        } else {
          console.error("No URL found in the response.");
        }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return {
    registerUser,
    authenticateUser,
    authenticateUserGoogle
  };
};

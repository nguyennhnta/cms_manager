// // middleware/auth.js

import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to : any) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies
  if (to.path === '/auth/google/callback/' || to.path === '/signup') {
    return;
  }

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authenticated.value = true; // Token hợp lệ
    // try {
      // const response = await fetch('http://localhost:8080/api/auth/check-token', {
      //     method: 'GET',
      //     headers: {
      //         Authorization: `Bearer ${token.value}`,
      //         'Content-Type': 'application/json',
      //     },
      // });

      // if (response.ok) {
      //     const data = await response.json();
      //     if (data.is_valid) {
      //         authenticated.value = true; // Token hợp lệ
      //     } else {
      //         authenticated.value = false;
      //         return navigateTo('/login'); // Token hết hạn
      //     }
      // } else {
      //     authenticated.value = false;
      //     return navigateTo('/login'); // Lỗi xác minh
      // }
      // } catch (error) {
      //     console.error('Error validating token:', error);
      //     authenticated.value = false;
      //     return navigateTo('/login'); // Lỗi mạng
      // }
  }
  
  

    // if (token.value) {
    //   const tokenExpiresAt = useCookie('expires_at');
    //   const currentTime = new Date();
    //   const expiresAt = tokenExpiresAt.value ? new Date(tokenExpiresAt.value) : null;
    //   console.log(currentTime);
    //   console.log(expiresAt);
    //     if (expiresAt && currentTime < expiresAt) {
    //         authenticated.value = true; // Token còn hạn
    //     } else {
    //         authenticated.value = false; // Token hết hạn
    //     }
    // }

  // if token exists and url is /login redirect to homepage
  if (authenticated.value && token.value && to?.name === 'login' ) {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!authenticated.value && !token.value && to?.name !== 'login' ) {
    abortNavigation();
    return navigateTo('/login');
  }
});
  
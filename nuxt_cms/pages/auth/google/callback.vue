<template>
    <div>
      <h1>Google Callback</h1>
    </div>
  </template>
  
  <script setup>
  import { onBeforeMount } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { useUserStore } from '~/stores/user';
  
  const authStore = useAuthStore();
  const userStore = useUserStore();
  
  const handleGoogleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); 
    const userId = urlParams.get('user_id');
    if (token && userId) {
      try {
        await authStore.setToken(token);
        const user = await userStore.fetchUserInfo(token);
        authStore.setUser(user);
        navigateTo('/');
      } catch (error) {
        console.error('Error during Google callback handling:', error);
        navigateTo('/login');
      }
    } else {
      console.error('Không tìm thấy token hoặc user_id trong URL');
      navigateTo('/login');
    }
  };
  onBeforeMount(() => {
    handleGoogleCallback();
  });
  </script>
  
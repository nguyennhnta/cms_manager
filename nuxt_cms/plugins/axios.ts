import axios from 'axios';

export default defineNuxtPlugin((nuxtApp : any) => {
  
  const runtimeConfig = useRuntimeConfig()
  const api = axios.create({
    baseURL: runtimeConfig.public.apiUrl, // URL cơ bản
  });

  api.interceptors.request.use((config) => {
    const token = useCookie('token').value; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = `application/json`;
      config.headers['Content-Type'] = `application/json`;
    }
    return config;
  });


  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigateTo('/login');
      }
      return Promise.reject(error);
    }
  );
//   nuxtApp.provide('axios', api);
    return {
        provide: { axios: api },
    }
});

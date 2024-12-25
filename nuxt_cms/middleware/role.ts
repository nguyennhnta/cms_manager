import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to : any, from : any) => {
     const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
     const auth = useAuthStore();
    if (authenticated.value == false && to?.name !== 'login') {
      return navigateTo('/login');
    }
  
    const requiredRole = to.meta.role;
    console.log(requiredRole);
    console.log(auth.roles);
    /* if (requiredRole && !auth.roles.includes(requiredRole)) {
      return navigateTo('/403'); // Trang "Access Denied"
    } */
  });
  
export default defineNuxtRouteMiddleware((to : any, from : any) => {
    const auth = useAuthStore();
  
    if (auth.authenticated == false && to?.name !== 'login' ) {
      return navigateTo('/login');
    }
  
    // Tìm permissions dựa trên đường dẫn
   // Gắn permission động dựa trên đường dẫn
   const pathPermissionMap: Record<string, string[]> = {
    '/admin': ['view_admin_dashboard', 'manage_users'],
    '/user/profile': ['view_profile'],
    '/user/settings': ['update_settings'],
  };

  // Tìm permissions dựa trên đường dẫn
      const permissions = Object.keys(pathPermissionMap).find((prefix) => to.path.startsWith(prefix))
        ? pathPermissionMap[to.path]
        : [];

      if (permissions.length > 0 && !permissions.every((permission) => auth.permissions.includes(permission))) {
        return navigateTo('/403'); // Không có quyền truy cập
      }
  });
  
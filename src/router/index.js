import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/layouts/MainLayout.vue';

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/Dashboard.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'users', name: 'user-list', component: () => import('@/views/dashboard/users/UserList.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'country', name: 'country', component: () => import('@/country/country.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'mappingMerchant', name: 'mappingMerchant', component: () => import('@/merchant/merchantMapping.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'merchant', name: 'merchant', component: () => import('@/merchant/merchant.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'merchantmapping', name: 'merchantmapping', component: () => import('@/merchant/merchantMapped.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'members', name: 'members', component: () => import('@/member/members.vue'), meta: { allowedRoles: ['admin', 'manager'] } },
      { path: 'transaction', name: 'transaction', component: () => import('@/merchant/transaction.vue'), meta: { allowedRoles: ['user'] } },
      { path: 'upload', name: 'upload', component: () => import('@/merchant/uploadMerchant.vue'), meta: { allowedRoles: ['user', 'admin', 'manager'] } },
      { path: 'listMerchant', name: 'listMerchant', component: () => import('@/merchant/listMerchant.vue'), meta: { allowedRoles: ['user', 'admin', 'manager'] } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

// Navigation guard with role-based access + auto logout
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   const role = (localStorage.getItem('role') || '').toLowerCase();
//   const expiry = Number(localStorage.getItem('tokenExpiry') || 0);
//   const now = new Date().getTime();

//   // Auto logout if token expired
//   if (token && expiry && now > expiry) {
//     localStorage.clear();
//     next({ name: 'login', query: { expired: 'true' } });
//     return;
//   }

//   const isLoggedIn = !!token;

//   // Redirect if route not found
//   if (!to.matched.length) {
//     next({ name: 'dashboard', query: { error: 'Route not found' } });
//     return;
//   }

//   // Redirect to login if not authenticated
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next({ name: 'login' });
//     return;
//   }

//   // Prevent accessing login if already logged in
//   if (to.name === 'login' && isLoggedIn) {
//     next({ name: 'dashboard' });
//     return;
//   }

//   // Role-based access
//   if (to.meta.requiresAuth && to.meta.allowedRoles && !to.meta.allowedRoles.includes(role)) {
//     next({ name: 'dashboard', query: { error: 'Unauthorized access' } });
//     return;
//   }

//   next();
// });

export default router;


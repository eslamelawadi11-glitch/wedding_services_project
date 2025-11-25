import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/:id',
      name: 'service-details',
      component: () => import('../views/ServiceDetailsView.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/vendor/VendorDashboardView.vue'),
      meta: { requiresAuth: true, requiresVendor: true }
    },
    {
      path: '/dashboard/services',
      name: 'vendor-services',
      component: () => import('../views/vendor/ServicesManagementView.vue'),
      meta: { requiresAuth: true, requiresVendor: true }
    },
    {
      path: '/dashboard/bookings',
      name: 'vendor-bookings',
      component: () => import('../views/vendor/BookingsView.vue'),
      meta: { requiresAuth: true, requiresVendor: true }
    },
    {
      path: '/dashboard/my-bookings',
      name: 'my-bookings',
      component: () => import('../views/user/MyBookingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/wishlist',
      name: 'wishlist',
      component: () => import('../views/user/WishlistView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/UsersManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/vendors',
      name: 'admin-vendors',
      component: () => import('../views/admin/VendorsManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/services',
      name: 'admin-services',
      component: () => import('../views/admin/ServicesManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/bookings',
      name: 'admin-bookings',
      component: () => import('../views/admin/BookingsManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'home' })
  } else if (to.meta.requiresVendor && !authStore.isVendor) {
    next({ name: 'home' })
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

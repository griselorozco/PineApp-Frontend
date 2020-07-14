import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/Index'),
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: () => import('@/views/home/Welcome'),
        },
      ],
    },
    {
      path: '/coments',
      component: () => import('@/views/coments/Index'),
      children: [
        {
          name: 'Comentarios',
          path: 'comentarios/:id',
          meta: { requiere_auth: true },
          component: () => import('@/views/coments/Comentarios'),
        },
      ],
    },
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/app',
      component: () => import('@/views/container/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/Dashboard'),
        },
        // Pages
        {
          name: 'RTL',
          path: 'pages/rtl',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/pages/Rtl'),
        },
        // Crear post
        {
          name: 'Create Post',
          path: 'pages/create_post/:id',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/pages/CreatePost'),
        },
        // Acerca de
        {
          name: 'About',
          path: 'pages/about',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/components/shared/About'),
        },
        // FAQs
        {
          name: 'Faqs',
          path: 'pages/faqs',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/faqs/Faqs'),
        },

        {
          name: 'Timeline',
          path: 'pages/timeline',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/pages/Timeline'),
        },
        // Usuario
        {
          name: 'User Profile',
          path: 'user/:id',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/usuario/UserProfile'),
        },
        {
          name: 'Editar Perfil',
          path: 'user/:id/edit',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/usuario/EditarPerfil'),
        },
        // Ajustes
        {
          name: 'Ajustes',
          path: 'ajustes',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/ajustes/Ajustes'),
        },
        // Estadisticas
        {
          name: 'Estadisticas',
          path: 'estadisticas',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/estadisticas/Estadisticas'),
        },
        // Estadisticas
        {
          name: 'Retirar fondos',
          path: 'retirarfondos',
          meta: { requiere_auth: true },
          component: () => import('@/views/container/retirar/RetirarFondos'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})

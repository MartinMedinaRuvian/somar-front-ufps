import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('@/views/LandingPage/LandingPageInicio.vue')
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import('@/views/LandingPage/LandingPageNosotros.vue')
  },
  {
    path: '/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('@/views/Usuario/UsuarioInicioSesion.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/views/Usuario/UsuarioRegistro.vue')
  },
  {
    path: '/cliente-registro',
    name: 'ClienteRegistro',
    component: () => import('@/views/Cliente/ClienteRegistro.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

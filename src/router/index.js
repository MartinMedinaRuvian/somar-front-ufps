import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

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
    path: '/persona-registro',
    name: 'PersonaRegistro',
    component: () => import('@/views/Persona/PersonaRegistro.vue'),
    props:true
  },
  {
    path: '/persona-perfil',
    name: 'PersonaPerfil',
    component: () => import('@/views/Persona/PersonaPerfil.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/insumos',
    name: 'Insumos',
    component: () => import('@/views/Insumo/Insumo.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/insumos-eliminar',
    name: 'InsumosEliminar',
    component: () => import('@/views/Insumo/InsumoEliminar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/insumos-editar',
    name: 'InsumosEditar',
    component: () => import('@/views/Insumo/InsumoEditar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('@/views/Categoria/Categoria.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias-eliminar',
    name: 'CategoriasEliminar',
    component: () => import('@/views/Categoria/CategoriaEliminar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias-editar',
    name: 'CategoriasEditar',
    component: () => import('@/views/Categoria/CategoriaEditar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const rutaProtegida = to.matched.some(record=> record.meta.requiereAutorizacion);

  if(rutaProtegida && store.state.usuario === null){
    next({name:'InicioSesion'})
  }else{
    next();
  }
})

export default router

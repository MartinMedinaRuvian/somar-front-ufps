<template>
    <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
  <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span class="text-dark">So</span><span class="color-verde-principal">Mar</span></router-link>   
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="icon-Menu"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/cliente-perfil" class="text-dark">Mi Perfil</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/productos" class="text-dark">Productos</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/productos" class="text-dark">Mis Pedidos</router-link>
      </li>
  
      <li class="nav-item ml-4">
        <button @click="cerrarSesionUsuario" data-toggle="collapse" data-target=".navbar-collapse.show" class="btn btn-outline-success">Cerrar sesión</button>
      </li>

    </ul>
  </div>
</nav>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(['cerrarSesion', 'verUsuarioGuardado']),
    cerrarSesionUsuario(){
      this.cerrarSesion();
      this.verUsuarioGuardado();
    } 
  }
}
</script>
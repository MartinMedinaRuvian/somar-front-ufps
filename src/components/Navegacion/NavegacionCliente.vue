<template>
    <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
  <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span class="text-dark">So</span><span class="color-verde-principal">Mar</span></router-link>   
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="icon-Menu"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      
      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/persona-perfil" class="text-dark">Mi Perfil</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/catalogo-productos" class="text-dark">Productos</router-link>
      </li>

      <li class="nav-item ml-4">
       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/pedidos-cliente" class="text-dark">Mis Pedidos <span class="numero-pedidos">{{pedidosPersona.length}}</span></router-link>
      </li>
  
      <li class="nav-item ml-4">
        <button @click="cerrarSesion" data-toggle="collapse" data-target=".navbar-collapse.show" class="btn btn-outline-success">Cerrar sesión</button>
      </li>

    </ul>
  </div>
</nav>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['pedidosPersona'])
  },
  methods:{
    ...mapActions(['cerrarSesion'])
  }
}
</script>
<style scoped>
  .numero-pedidos{
    background-color: #00A82D;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
</style>
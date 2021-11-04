<template>
  <div id="app" class="container">
    <NavegacionLanding v-if="usuario === null"/>
    <NavegacionCliente v-if="usuario !== null && usuario.tipo == 'cliente'"/>
    <NavegacionAdministrador v-if="usuario !== null && usuario.tipo =='administrador'"/>
    <router-view class="contenedor-vistas"/>
    <Footer/>
  </div>
</template>
<script>
import NavegacionLanding from './components/Navegacion/NavegacionLanding.vue'
import NavegacionCliente from './components/Navegacion/NavegacionCliente.vue'
import NavegacionAdministrador from './components/Navegacion/NavegacionAdministrador.vue'
import Footer from './components/parciales/Footer.vue'
import { mapGetters } from "vuex";
export default {
  components: { 
    NavegacionLanding, 
    NavegacionCliente, 
    NavegacionAdministrador,
    Footer 
  },
  computed:{
    ...mapGetters(['usuario'])
  }
  
}
</script>
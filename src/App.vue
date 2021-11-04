<template>
  <div id="app" class="container">
    <NavegacionLanding v-if="usuarioId === 0"/>
    <NavegacionCliente v-if="usuarioId !== 0 && usuarioTipo =='cliente'"/>
    <NavegacionAdministrador v-if="usuarioId !== 0 && usuarioTipo =='administrador'"/>
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
    ...mapGetters(['usuarioId', 'usuarioTipo'])
  }
  
}
</script>
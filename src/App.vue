<template>
  <div id="app" class="container">
    <Navegacion/>
    <router-view class="contenedor-vistas"/>
    <Footer/>
  </div>
</template>
<script>
import Navegacion from './components/parciales/Navegacion.vue'
import Footer from './components/parciales/Footer.vue'
export default {
  components: { Navegacion, Footer },
  
}
</script>
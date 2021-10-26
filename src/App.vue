<template>
  <div id="app" class="container">
    <Navegacion/>
    <router-view class="contenedor-vistas"/>
  </div>
</template>
<script>
import Navegacion from './components/parciales/Navegacion.vue'
export default {
  components: { Navegacion },
  
}
</script>
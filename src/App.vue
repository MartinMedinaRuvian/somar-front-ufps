<template>
  <div id="app" class="container">
    <Navegacion/>
    <router-view/>
  </div>
</template>
<script>
import Navegacion from './components/parciales/Navegacion.vue'
export default {
  components: { Navegacion },
  
}
</script>
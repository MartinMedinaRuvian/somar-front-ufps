<template>
    <div class="mt-5">
          <table class="table">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Código</th>
                         <th scope="col">Descripción</th>
                         <th scope="col">Stock</th>
                         <th scope="col">Costo Unidad</th>
                         <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="insumo in insumos" :key="insumo.codigo">
                         <td>{{ insumo.codigo }}</td>
                         <td>{{ insumo.descripcion }}</td>
                         <td>{{ insumo.stock }}</td>
                         <td>{{ insumo.costo_unidad }}</td>
                         <td>
                              <button class="btn btn-outline-warning" @click="editar(insumo)"><span class="icon-Lapiz"></span></button>
                              <button class="btn btn-outline-danger ml-2" @click="eliminar(insumo)"><span class="icon-Papelera"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
    </div>
</template>
<script>
export default {
     props:{
          insumos:[]
     },
     methods:{
          eliminar(insumo){
               this.$router.push({ name: 'InsumosEliminar', params: { insumo }})
          },
          editar(insumo){
               this.$router.push({ name: 'InsumosEditar', params: { insumo }})
          }
     }
}
</script>
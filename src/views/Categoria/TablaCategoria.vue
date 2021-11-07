<template>
    <div class="mt-5">
          <table class="table">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Código</th>
                         <th scope="col">Descripción</th>
                         <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.codigo">
                         <td>{{ categoria.codigo }}</td>
                         <td>{{ categoria.descripcion }}</td>
                         <td>
                              <button class="btn btn-outline-warning" @click="editar(categoria)"><span class="icon-Lapiz"></span></button>
                              <button class="btn btn-outline-danger ml-2" @click="eliminar(categoria)"><span class="icon-Papelera"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
    </div>
</template>
<script>
export default {
     props:{
          categorias:[]
     },
     methods:{
          eliminar(categoria){
               this.$router.push({ name: 'CategoriasEliminar', params: { categoria }})
          },
          editar(categoria){
               this.$router.push({ name: 'CategoriasEditar', params: { categoria }})
          }
     }
}
</script>
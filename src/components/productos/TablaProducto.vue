<template>
    <div class="mt-5">
          <table class="table">
               <thead class="thead-light">
                    <tr>
                         <th scope="col">Código</th>
                         <th scope="col">Descripción</th>
                         <th scope="col">Foto</th>
                         <th scope="col">Precio Unidad</th>
                         <th scope="col">Categoria</th>
                         <th scope="col">Insumos</th>
                         <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="producto in productos" :key="producto.codigo">
                         <td>{{ producto.codigo }}</td>
                         <td>{{ producto.descripcion }}</td>
                         <td><img :src="verFoto(producto.foto)" :alt="producto.codigo" width="100px" height="100px"></td>
                         <td>{{ producto.precio_unidad }}</td>
                         <td>{{ producto.codigo_categoria }}</td>
                         <td><button class="btn btn-outline-success" @click="verInsumos(producto.codigo)" data-toggle="modal" data-target="#exampleModalCenter">Ver insumos</button></td>
                         <td>
                              <button class="btn btn-outline-warning" @click="editar(producto)"><span class="icon-Lapiz"></span></button>
                              <button class="btn btn-outline-danger ml-2" @click="eliminar(producto)"><span class="icon-Papelera"></span></button>
                         </td>
                    </tr>
               </tbody>
          </table>
          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
               <div class="modal-header bg-success">
               <h5 class="modal-title" id="exampleModalLongTitle">Insumos:</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                    <div v-if="insumos.length > 0">
                         <p v-for="insumo of insumos" :key="insumo.index">{{insumo.descripcion}}</p>
                    </div>
                    <div v-else>
                         <p>No tiene insumos.</p>
                    </div>
               </div>
          </div>
          </div>
          </div>
    </div>
</template>
<script>
export default {
     props:{
          productos:[],
     },
     data(){
          return{
                insumos:[]
          }
     },
     methods:{
          eliminar(producto){
               this.$router.push({ name: 'ProductosEliminar', params: { producto }})
          },
          editar(producto){
               this.$router.push({ name: 'ProductosEditar', params: { producto }})
          },
          verFoto(nombreFoto){
               return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
          },
          verInsumos(codigoProducto){
            this.axios.get('producto-insumo/filtro-producto/' + codigoProducto)
            .then(respuesta=>{
                console.log(respuesta.data)
                this.insumos = respuesta.data;
            })
          }
     }
}
</script>
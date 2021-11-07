<template>
<div class="modal fade" id="insumoGuardarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header bg-success">
          <h5 class="modal-title" id="exampleModalLabel">Agregar Insumo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <div class="row">
              <div class="col-lg-12">
                  <input type="text" class="form-control" placeholder="Descripción" v-model="insumo.descripcion" required>
              </div>
          </div>
          <div class="row mt-2">
              <div class="col-lg-6">
                  <input type="number" class="form-control" placeholder="stock" v-model="insumo.stock" required>
              </div>
              <div class="col-lg-6">
                  <input type="number" class="form-control" placeholder="costo unidad" v-model="insumo.costoUnidad" required>
              </div>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" @click="guardar">Guardar</button>
      </div>
      </div>
  </div>
  <Mensaje :mensaje="mensaje"/>
</div>
</template>
<script>
import Mensaje from '@/components/Mensaje.vue'
export default {
  data(){
      return{
          insumo:{},
          mensaje:{ver:false}
      }
  },
  methods:{
    crearMensaje(contenido, color){
        this.mensaje.ver = true;
        this.mensaje.contenido = contenido
        this.mensaje.color = color
    },
    guardar(){
    this.axios.post('insumos', this.insumo)
    .then((respuesta)=>{
        console.warn(respuesta)
        if(respuesta.status === 200){
            this.cerrarModal()
            window.location = '/insumos'
        }
    })
    .catch((error)=>{
        this.crearMensaje(error.response.data.mensaje, 'danger')
    })
    },
    cerrarModal(){
      $('#insumoGuardarModal').modal('hide');
    }
  },
  components:{
    Mensaje
  }
}
</script>
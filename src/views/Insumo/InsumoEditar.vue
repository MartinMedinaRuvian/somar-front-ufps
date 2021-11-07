<template>
    <div class="text-center">
        <h4>Actualizar {{ insumo.descripcion }}</h4>
        <div>
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
                  <input type="number" class="form-control" placeholder="costo unidad" v-model="insumo.costo_unidad" required>
              </div>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-success" @click="actualizar(insumo.codigo)">Actualizar</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-info" @click="cancelar">Cancelar</button>
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
            insumoGuardar:{},
            mensaje:{ver:false}
        }
    },
    props:{
        insumo:Object
    },
    created(){

    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        cancelar(){
            this.$router.push({ name: 'Insumos'})
        },
        actualizar(codigo){
            this.axios.put('insumos/' + codigo, this.insumo)
            .then(respuesta=>{
                if(respuesta.status === 200){
                    this.$router.push({ name: 'Insumos'})
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        Mensaje
    }
}
</script>
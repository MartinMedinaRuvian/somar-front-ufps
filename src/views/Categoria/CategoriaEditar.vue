<template>
    <div class="text-center">
        <h4>Actualizar {{ categoria.descripcion }}</h4>
        <div>
        <div class="row">
              <div class="col-lg-12">
                  <input type="text" class="form-control" placeholder="Descripción" v-model="categoria.descripcion" required>
              </div>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-success" @click="actualizar(categoria.codigo)">Actualizar</button>
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
            categoriaGuardar:{},
            mensaje:{ver:false}
        }
    },
    props:{
        categoria:Object
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
            this.$router.push({ name: 'Categorias'})
        },
        actualizar(codigo){
            this.axios.put('categorias/' + codigo, this.categoria)
            .then(respuesta=>{
                if(respuesta.status === 200){
                    this.$router.push({ name: 'Categorias'})
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
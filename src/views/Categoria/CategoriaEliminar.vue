<template>
    <div class="text-center">
        <h4>¿Desea eliminar {{ categoria.descripcion }} ?</h4>
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-danger" @click="eliminar(categoria.codigo)">Eliminar</button>
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
            mensaje:{ver:false}
        }
    },
    props:{
        categoria:Object
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
        eliminar(codigo){
            this.axios.delete('categorias/' + codigo)
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
<template>
    <div class="text-center">
        <h4>¿Desea eliminar {{ producto.descripcion }} ?</h4>
        <img :src="urlImg" alt="img-foto" width="200px" height="200px">
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-danger" @click="eliminar(producto.codigo)">Eliminar</button>
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
            mensaje:{ver:false},
            urlImg:''
        }
    },
    props:{
        producto:Object
    }, 
    created(){
        this.traerImagenBack();
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        cancelar(){
            this.$router.push({ name: 'Productos'})
        },
        eliminar(codigo){
            this.axios.delete('productos/' + codigo)
            .then(respuesta=>{
                if(respuesta.status === 200){
                    this.eliminarImagen()
                    this.$router.push({ name: 'Productos'})
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        eliminarImagen(){
            this.axios.delete('subir/' + this.producto.foto)
            .then(respuesta=>{
                console.log(respuesta)
                this.urlImg = '';
                const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
                const $seleccionArchivos = document.querySelector("#file");
                console.log($seleccionArchivos)
                $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.png';
                $seleccionArchivos.value = '';

            })
            .catch(error=>console.log(error))
        },
        traerImagenBack(){
            this.urlImg = this.axios.defaults.baseURL + '/imagenes/' + this.producto.foto;
        },
    },
    components:{
        Mensaje
    }
}
</script>
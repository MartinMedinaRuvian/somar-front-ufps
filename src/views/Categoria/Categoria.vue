<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h3>Categorías</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <input @keypress="verCategorias()" type="text" class="form-control text-center formulario" placeholder="Ingrese categoría" v-model="filtro">
            <button class="btn btn-outline-success" @click="verCategorias()"><span class="icon-Lupa"></span></button>
        </div>
        <button type="button" class="btn btn-success mt-3" data-toggle="modal" data-target="#categoriaGuardarModal">
            Nuevo
        </button>
        <ModalGuardar/>
        <Tabla :categorias="categorias"/>
    </div>
</template>
<script>
import Tabla from './TablaCategoria.vue'
import ModalGuardar from './CategoriaModalGuardar.vue'
import Mensaje from '@/components/Mensaje.vue'
export default {
    data(){
        return{
            categorias:[],
            mensaje:{ver:false},
            filtro:''
        }
    },
    created(){
        this.verCategorias()
    },
    methods:{
        verCategorias(){
            let filtro = this.filtro
            this.axios.get('categorias/' + filtro)
            .then(respuesta =>{
                this.categorias = respuesta.data
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        Tabla,
        ModalGuardar,
        Mensaje
    }
}
</script>
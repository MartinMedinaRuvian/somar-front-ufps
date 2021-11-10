<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h3>Insumos</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <input @keypress="verInsumos()" type="text" class="form-control text-center formulario" placeholder="Ingrese insumo" v-model="filtro">
            <button class="btn btn-outline-success" @click="verInsumos()"><span class="icon-Lupa"></span></button>
        </div>
        <button type="button" class="btn btn-success mt-3" data-toggle="modal" data-target="#insumoGuardarModal">
            Nuevo
        </button>
        <ModalGuardarInsumo/>
        <TablaInsumo :insumos="insumos"/>
    </div>
</template>
<script>
import TablaInsumo from '@/components/insumo/TablaInsumo.vue'
import ModalGuardarInsumo from '@/components/insumo/InsumoModalGuardar.vue'
import Mensaje from '@/components/Mensaje.vue'
export default {
    data(){
        return{
            insumos:[],
            mensaje:{ver:false},
            filtro:''
        }
    },
    created(){
        this.verInsumos()
    },
    methods:{
        verInsumos(){
            let filtro = this.filtro
            this.axios.get('insumos/' + filtro)
            .then(respuesta =>{
                this.insumos = respuesta.data
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        TablaInsumo,
        ModalGuardarInsumo,
        Mensaje
    }
}
</script>
<template>
    <div class="tarjeta">
        <img :src="verFoto(producto.foto)" :alt="producto.codigo" width="100px" height="100px">
        <h6 class="titulo-tarjeta">{{producto.descripcion}}</h6>
        <p>Precio: $ <b>{{producto.precio_unidad}}</b></p>
        <h6 class="titulo-tarjeta">Ingredientes:</h6>
        <div class="insumos">
            <p v-for="insumo of insumos" :key="insumo.index">{{insumo.descripcion}}</p>
        </div>
        <button class="btn btn-success boton" @click="pedirProducto()">Pedir</button>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:{
        producto:Object,
    },
    data(){
        return{
            insumos:[],
            productosInsumos: []
        }
    },
    created(){
        this.verInsumos()
    },
    methods:{
        ...mapActions(['agregarPedidoPersona']),
        verFoto(nombreFoto){
            return this.axios.defaults.baseURL + '/imagenes/' + nombreFoto;
        },
        verInsumos(){
            this.axios.get('producto-insumo/filtro-producto/' + this.producto.codigo)
            .then(respuesta=>{
                this.insumos = respuesta.data;
                this.verProductoInsumo()
            })
        },
        verProductoInsumo(){
            this.axios.get('producto-insumo/filtro-producto-catalogo/' + this.producto.codigo)
            .then(respuesta=>{
                this.productosInsumos = respuesta.data;
            })
        },
        pedirProducto(){
            const infoProducto = {
                descripcion: this.producto.descripcion,
                foto: this.producto.foto,
                precio_unidad: this.producto.precio_unidad
            }
            const pedidoPersona = {
                producto: infoProducto,
                insumos: this.insumos,
                productosInsumos: this.productosInsumos
            }
            this.agregarPedidoPersona(pedidoPersona)
        }
    }
}
</script>
<style scoped>
    .tarjeta{
        border-radius: 10px;
        padding: 10px;
        margin-top: 10px;
        border: 0.90px solid #00A82D;;
        height: 530px;
    }
    img{
        border-radius: 10px;
        width: 100%;
        height: 300px;
    }
    .titulo-tarjeta{
        font-size: 20px;
        margin-top: 10px;
        text-align: left;
        font-weight: 700;
        color: #00A82D;;
    }
    p{
        text-align: left;
    }
    .insumos{
        display: flex;
        align-content: center;
        height: 50px;
    }
    .insumos > p{
        margin-right: 15px;
    }
    .boton{
        width: 200px;
    }
</style>
<template>
    <div class="text-center">
        <h3>Insumos</h3>
        <div class="d-flex justify-content-center align-items-center container">
            <form @submit.prevent="buscar()" class="formulario">
                <input type="text" class="form-control text-center" placeholder="Ingrese insumo 🔍">
            </form>
        </div>
        <button type="button" class="btn btn-success mt-3" data-toggle="modal" data-target="#exampleModal">
            Nuevo
        </button>
        <ModalGuardar />
        <div>
            <h3>Insumos guardados:</h3>
            <TarjetaInsumo />
        </div>
    </div>
</template>
<script>
import ModalGuardar from './InsumoModalGuardar.vue'
import TarjetaInsumo from './TarjetaInsumo.vue'
export default {
    components:{
        ModalGuardar,
        TarjetaInsumo
    }
}
</script>
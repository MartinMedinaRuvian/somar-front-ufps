<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h4>Bienvenido {{ usuarioNombre }}</h4>
        <p>Mi Perfil</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="actualizar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombres" class="form-control" v-model="cliente.nombres" required>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Apellidos" class="form-control" v-model="cliente.apellidos" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Identificacion" class="form-control" v-model="cliente.identificacion" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Teléfono" class="form-control" v-model="cliente.telefono">
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control" v-model="cliente.email">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success">Actualiza</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje.vue'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            cliente:{},
            mensaje:{ver:false},
            usuario:{}
        }
    },
    computed:{
        ...mapGetters(['usuarioNombre'])
    },
    components:{
        Mensaje
    }
}
</script>
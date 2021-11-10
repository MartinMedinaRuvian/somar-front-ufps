<template>
    <div class="text-center">
        <Mensaje :mensaje="mensaje" />
        <h4>Bienvenido {{ usuario === null ? '' : usuario.username }}</h4>
        <p>Mi Perfil</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="actualizar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombres" class="form-control" v-model="persona.nombres" required>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Apellidos" class="form-control" v-model="persona.apellidos" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Identificacion" class="form-control" v-model="persona.identificacion" required>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Teléfono" class="form-control" v-model="persona.telefono">
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control" v-model="persona.email">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" @click="actualizar()">Actualizar</button>
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
            persona:{},
            mensaje:{ver:false},
        }
    },
    created(){
        this.verPersona()
    },
    computed:{
        ...mapGetters(['usuario'])
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        verPersona(){
            this.axios.get('personas/' + this.usuario.codigo)
            .then(respuesta =>{
                if(respuesta.status === 200){
                  this.persona = respuesta.data
                }
            })
            .catch((error)=>{
                this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        actualizar(){
            this.axios.put('personas/' + this.persona.codigo, this.persona)
            .then((respuesta)=>{
                if(respuesta.status === 200){
                   this.crearMensaje(respuesta.data.mensaje, 'success')
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
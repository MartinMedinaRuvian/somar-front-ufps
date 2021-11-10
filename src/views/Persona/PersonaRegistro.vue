<template>
    <div class="text-center container-inicio-sesion">
        <Mensaje :mensaje="mensaje" />
        <h1><span>So</span><span class="color-verde-principal">Mar</span></h1>
        <p>Registro</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="guardar()" class="formulario">
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
                        <button class="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
       <div class="footer-formulario mt-3">
            <p>¿Ya tienes una cuenta?</p>
        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/" class="color-verde-principal link-crear-cuenta">Iniciar sesión</router-link>
       </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje'
export default {
    data(){
        return{
            persona:{},
            mensaje:{ver:false}
        }
    },
    props:{
        usuario:Object
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        guardar(){
            console.warn(this.usuario)
            this.persona.codigo_usuario = this.usuario.codigo
            this.axios.post('personas', this.persona)
            .then((respuesta)=>{
                if(respuesta.status === 200){
                    this.$router.push({ name: 'InicioSesion'})
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
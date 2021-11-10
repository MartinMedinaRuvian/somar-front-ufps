<template>
    <div class="text-center container-inicio-sesion">
        <Mensaje :mensaje="mensaje" />
        <h1><span>So</span><span class="color-verde-principal">Mar</span></h1>
        <p>Registro</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="guardar()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Usuario" class="form-control" v-model="usuario.username" required>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.password" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
       <div class="footer-formulario mt-3">
            <p>¿Ya tienes una cuenta?</p>
        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/inicio-sesion" class="color-verde-principal link-crear-cuenta">Iniciar sesión</router-link>
       </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje'
export default {
    data(){
        return{
            usuario:{},
            usuarioGuardado:{},
            mensaje:{ver:false}
        }
    },
    methods:{
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        guardar(){
            this.axios.post('usuarios', this.usuario)
            .then((respuesta)=>{
                if(respuesta.status === 200){
                    this.usuarioGuardado = respuesta.data
                    this.$router.push({ name: 'PersonaRegistro', params: {usuario: this.usuarioGuardado }})
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
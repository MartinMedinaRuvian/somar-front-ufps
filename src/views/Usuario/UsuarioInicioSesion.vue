<template>
    <div class="text-center container-inicio-sesion">
        <Mensaje :mensaje="mensaje"/>
        <h1><span>So</span><span class="color-verde-principal">Mar</span></h1>
        <p>Iniciar sesión</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form @submit.prevent="iniciarSesion()" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Usuario" class="form-control" v-model="usuario.username">
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
       <div class="footer-formulario mt-3">
            <p>¿No tiene una cuenta?</p>
        <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/registro" class="color-verde-principal link-crear-cuenta">Crear cuenta</router-link>
       </div>
    </div>
</template>
<script>
import Mensaje from '@/components/Mensaje'
import { mapActions } from 'vuex'
export default {
    data() {
       return{
           usuario:{},
           usuarioIngresado:{},
           mensaje:{ver:false}
       }
    },
    methods:{
        ...mapActions(['guardarUsuario', 'cerrarSesion']),
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        iniciarSesion(){
            this.axios.post('usuarios/inicioSesion', this.usuario)
            .then((respuesta)=>{
                if(respuesta.status === 200){                    
                    this.usuarioIngresado = respuesta.data;
                    this.guardarUsuarioIngresado();
                    this.$router.push({ name: 'PersonaPerfil'})
                }
            })
            .catch((error) => {
              this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        },
        guardarUsuarioIngresado(){
            if(this.usuarioIngresado.username === 'admin'){
                this.usuarioIngresado.tipo = 'administrador'
            }else{
                this.usuarioIngresado.tipo = 'cliente';
            }
            this.guardarUsuario(this.usuarioIngresado)
        }
    },
    components:{
        Mensaje
    }
}
</script>
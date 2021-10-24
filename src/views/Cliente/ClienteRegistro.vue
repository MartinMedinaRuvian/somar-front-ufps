<template>
    <div class="text-center container-inicio-sesion">
        <h1><span>So</span><span class="color-verde-principal">Mar</span></h1>
        <p>Registro</p>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="row">
                <form action="" class="formulario">
                    <div class="form-group">
                        <input type="text" placeholder="Nombres" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Apellidos" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Identificacion" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Teléfono" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control">
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
export default {
    
}
</script>
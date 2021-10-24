<template>
    <div class="text-center">
        <h3>Bienvenido {{ usuario.username }}</h3>
    </div>
</template>
<script>
export default {
    props:{
       usuario:Object
    }
}
</script>
<template>
    <div class="text-center">
        <form @submit.prevent>
            <div class="form-group">
                <h5>Fotografía producto:</h5>
                <div class="row">
                    <div class="col-md-6">
                        <input type="file" class="form-control" name="file" id="file" @change="verImagen" accept="image/*" required>
                        <input @click="subirArchivo()" type="button" value="Subir" class="form-control btn btn-success">
                        <button class="btn btn-danger form-control" @click="eliminarImagen()">Eliminar</button> 
                    </div>
                    <div class="col-md-6">
                        <img  alt="imagen" id="imagenPrevisualizacion" width="300px" height="300px">    
                    </div>
                </div>
            </div>
            <input type="text" placeholder="Descripción" v-model="producto.descripcion" class="form-control">
            <input type="text" placeholder="Precio unidad" v-model="producto.precioUnidad" class="form-control">

            <div class="form-group">
                <select class="form-select form-control" aria-label="Default select example" v-if="categorias.length > 0" v-model="producto.codigoCategoria">
                     <option :value="categoria.codigo" v-for="categoria in categorias" :key="categoria.codigo">{{categoria.descripcion}}</option>
                </select>
            </div>
            <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardarProducto()">
        </form>

        <TablaProductos :productos="productos" />
    </div>
</template>
<script>
import TablaProductos from '@/components/productos/TablaProducto'
export default {
    data(){
        return{
            urlImg:'',
            nombreImagen:'',
            producto:{},
            categorias:[],
            productos:[]
        }
    },
    created(){
        this.verCategorias()
        this.verProductos()
    },
    methods:{
        subirArchivo(){
            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("file", imagefile.files[0]);
            this.axios.post('subir', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((respuesta)=>{
                console.log(respuesta)
                this.nombreImagen = respuesta.data.filename;
                this.traerImagenBack(respuesta.data.filename);
            })
        },
        verImagen(){           
            const $seleccionArchivos = document.querySelector("#file"),
            $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
         
            // Los archivos seleccionados, pueden ser muchos o uno
            const archivos = $seleccionArchivos.files;
            // Si no hay archivos salimos de la función y quitamos la imagen
            if (!archivos || !archivos.length) {
                $imagenPrevisualizacion.src = "";
                return;
            }
            // Ahora tomamos el primer archivo, el cual vamos a previsualizar
            const primerArchivo = archivos[0];
            // Lo convertimos a un objeto de tipo objectURL
            const objectURL = URL.createObjectURL(primerArchivo);
            // Y a la fuente de la imagen le ponemos el objectURL
            $imagenPrevisualizacion.src = objectURL;
        },
        traerImagenBack(path){
            this.urlImg = this.axios.defaults.baseURL + '/imagenes/' + path;
        },
        eliminarImagen(){
            this.axios.delete('subir/' + this.nombreImagen)
            .then(respuesta=>{
                console.log(respuesta)
                this.urlImg = '';
                const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
                $imagenPrevisualizacion.src = '';
            })
            .catch(error=>console.log(error))
        },
        verCategorias(){
            this.axios.get('categorias')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.categorias = respuesta.data;
            })
        },
        guardarProducto(){
            if(this.urlImg !== ''){
                this.producto.foto = this.nombreImagen;
                console.log(this.producto, 'PRODUCTO GUARDAR')
                this.axios.post('productos', this.producto)
                .then(respuesta =>{
                    console.log(respuesta)
                    window.location = '/productos'
                })
            }else{
                alert('Seleccione una foto')
            }
        },
        verProductos(){
            this.axios.get('productos')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.productos = respuesta.data;
            })
        },
    },
    components:{
        TablaProductos
    }
}
</script>
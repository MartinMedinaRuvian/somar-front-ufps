<template>
    <div class="text-center">

            <div class="form group">
                <label for="descripcion">Descripción:</label>
                <input type="text" placeholder="Descripción" v-model="producto.descripcion" class="form-control">
            </div>

            <div class="form-group mt-4">
                <h5>Fotografía producto:</h5>
                <div class="row">
                    <div class="col-md-6">
                        <input type="file" class="form-control" name="file" id="file" @change="verImagen" accept="image/*" required>
                        <input @click="subirArchivo()" type="button" value="Seleccionar" class="form-control btn btn-success mt-3" v-if="urlImg === ''">                      
                    </div>
                    <div class="col-md-6">
                        <h5>Imagen seleccionada:</h5>
                        <img  alt="imagen" id="imagenPrevisualizacion" width="200px" height="200px" :src="urlSinFoto">   
                        <button class="btn btn-danger form-control" @click="eliminarImagen()" v-if="urlImg !==''">Eliminar</button>  
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="precioUnidad">Precio Unidad:</label>
                         <input type="text" placeholder="Precio unidad" v-model="producto.precioUnidad" class="form-control">
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="select">Seleccione categoria:</label>
                        <select id="select" class="form-select form-control" aria-label="Default select example" v-if="categorias.length > 0" v-model="producto.codigoCategoria">
                            <option :value="categoria.codigo" v-for="categoria in categorias" :key="categoria.codigo">{{categoria.descripcion}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="select2">Seleccione insumo a utiliar:</label>
                    <div class="form-group row">
                        <div class="col-md-9">
                        <select id="select2" class="form-select form-control" aria-label="Default select example" v-if="insumos.length > 0" v-model="insumoAgregar">
                            <option :value="insumo" v-for="insumo in insumos" :key="insumo.codigo">{{insumo.descripcion}}</option>
                        </select>
                        </div>
                        <div class="col-md-3">
                            <button class="btn btn-primary" @click="agregarInsumo()">Agregar</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" v-if="insumosGuardar.length > 0">
                    <h5 class="mb-3">Insumos a utilizar:</h5>
                    <div class="row mt-2" v-for="i in insumosGuardar" :key="i.codigo">
                        <div class="col-md-6">{{i.descripcion}}</div>
                        <div class="col-md-3"><span><input type="text" v-model="i.cantidad" class="form-control" placeholder="cantidad"></span></div>
                        <div class="col-md-3"><button class="btn btn-danger" @click="eliminarInsumo(i)">X</button></div>
                    </div>
                </div>
            </div>
            <input type="button" class="btn btn-success form-control mt-5" value="Guardar" @click="guardarProducto()">

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
            producto:{codigoCategoria:1},
            categorias:[],
            productos:[],
            urlSinFoto: this.axios.defaults.baseURL + '/imagenes/sin-foto.png',
            insumos: [],
            insumoAgregar: {},
            insumosGuardar: []
        }
    },
    created(){
        this.verCategorias()
        this.verInsumos()
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
                $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.png';
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
                const $seleccionArchivos = document.querySelector("#file");
                console.log($seleccionArchivos)
                $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.png';
                $seleccionArchivos.value = '';

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
        verInsumos(){
            this.axios.get('insumos')
            .then(respuesta=>{
                console.log(respuesta.data)
                this.insumos = respuesta.data;
                this.insumoAgregar = this.insumos[0]
            })
        },
        guardarProducto(){
            if(this.urlImg !== ''){
                this.producto.foto = this.nombreImagen;
                this.axios.post('productos', this.producto)
                .then(respuesta =>{
                    console.log(respuesta)
                    this.guardarProductoInsumo(respuesta.data.codigo)
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
        agregarInsumo(){
            this.insumosGuardar.push(this.insumoAgregar)
        },
        eliminarInsumo(insumo){
            let insumos = this.insumosGuardar
            for(let i of insumos){
                if(i.codigo === insumo.codigo){
                    let indice = insumos.indexOf(i)
                    insumos.splice(indice, 1)
                    break
                }
            }
            this.insumosGuardar = insumos
            console.warn(this.insumosGuardar, 'INSUMOS GUARDAR')
        },
        guardarProductoInsumo(codigoProductoGuardado){
            let productosInsumos = []
            const insumosGuardar = this.insumosGuardar
            for(let insumo of insumosGuardar){
                console.log(insumo, 'INSUMO')
                let productoInsumo = {
                    codigoProducto: codigoProductoGuardado,
                    codigoInsumo: insumo.codigo,
                    cantidad: insumo.cantidad
                }
                productosInsumos.push(productoInsumo)
            }
            this.axios.post('producto-insumo', productosInsumos)
            .then(respuesta =>{
                console.log(respuesta)
                window.location = '/productos'
            })
        }
    },
    components:{
        TablaProductos
    }
}
</script>
<template>
    <q-card style="max-width: 500px;">
        <q-card-section class="bg-inabif" style="background-color: #dee8f5">
          <div class="subtitulo"></div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-pa-md">
                <div class="row q-col-gutter-xs">
                    <div class="col-2"></div>
                    <div class="col10"><p><b>REGISTRO DE RESPONSABLE DE IIEE</b></p></div>
                    <div class="col-2"></div>

                </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
              <q-btn class = "botonFinalizar" :dense = "true" label="Aceptar"  v-close-popup/>
              <!--<q-btn class = "botonFinalizar" :dense = "true" label="Cancelar" v-close-popup />-->
        </q-card-actions>
      </q-card>
</template>

<script>
export default {
name: 'tablaEdicion',
props:{
    ParamResponsableSAC: Object
},

data(){
return{
resultado:null,
respuesta: false,

objetoModificado:{},
}
},
methods:{

    mostrarMensaje: function (mensaje, color, icono) {
    this.$q.notify({ message: mensaje, color: color, icon: icono , position: 'top-right'});
    },

   }
}
</script>


<style scoped>
.estiloBoton {
font-size: 75%;
width: 90%;
background-color: #f56a6a;
color:white
}

.botonFinalizar{
background-color: #f56a6a;
color:white;
font-size: 90%;

}
</style>

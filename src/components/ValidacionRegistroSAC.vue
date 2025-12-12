<template>
    <q-card>
        <q-card-section class="bg-inabif" style="background-color: #dee8f5">
          <div class="subtitulo">Observacion</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-pa-md">
                <!--<p>{{ParamAvisosConfirmacionLegalAlerta}}</p>-->
              <div class="col-1"></div>
                <ul>
                    <li v-for="(valor,clave) in ParamAviCieAcompAlerta.camposNoValidos" :key="clave">
                         {{ valor }}
                    </li>
                </ul>

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
    ParamAviCieAcompAlerta: Object
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

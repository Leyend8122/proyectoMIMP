<template>
    <q-card>
        <q-card-section class="bg-inabif" style="background-color: #dee8f5">
          <div class="subtitulo">{{paramEnvioConfirmacion.titulo}}</div>qqqqqqqq
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-pa-md">

                <p>{{paramEnvioConfirmacion}}</p>

                <div class="row" style="width: 500px; padding-left: 40px;">{{paramEnvioConfirmacion.mensaje1}}</div>
                <div class="row row q-pa-md" style="width: 400px;padding-left: 120px;"><strong>{{paramEnvioConfirmacion.mensaje2}}</strong></div>

          </div>
        </q-card-section>
        <q-card-actions align="center">
              <q-btn class = "botonFinalizar" :dense = "true" label="Aceptar" @click="EjecucionOperacion()" v-close-popup/>
              <q-btn class = "botonFinalizar" :dense = "true" label="Cancelar" v-close-popup />
        </q-card-actions>
      </q-card>
</template>


<script>
export default {
name: 'tablaEdicion',
props:{
paramEnvioConfirmacion: Object
},

data(){
return{
    requestConfig: {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        },
    resultado:null,
    respuesta: false
}
},
methods:{
    EjecucionOperacion(){
    if(this.paramEnvioConfirmacion.tipo == 'REG'){
        this.registroAgenda();
        if(this.resultado = 1){
        this.respuesta = true;
        this.$emit('estado-confirmacion',this.respuesta);
        this.mostrarMensaje('SE REALIZO EXITOSAMENTE EL REGISTRO DE LA SOLICITUD', 'green', 'check_circle');
        }
    }else if(this.paramEnvioConfirmacion.tipo == 'EVA'){

    }else if(this.paramEnvioConfirmacion.tipo == 'MOD'){

    }
    },

mostrarMensaje: function (mensaje, color, icono) {
        this.$q.notify({ message: mensaje, color: color, icon: icono , position: 'top-right'});
    },

registroAgenda(){
    let datos = new FormData();
    datos.append('ACCION', 'REGISTRAR');
    datos.append('VALORES', JSON.stringify(this.paramEnvioConfirmacion.valores));
    datos.append('ARCHIVO', this.paramEnvioConfirmacion.archivo);
    //datos.append('ARCHIVO', null);

    this.$axios
    .post(`http://localhost:8080/PROYECTO_UDIF/SAgendaDoc`, datos, this.requestConfig) //SAgenda
    .then(response => {
    if (response.data!=null) {
    this.resultado = response.data;
    
    }
    })
    .catch((e) => {
    this.mostrarMensaje('EXISTE PROBLEMAS DE REGISTRO', 'red', 'warning');
    })
    .finally(() => {
    //console.log('Ingrese al finally');
    //this.cargaConsulta.tipoRde = [];
    });
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


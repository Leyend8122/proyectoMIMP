<template>
      <q-card style="width: 800px; max-width: 500vw; height: 800px;">
      <q-card-section>
            <div class="col-12">
                  <span class="text-body1 text-bold">REGISTRO</span>
            </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          
         <div class="row q-col-gutter-xs"> 

                <div class="col-3">
                    <q-input v-model="respuesta.fechaFin" label="N° FICHA" dense readonly/>
                </div>

                <div class="col-10"></div>

                <div class="col-3">
                    <q-select label="IIEE" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    ref="iiee" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-2">
                    <q-select label="DEPARTAMENTO" @input="consultaProvincia()" v-model="respuesta.departamento" :options="consulta.departamento" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    ref="departamento" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-2">
                    <q-select label="PROVINCIA" @input="consultaDistrito()" v-model="respuesta.provincia" :options="consulta.provincia" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    ref="provincia" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-2">
                    <q-select label="DISTRITO" v-model="respuesta.distrito" :options="consulta.distrito" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    ref="distrito" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-1"></div>
                <div class="col-2">
                    <q-input v-model="respuesta.fechaInicio" label="FECHA INICIO" dense readonly/>
                </div>

                <div class="col-3">
                    <q-select label="RESPONSABLE IIEE" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    ref="iiee" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-2">
                    <q-input 
                    v-model.number="respuesta.manipuladores"
                        type="number"
                        filled
                        label="N° MANIPULADORES"
                    dense/>
                </div>

                <div class="col-5"></div>

                <div class="col-2">
                    <q-input v-model="respuesta.fechaFin" label="FECHA FIN" dense readonly/>
                </div>

                <div class="col-3">
                    <q-select label="ACCION" v-model="accion" option-value="codigo" option-label="descripcion" emit-value map-options dense outlined
                    :options="consulta.accion" ref="accion" :disable="(paramEnvio.operacion == 'CON')? true:false "></q-select>
                </div>

                <div class="col-12"></div>

                <div class="col-12" v-if="accion == '1'">
                    <q-card>
                        <q-tabs
                            v-model="tab"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align="justify"
                            narrow-indicator
                            >
                            <q-tab name="seccion-2" label="S2-Ubicacion y Estructura" disable/>
                            <q-tab name="seccion-3" label="S3-Instalaciones Sanitarias" disable/>
                            <q-tab name="seccion-4" label="S4-Principios Generales Higiene" disable/>
                            <q-tab name="seccion-5" label="S5-Programa Higiene y Saneamiento" disable/>
                            <q-tab name="seccion-6" label="S6-Evidencias" disable/>
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated enable>
                                

                                <q-tab-panel name="seccion-2">
                                    <div class="q-pa-md">
                                            <div class="row q-col-gutter-xs">
                                                
                                                <div class="col-10"></div>

                                                <div class="col-2">
                                                    <q-btn color="red" icon-left="add" label="Siguiente >>" @click="avanzarHito03()"/>
                                                </div>
                                            </div>
                                        </div>
                                </q-tab-panel>

                                <q-tab-panel name="seccion-3">
                                        <div class="q-pa-md">
                                            <div class="row q-col-gutter-xs">

                                      
                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="<< Atras" @click="retrocederHito02()"/>
                                                        </div>
                                                        <div class="col-8"></div>

                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="Siguiente >>" @click="avanzarHito04()"/>
                                                        </div>
                                               

                                            </div>
                                        </div>
                                </q-tab-panel>

                                <q-tab-panel name="seccion-4">
                                    <div class="q-pa-md">
                                            <div class="row q-col-gutter-xs">
                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="<< Atras" @click="retrocederHito03()"/>
                                                        </div>
                                                        <div class="col-8"></div>

                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="Siguiente >>" @click="avanzarHito05()"/>
                                                        </div>
                                            </div>
                                        </div>
                                </q-tab-panel>

                                <q-tab-panel name="seccion-5">
                                    <div class="q-pa-md">
                                            <div class="row q-col-gutter-xs">
                                                    <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="<< Atras" @click="retrocederHito04()"/>
                                                        </div>
                                                        <div class="col-8"></div>

                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="Siguiente >>" @click="avanzarHito06()"/>
                                                        </div>
                                            </div>
                                        </div>
                                </q-tab-panel>

                                <q-tab-panel name="seccion-6">
                                    <div class="q-pa-md">
                                            <div class="row q-col-gutter-xs">
                                                    <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="<< Atras" @click="retrocederHito05()"/>
                                                        </div>
                                                        <div class="col-8"></div>

                                                        <div class="col-2">
                                                            <q-btn color="red" icon-left="add" label="Finalizar" @click="RegistroGuardar()"/>
                                                    </div>
                                            </div>
                                        </div>
                                </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </div>

                <div class="col-12" v-if="accion == '2'">
                    <div  style="max-width: 1070px">
                            <q-input
                            v-model="respuesta.observacion"
                            filled
                            type="textarea"
                            counter
                            maxlength="250"
                            >
                            </q-input>

                        </div>
                </div>

           </div>
        </div>
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">

              <q-btn id = "Cancelar" class = "botonFinalizar" :dense = "true" label="Cancelar" v-close-popup/> <!--v-close-popup-->

              <!--<q-dialog v-model="EsConfirmacionAgenda" persistent>
                  <ConfirmacionAgenda :paramEnvioConfirmacion = "ParamConfirmacionContinuidad" @estado-confirmacion = "estadoConfirmacion"></ConfirmacionAgenda>
              </q-dialog>-->


              <!--<q-dialog v-model="EsAvisoConfirmacion" persistent>
                  <AvisosConfirmacionAgenda :paramEnvioAvisos = "paramEnvioAvisos"></AvisosConfirmacionAgenda>
              </q-dialog>-->

    </q-card-actions>

    </q-card>

</template>

<script>
export default {

props:{
  paramEnvio: Object
},
/*components:{
    ConfirmacionAgenda,AvisosConfirmacionAgenda
},*/

  data() {
    return {
        tab: 'seccion-2',
         nombreBoton:"",
         accion:"",

            consulta:{
                departamento:[{codigo:"",descripcion:"" },
                              {codigo:"",descripcion:"" },
                              {codigo:"",descripcion:"" }
                ],
                accion:[{codigo:1,descripcion:"APLICA"},
                             {codigo:2,descripcion:"NO CONTESTA"}
                ]
            },

            respuesta:{
                departamento:"01",
                provincia:"02",
                distrito:"01",
                fechaInicio:"",
                fechaFin:"",
                manipuladores:0,
                observacion:""
            }
        }
    },

    methods:{
        EjecucionGuardado(){

        },

        consultaProvincia(){

        },

        consultaDistrito(){

        },

        avanzarHito03(){
            this.tab = "seccion-3"
        },

        retrocederHito02(){
            this.tab = "seccion-2"
        },

        avanzarHito04(){
            this.tab = "seccion-4"
        },

        retrocederHito04(){
            this.tab = "seccion-4"
        },

        retrocederHito03(){
            this.tab = "seccion-3"
        },

        avanzarHito05(){
            this.tab = "seccion-5"
        },

        retrocederHito06(){
            this.tab = "seccion-6"
        },

        retrocederHito05(){
            this.tab = "seccion-5"
        },

        avanzarHito06(){
            this.tab = "seccion-6"
        },

        RegistroGuardar(){
            alert("Se registro todo Correctamente")
        }

    }

}
</script>
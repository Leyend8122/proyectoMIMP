<template>
  <q-card style="width: 800px; max-width: 500vw; height: 800px">
    <q-card-section>
      <div class="col-12">
        <span class="text-body1 text-bold">REGISTRO</span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="row q-col-gutter-xs">
          <div class="col-3">
            <q-input
              v-model="respuesta.fechaFin"
              label="N° FICHA"
              dense
              readonly
            />
          </div>

          <div class="col-10"></div>

          <div class="col-3">
            <q-select
              label="IIEE"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              ref="iiee"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-2">
            <q-select
              label="DEPARTAMENTO"
              @input="consultaProvincia()"
              v-model="respuesta.departamento"
              :options="consulta.departamento"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              ref="departamento"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-2">
            <q-select
              label="PROVINCIA"
              @input="consultaDistrito()"
              v-model="respuesta.provincia"
              :options="consulta.provincia"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              ref="provincia"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-2">
            <q-select
              label="DISTRITO"
              v-model="respuesta.distrito"
              :options="consulta.distrito"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              ref="distrito"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-1"></div>
          <div class="col-2">
            <q-input
              v-model="respuesta.fechaInicio"
              label="FECHA INICIO"
              dense
              readonly
            />
          </div>

          <div class="col-3">
            <q-select
              label="RESPONSABLE IIEE"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              ref="iiee"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-2">
            <q-input
              v-model.number="respuesta.manipuladores"
              type="number"
              filled
              label="N° MANIPULADORES"
              dense
            />
          </div>

          <div class="col-5"></div>

          <div class="col-2">
            <q-input
              v-model="respuesta.fechaFin"
              label="FECHA FIN"
              dense
              readonly
            />
          </div>

          <div class="col-3">
            <q-select
              label="ACCION"
              v-model="accion"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              :options="consulta.accion"
              ref="accion"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
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
                <q-tab
                  name="seccion-2"
                  label="S2-Ubicacion y Estructura"
                  disable
                />
                <q-tab
                  name="seccion-3"
                  label="S3-Instalaciones Sanitarias"
                  disable
                />
                <q-tab
                  name="seccion-4"
                  label="S4-Principios Generales Higiene"
                  disable
                />
                <q-tab
                  name="seccion-5"
                  label="S5-Programa Higiene y Saneamiento"
                  disable
                />
                <q-tab name="seccion-6" label="S6-Evidencias" disable />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated enable>
                <q-tab-panel name="seccion-2">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-10">
                        <span
                          >1.-Establecimiento localizado en terreno no inundable
                          y el perímetro de la institución educativa está
                          asfaltado</span
                        >
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Establecimeinto alejado de focos de insalubridad o
                          actividades que puedan afectar la inocuidad del
                          producto.</span
                        >
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >3.-Exclusividad de los ambientes destinados a los
                          alimentos.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I03"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >4.-Ambientes limpios, bien iluminados y ventilados
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I04"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >5.-Paredes, techos y pisos de materiales fáciles de
                          higienizar y limpios
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I05"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >6.-Mobiliario de material resistente, en buen estado
                          de conservación y limpieza
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I06"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >7.-Todas las áreas o secciones se encuentran
                          señalizadas en cuanto a accesos, circulación,
                          servicios, seguridad entre otras.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I07"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I07"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >8.-Las luminarias cuentan con sistema de protección
                          en caso de ruptura o cualquier accidente
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S02I08"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S02I08"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10"></div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="Siguiente >>"
                          @click="avanzarHito03()"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="seccion-3">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-10">
                        <span
                          >1.-Abastecimiento suficiente de agua segura
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Eliminación adecuada de aguas residuales
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Basura bien dispuesta (tachos con bolsa interior y
                          tapa) de eliminación diaria
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I03"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-SSHH bien ubicados, limpios, operativos y con
                          implementos para el lavado de manos (agua potable,
                          jabón y escobilla para uñas)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I04"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Ausencia de insectos, de indicios de roedores y de
                          otros animales
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I05"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Los vestidores cuentan con las facilidades para
                          que el personal pueda realizar el cambio de ropa.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I06"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Existe separación física entre los sanitarios y
                          vestidores.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S03I07"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S03I07"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="<< Atras"
                          @click="retrocederHito02()"
                        />
                      </div>
                      <div class="col-8"></div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="Siguiente >>"
                          @click="avanzarHito04()"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="seccion-4">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="<< Atras"
                          @click="retrocederHito03()"
                        />
                      </div>
                      <div class="col-8"></div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="Siguiente >>"
                          @click="avanzarHito05()"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="seccion-5">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="<< Atras"
                          @click="retrocederHito04()"
                        />
                      </div>
                      <div class="col-8"></div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="Siguiente >>"
                          @click="avanzarHito06()"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="seccion-6">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="<< Atras"
                          @click="retrocederHito05()"
                        />
                      </div>
                      <div class="col-8"></div>

                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="Finalizar"
                          @click="RegistroGuardar()"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>

          <div class="col-12" v-if="accion == '2'">
            <div style="max-width: 1070px">
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
      <q-btn
        id="Cancelar"
        class="botonFinalizar"
        :dense="true"
        label="Cancelar"
        v-close-popup
      />
      <!--v-close-popup-->

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
  props: {
    paramEnvio: Object,
  },
  /*components:{
    ConfirmacionAgenda,AvisosConfirmacionAgenda
},*/

  data() {
    return {
      tab: "seccion-2",
      nombreBoton: "",
      accion: "",

      consulta: {
        departamento: [
          { codigo: "", descripcion: "" },
          { codigo: "", descripcion: "" },
          { codigo: "", descripcion: "" },
        ],
        accion: [
          { codigo: 1, descripcion: "APLICA" },
          { codigo: 2, descripcion: "NO CONTESTA" },
        ],
      },

      respuesta: {
        departamento: "01",
        provincia: "02",
        distrito: "01",
        fechaInicio: "",
        fechaFin: "",
        manipuladores: 0,
        observacion: "",

        S02I01: "",
        S02I02: "",
        S02I03: "",
        S02I04: "",
        S02I05: "",
        S02I06: "",
        S02I07: "",
        S02I08: "",

        S03I01: "",
        S03I02: "",
        S03I03: "",
        S03I04: "",
        S03I05: "",
        S03I06: "",
        S03I07: "",
      },
    };
  },

  methods: {
    EjecucionGuardado() {},

    consultaProvincia() {},

    consultaDistrito() {},

    avanzarHito03() {
      this.tab = "seccion-3";
    },

    retrocederHito02() {
      this.tab = "seccion-2";
    },

    avanzarHito04() {
      this.tab = "seccion-4";
    },

    retrocederHito04() {
      this.tab = "seccion-4";
    },

    retrocederHito03() {
      this.tab = "seccion-3";
    },

    avanzarHito05() {
      this.tab = "seccion-5";
    },

    retrocederHito06() {
      this.tab = "seccion-6";
    },

    retrocederHito05() {
      this.tab = "seccion-5";
    },

    avanzarHito06() {
      this.tab = "seccion-6";
    },

    RegistroGuardar() {
      alert("Se registro todo Correctamente");
    },
  },
};
</script>

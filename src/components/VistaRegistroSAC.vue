<template>
  <q-card style="width: 800px; max-width: 500vw; height: 800px">
    <q-card-section>
      <div class="row">
        <div class="col-6">
          <span class="text-body1 text-bold">REGISTRO</span>
        </div>

        <div class="col-6" style="color: black">{{ paramEnvio }}</div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="row q-col-gutter-xs">
          <div class="col-3">
            <q-input
              v-model="respuestaCabecera[0].pf_definicion"
              label="N° FICHA"
              dense
              readonly
            />
          </div>

          <div class="col-5"></div>

          <div class="col-5">
            <q-input
              v-model="respuestaCabecera[0].pf_defInstituciones"
              label="INSTITUCIONES EXTRA"
              dense
            />
          </div>

          <div class="col-5">
            <q-input
              v-model="respuestaCabecera[0].pf_defResponsable"
              label="RESPONSABLE EXTRA"
              dense
            />
          </div>

          <div class="col-3">
            <q-select
              v-model="respuestaCabecera[0].pie_id"
              label="IIEE"
              option-value="pie_id"
              option-label="pie_definicion"
              emit-value
              map-options
              dense
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="listaInstitucione1"
              @filter="filterFn"
              @input="verificacion"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-2">
            <q-input
              v-model="definicionUbigeo.departamento"
              label="DEPARTAMENTO"
              dense
              readonly
            />
          </div>

          <div class="col-2">
            <q-input
              v-model="definicionUbigeo.provincia"
              label="PROVINCIA"
              dense
              readonly
            />
          </div>

          <div class="col-2">
            <q-input
              v-model="definicionUbigeo.distrito"
              label="DISTRITO"
              dense
              readonly
            />
          </div>

          <div class="col-1"></div>
          <div class="col-2">
            <q-input
              v-model="respuestaCabecera[0].pf_fecha_ini"
              label="FECHA INICIO"
              dense
              readonly
            />
          </div>

          <div class="col-3">
            <q-select
              v-model="respuestaCabecera[0].pr_id"
              label="RESPONSABLE IIEE"
              option-value="codigo"
              option-label="descripcion"
              :options="consulta.reponsable"
              emit-value
              map-options
              dense
              outlined
              ref="iieeyy"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-1">
            <q-btn
              :disabled="respuestaCabecera[0].pie_id == null ? true : false"
              color="black"
              icon-right="save"
              @click="mostrarNuevoResponsable()"
            />
          </div>

          <div class="col-2">
            <q-input
              v-model="respuestaCabecera[0].pf_nummanipuladores"
              type="number"
              filled
              label="N° MANIPULADORES"
              dense
              :min="0"
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuestaCabecera[0].pf_ubiseralimentacion"
              label="UBICACION DEL SERVICIO ALIMENTACION"
              dense
            />
          </div>

          <div class="col-1"></div>

          <div class="col-2">
            <q-input
              v-model="respuestaCabecera[0].pf_fecha_fin"
              label="FECHA FIN"
              dense
              readonly
            />
          </div>

          <div class="col-3">
            <q-select
              v-model="respuestaCabecera[0].pf_racionesrecibieron"
              label="RACIONES QUE ESTUVIERON RECIBIENDO"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              outlined
              :options="consulta.raciones"
              ref="RACIONES"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            ></q-select>
          </div>

          <div class="col-4">
            <q-input
              v-model="respuestaCabecera[0].pf_derracionesrecibieron"
              label="DETALLAR"
              dense
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            />
          </div>

          <div class="col-4"></div>

          <div class="col-3">
            <q-input
              v-model="respuestaCabecera[0].pf_nusuarios"
              label="N° USUARIOS"
              type="number"
              dense
              filled
              :min="0"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            />
          </div>

          <div class="col-7"></div>

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
                  name="seccion-3"
                  label="S3-Ubicacion y Estructura"
                  disable
                />
                <q-tab
                  name="seccion-4"
                  label="S4-Instalaciones Sanitarias"
                  disable
                />
                <q-tab
                  name="seccion-5"
                  label="S5-Principios Generales Higiene"
                  disable
                />
                <q-tab
                  name="seccion-6"
                  label="S6-Programa Higiene y Saneamiento"
                  disable
                />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated enable>
                <q-tab-panel name="seccion-3">
                  <div class="q-pa-md">
                    <div class="row q-col-gutter-xs">
                      <div class="col-6">
                        <span
                          >1.-Ubicado lejos de contaminación y zonas con malos
                          olores</span
                        >
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[0].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[0].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />

                        <q-radio
                          v-model="respuestaDetalle[0].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[0].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[0].imagenes != null">{{
                              respuestaDetalle[0].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput01.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[0].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[0].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput01"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[0].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >2.-Exclusividad de los ambientes destinados a los
                          alimentos.</span
                        >
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[1].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[1].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[1].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[1].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[1].imagenes != null">{{
                              respuestaDetalle[1].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput02.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[1].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[1].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput02"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[1].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >3.-Ambientes limpios, bien iluminados y ventilados.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[2].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[2].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[2].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[2].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[2].imagenes != null">{{
                              respuestaDetalle[2].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput03.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[2].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[2].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput03"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[2].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >4.-Paredes, techos y pisos de materiales fáciles de
                          higienizar y limpios
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[3].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[3].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[3].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[3].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[3].imagenes != null">{{
                              respuestaDetalle[3].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput04.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[3].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[3].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput04"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[3].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >5.-Mobiliario de material resistente, en buen estado
                          de conservación y limpieza.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[4].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[4].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[4].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[4].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[4].imagenes != null">{{
                              respuestaDetalle[4].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput05.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[4].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[4].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput05"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[4].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >6.-Las luminarias cuentan con sistema de protección
                          en caso de ruptura o cualquier accidente.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[5].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[5].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[5].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[5].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[5].imagenes != null">{{
                              respuestaDetalle[5].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput06.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[5].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[5].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput06"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[5].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-10"></div>

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
                      <div class="col-12">
                        <p>Abastecimiento agua</p>
                      </div>
                      <div class="col-6" style="padding-left: 3%">
                        <span
                          >a.-Red pública dentro de la institución educativa (es
                          agua potable)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[6].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[6].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[6].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[6].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[6].imagenes != null">{{
                              respuestaDetalle[6].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput07.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[6].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[6].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput07"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[6].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <span
                          >b.-Pilón o pileta de uso público (es agua potable)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[7].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[7].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[7].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[7].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[7].imagenes != null">{{
                              respuestaDetalle[7].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput08.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[7].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[7].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput08"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[7].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <span>c.-Camión cisterna u otro similar </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[8].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[8].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />

                        <q-radio
                          v-model="respuestaDetalle[8].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[8].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[8].imagenes != null">{{
                              respuestaDetalle[8].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput09.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[8].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[8].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput09"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[8].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <span>d.-Pozo (agua subterránea) </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[9].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[9].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />

                        <q-radio
                          v-model="respuestaDetalle[9].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[9].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span v-if="respuestaDetalle[9].imagenes != null">{{
                              respuestaDetalle[9].imagenes.name
                            }}</span>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput10.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[9].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[9].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput10"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[9].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <span>e.-Manantial o puquio </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[10].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[10].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[10].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[10].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[10].imagenes != null"
                              >{{ respuestaDetalle[10].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput11.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[10].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[10].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput11"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[10].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <span>f.-Rio, acequia, lago, laguna </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[11].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[11].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[11].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[11].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[11].imagenes != null"
                              >{{ respuestaDetalle[11].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput12.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[11].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[11].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput12"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[11].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 3%">
                        <q-input
                          v-model="respuestaDetalle[12].pdf_otro_ambpreparacion"
                          label="Otro"
                          dense
                        />
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[12].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[12].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[12].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[12].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[12].imagenes != null"
                              >{{ respuestaDetalle[12].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput13.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[12].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[12].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput13"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[12].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>Eliminación adecuada de aguas residuales </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[13].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[13].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[13].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[13].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[13].imagenes != null"
                              >{{ respuestaDetalle[13].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput14.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[13].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[13].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput14"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[13].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Basura bien dispuesta (tachos con bolsa interior y
                          tapa) de eliminación diaria
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[14].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[14].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[14].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[14].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[14].imagenes != null"
                              >{{ respuestaDetalle[14].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput15.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[14].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[14].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput15"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[14].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >SSHH bien ubicados, limpios, operativos y con
                          implementos para el lavado de manos (agua potable,
                          jabón y escobilla para uñas)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[15].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[15].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[15].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[15].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[15].imagenes != null"
                              >{{ respuestaDetalle[15].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput16.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[15].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[15].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput16"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[15].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Ausencia de insectos, de indicios de roedores y de
                          otros animales
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[16].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[16].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[16].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[16].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[16].imagenes != null"
                              >{{ respuestaDetalle[16].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput17.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[16].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[16].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput17"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[16].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Los vestidores cuentan con las facilidades para que
                          el personal pueda realizar el cambio de ropa.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[17].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[17].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[17].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[17].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[17].imagenes != null"
                              >{{ respuestaDetalle[17].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput18.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[17].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[17].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput18"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[17].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Existe separación física entre los sanitarios y
                          vestidores.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[18].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[18].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[18].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[18].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[18].imagenes != null"
                              >{{ respuestaDetalle[18].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput19.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[18].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[18].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput19"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[18].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-2"></div>
                      <div class="col-2">
                        <q-btn
                          color="red"
                          icon-left="add"
                          label="<< Atras"
                          @click="avanzarHito03()"
                        />
                      </div>

                      <div class="col-5"></div>

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
                      <div class="col-12">
                        <p>
                          <b>BPM en la proceso de elaboración de alimentos</b>
                        </p>
                      </div>
                      <div class="col-12">
                        <p><b>RECEPCION</b></p>
                      </div>

                      <div class="col-6">
                        <span>1.-Alimentos de proveedores autorizados </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[19].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[19].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[19].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[19].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[19].imagenes != null"
                              >{{ respuestaDetalle[19].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput20.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[19].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[19].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput20"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[19].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >2.-Medio de transporte cerrado, limpio y exclusivo
                          para alimentos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[20].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[20].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[20].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[20].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[20].imagenes != null"
                              >{{ respuestaDetalle[20].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput21.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[20].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[20].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput21"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[20].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >3.-Productos frescos con caracterísitcas de calidad
                          (organolépticas)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[21].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[21].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[21].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[21].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[21].imagenes != null"
                              >{{ respuestaDetalle[21].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput22.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[21].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[21].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput22"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[21].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >4.-Alimentos perecibles que mantienen la cadena de
                          frio
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[22].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[22].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[22].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[22].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[22].imagenes != null"
                              >{{ respuestaDetalle[22].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput23.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[22].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[22].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput23"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[22].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >5.-Productos envasados con registro sanitario y norma
                          de rotulado
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[23].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[23].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[23].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[23].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[23].imagenes != null"
                              >{{ respuestaDetalle[23].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput24.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[23].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[23].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput24"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[23].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <span>Quien recibe los alimentos </span>
                      </div>

                      <div class="col-6" style="padding-left: 4%">
                        <span>a.-Director </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[24].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[24].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[24].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[24].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[24].imagenes != null"
                              >{{ respuestaDetalle[24].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput25.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[24].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[24].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput25"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[24].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 4%">
                        <span>b.-Profesor </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[25].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[25].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[25].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[25].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[25].imagenes != null"
                              >{{ respuestaDetalle[25].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput26.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[25].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[25].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput26"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[25].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 4%">
                        <span>c.-Madre o padre de familia </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[26].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[26].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[26].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[26].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[26].imagenes != null"
                              >{{ respuestaDetalle[26].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput27.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[26].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[26].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput27"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[26].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6" style="padding-left: 4%">
                        <q-input
                          v-model="respuestaDetalle[27].pdf_otro_ambpreparacion"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[27].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[27].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[27].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[27].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[27].imagenes != null"
                              >{{ respuestaDetalle[27].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput28.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[27].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[27].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput28"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[27].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>ALMACENAMIENTO</b></p>
                      </div>

                      <div class="col-6">
                        <span
                          >Ambiente de uso exclusivo para el almacenamiento
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[28].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[28].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[28].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[28].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[28].imagenes != null"
                              >{{ respuestaDetalle[28].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput29.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[28].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[28].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput29"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[28].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Ambiente limpio, seco, ventilado e iluminado
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[29].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[29].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[29].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[29].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[29].imagenes != null"
                              >{{ respuestaDetalle[29].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput30.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[29].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[29].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput30"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[29].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>Alimentos secos sobre tarimas o similares </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[30].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[30].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[30].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[30].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[30].imagenes != null"
                              >{{ respuestaDetalle[30].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput31.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[30].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[30].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput31"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[30].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Aplica cadena de frío en conservación de alimentos
                          perecibles
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[31].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[31].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[31].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[31].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[31].imagenes != null"
                              >{{ respuestaDetalle[31].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput32.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[31].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[31].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput32"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[31].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Aplica principio de rotación de stock (PEPS primero
                          en entrar, primero en salir)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[32].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[32].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[32].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[32].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[32].imagenes != null"
                              >{{ respuestaDetalle[32].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput33.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[32].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[32].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput33"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[32].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Se dispone de equipos de control de temperatura y se
                          realiza el monitoreo constante de la temperatura
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[33].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[33].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[33].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[33].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[33].imagenes != null"
                              >{{ respuestaDetalle[33].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput34.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[33].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[33].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput34"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[33].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Cuenta con un control de ingreso y salida de los
                          alimentos (KARDEX)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[34].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[34].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[34].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[34].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[34].imagenes != null"
                              >{{ respuestaDetalle[34].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput35.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[34].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[34].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput35"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[34].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>
                          El almacén cuenta con saldos de alimentos (detallar
                          los saldos)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[35].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[35].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[35].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[35].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[35].imagenes != null"
                              >{{ respuestaDetalle[35].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput36.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[35].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[35].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput36"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[35].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>PREPARACIÓN</b></p>
                      </div>

                      <div class="col-6">
                        <span>Ambiente de cocina limpia y desinfectada </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[36].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[36].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[36].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[36].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[36].imagenes != null"
                              >{{ respuestaDetalle[36].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput37.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[36].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[36].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput37"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[36].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Agua segura para preparar alimentos (cloro residual
                          0.5 ppm)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[37].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[37].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[37].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[37].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[37].imagenes != null"
                              >{{ respuestaDetalle[37].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput38.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[37].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[37].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput38"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[37].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Utiliza tablas de picar diferenciadas para los
                          productos crudos y cocidos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[38].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[38].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[38].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[38].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[38].imagenes != null"
                              >{{ respuestaDetalle[38].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput39.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[38].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[38].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput39"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[38].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Aplica cadena de frío en conservación de alimentos
                          perecibles
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[39].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[39].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[39].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[39].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[39].imagenes != null"
                              >{{ respuestaDetalle[39].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput40.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[39].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[39].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput40"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[39].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Perapaciones calientes se mantienen a temperatura
                          superiores a 70°C.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[40].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[40].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[40].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[40].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[40].imagenes != null"
                              >{{ respuestaDetalle[40].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput41.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[40].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[40].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput41"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[40].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Lavan y desinfectan las frutas y verduras de tallo
                          corto de consumo directo (crudos).
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[41].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[41].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[41].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[41].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[41].imagenes != null"
                              >{{ respuestaDetalle[41].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput42.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[41].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[41].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput42"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[41].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Se dispone de equipos de control de temperatura y se
                          realiza el monitoreo de la temperatura
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[42].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[42].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[42].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[42].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[42].imagenes != null"
                              >{{ respuestaDetalle[42].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput43.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[42].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[42].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput43"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[42].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>EQUIPAMIENTO</b></p>
                        <p><b>Área de almacenamiento</b></p>
                      </div>

                      <div class="col-5">
                        <span>Refrigeradora </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[43].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[43].pdf_estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          :options="consulta.estado"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="3"></div>

                      <div class="col-5">
                        <span>Congeladora </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[44].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[44].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="3"></div>

                      <div class="col-5">
                        <span>Balanza </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[45].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[45].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="3"></div>
                      <div class="col-5">
                        <span>Parihuela </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[46].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[46].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="3"></div>
                      <div class="col-5">
                        <span>Termómetro </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[47].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[47].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="3"></div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[48].pdf_otro_ambpreparacion"
                          label="otros"
                          dense
                        />
                      </div>

                      <div class="col-2"></div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[48].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[48].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-3"></div>
                      <div class="col-12"></div>
                      <div class="col-12"></div>
                      <div class="col-12">
                        <p><b>Área de preparación</b></p>
                      </div>
                      <div class="col-5">
                        <span>lavadero con conexión a red de desague </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[49].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[49].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[49].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[49].pdf_material_esp"
                          label="Otros"
                          dense
                          :min="0"
                        />
                      </div>
                      <div class="col-5">
                        <span
                          >extintor de acetato de potasio (plateado, clase K)
                        </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[50].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[50].pdf_vigencia"
                          :options="consulta.vigencia"
                          label="VIGENTE"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[50].pdf_fecha_caducidad"
                          dense
                          type="date"
                        />
                      </div>
                      <div class="col-1">
                        <!--<q-input
                          v-model.number="respuestaDetalle[50].pdf_material_esp"
                          label="Otros"
                          dense
                          :min="0"
                        />-->
                      </div>
                      <div class="col-5">
                        <span>cocina </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[51].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-1">
                        <q-select
                          v-model="respuestaDetalle[51].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[51].pdf_tipo_cocina"
                          :options="consulta.tipoCocina"
                          label="TIPO DE COCINA"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[51].pdf_tipo_cocina_esp"
                          filled
                          label="DEFINIR OTROS"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>mesa de trabajo </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[52].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[52].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[52].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[52].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>cucharones </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[53].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[53].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[53].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[53].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>ollas </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[54].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[54].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[54].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[54].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>perol </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[55].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[55].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[55].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[55].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>licuadora </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[56].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[56].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[56].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[56].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>cuchillos </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[57].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[57].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[57].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[57].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>tablas de picar </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[58].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[58].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[58].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[58].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>jarra medidora </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[59].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[59].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[59].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[59].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-5">
                        <span>tachos con tapa para basura </span>
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model.number="respuestaDetalle[60].pdf_cantidad"
                          type="number"
                          filled
                          label="CANTIDAD"
                          dense
                          :min="0"
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[60].pdf_estado"
                          :options="consulta.estado"
                          label="ESTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[60].pdf_material"
                          :options="consulta.material"
                          label="MATERIAL"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>
                      <div class="col-1">
                        <q-input
                          v-model.number="respuestaDetalle[60].pdf_material_esp"
                          label="Otros"
                          dense
                        />
                      </div>

                      <div class="col-12">
                        <p><b>SERVICIO DE ALIMENTOS</b></p>
                      </div>

                      <div class="col-6">
                        <span
                          >1.-El menaje, vajilla, cubiertos, vasos, deben estar
                          en buen estado de conservación e higiene (de material
                          sanitario), los de material de vidrio o similares,
                          deben estar íntegros.
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[61].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[61].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[61].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[61].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[61].imagenes != null"
                              >{{ respuestaDetalle[61].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput62.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[61].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[61].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput62"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[61].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >2.-El mobiliario y mantelería deben estar en buen
                          estado de conservación e higiene
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[62].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[62].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[62].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[62].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[62].imagenes != null"
                              >{{ respuestaDetalle[62].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput63.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[62].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[62].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput63"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[62].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Cuentan con personal exclusivo para el servido de los
                          alimentos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[63].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[63].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[63].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[63].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[63].imagenes != null"
                              >{{ respuestaDetalle[63].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput64.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[63].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[63].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput64"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[63].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p>
                          <b
                            >TRANSPORTE DE ALIMENTOS AL LUGAR DE CONSUMO(DE
                            CORRESPONDER)</b
                          >
                        </p>
                      </div>

                      <div class="col-6">
                        <span
                          >1.-El vehículo debe ser exclusivo para transportar
                          alimentos y debe estar higienizado antes de
                          transportar los alimentos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[64].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[64].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[64].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[64].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[64].imagenes != null"
                              >{{ respuestaDetalle[64].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput65.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[64].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[64].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput65"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[64].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>DE LOS MANIPULADORES</b></p>
                      </div>

                      <div class="col-6">
                        <span
                          >Todo el personal manipulador cuenta con carné de
                          sanidad vigente
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[65].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[65].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[65].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[65].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[65].imagenes != null"
                              >{{ respuestaDetalle[65].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput66.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[65].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[65].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput66"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[65].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Asuencia de signos de engfermedad (heridas, tos,
                          estornudos)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[66].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[66].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[66].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[66].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[66].imagenes != null"
                              >{{ respuestaDetalle[66].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput67.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[66].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[66].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput67"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[66].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p>Usan uniforme completo</p>
                      </div>

                      <div class="col-6">
                        <span>a.-Chaqueta de color claro y limpia </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[67].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[67].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[67].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[67].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[67].imagenes != null"
                              >{{ respuestaDetalle[67].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput68.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[67].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[67].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput68"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[67].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>b.-Pantalón de color claro y limpio </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[68].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[68].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[68].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[68].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[68].imagenes != null"
                              >{{ respuestaDetalle[68].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput69.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[68].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[68].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput69"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[68].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>c.-Mascarilla </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[69].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[69].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[69].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[69].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[69].imagenes != null"
                              >{{ respuestaDetalle[69].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput70.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[69].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[69].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput70"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[69].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>d.-Guantes </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[70].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[70].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[70].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[70].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[70].imagenes != null"
                              >{{ respuestaDetalle[70].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput71.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[70].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[70].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput71"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[70].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >e.-Mandil (atado al cuerpo que evite la contaminación
                          del alimento o accidentes de trabajo)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[71].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[71].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[71].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[71].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[71].imagenes != null"
                              >{{ respuestaDetalle[71].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput72.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[71].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[71].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput72"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[71].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>f.-Gorro (que cubra todo el cabello) </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[72].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[72].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[72].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[72].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[72].imagenes != null"
                              >{{ respuestaDetalle[72].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput73.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[72].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[72].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput73"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[72].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >g.-Zapatos cerrados y antideslizantes de color claro
                          y limpio
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[73].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[73].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[73].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[73].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[73].imagenes != null"
                              >{{ respuestaDetalle[73].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput74.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[73].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[73].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput74"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[73].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Uniforme de uso exclusivo en las áreas de trabajo
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[74].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[74].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[74].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[74].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[74].imagenes != null"
                              >{{ respuestaDetalle[74].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput75.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[74].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[74].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput75"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[74].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Manos limpias, sin joyas, uñas limpias, cortas y sin
                          esmalte
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[75].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[75].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[75].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[75].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[75].imagenes != null"
                              >{{ respuestaDetalle[75].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput76.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[75].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[75].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput76"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[75].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Aplican principios de higiene en la manipulación de
                          alimentos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[76].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[76].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[76].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[76].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[76].imagenes != null"
                              >{{ respuestaDetalle[76].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput77.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[76].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[76].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput77"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[76].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Han recibido capacitación por parte del programa
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[77].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[77].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[77].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[77].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[77].imagenes != null"
                              >{{ respuestaDetalle[77].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput78.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[77].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[77].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput78"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[77].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Han recibido capacitación por parte del MINSA
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[78].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[78].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[78].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[78].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[78].imagenes != null"
                              >{{ respuestaDetalle[78].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput79.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[78].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[78].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput79"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[78].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>COMEDOR</b></p>
                      </div>

                      <div class="col-12">
                        <span
                          >Se dispone de un lugar exclusivo para el consumo de
                          alimentos
                        </span>
                      </div>

                      <div class="col-6">
                        <span>a.-Consumen en comedor con mesas y sillas </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[79].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[79].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[79].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[79].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[79].imagenes != null"
                              >{{ respuestaDetalle[79].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput80.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[79].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[79].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput80"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[79].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >b.-Consumen en el comedor sin mesas o sillas
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[80].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[80].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[80].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[80].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[80].imagenes != null"
                              >{{ respuestaDetalle[80].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput81.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[80].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[80].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput81"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[80].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>c.-Consumen en el salón de clases </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[81].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[81].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[81].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[81].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[81].imagenes != null"
                              >{{ respuestaDetalle[81].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput82.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[81].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[81].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput82"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[81].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span>d.-Para llevar </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[82].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[82].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[82].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[82].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[82].imagenes != null"
                              >{{ respuestaDetalle[82].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput83.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[82].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[82].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput83"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[82].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-6">
                        <span
                          >Existe un área de lavado de manos exclusivo para los
                          usuarios y con implementos para el lavado de manos
                          (agua potable, jabón y papel toalla)
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[83].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[83].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[83].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="respuestaDetalle[83].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[83].imagenes != null"
                              >{{ respuestaDetalle[83].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput84.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[83].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[83].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput84"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[83].imagenes"
                        >
                        </q-file>
                      </div>

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
                      <div class="col-12">
                        <p><b>PRÁCTICA DE LIMPIEZA Y DESINFECCIÓN</b></p>
                      </div>
                      <div class="col-12">
                        <p>Equipos limpios y desinfectados</p>
                        <p><b>Ambiente de recepción (de corresponder)</b></p>
                      </div>

                      <div class="col-3">
                        <span>Balanza </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[84].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[84].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[84].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[84].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[84].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[84].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[84].imagenes != null"
                              >{{ respuestaDetalle[84].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput85.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[84].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[84].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput85"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[84].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Termómetro </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[85].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[85].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[85].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[85].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[85].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[85].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[85].imagenes != null"
                              >{{ respuestaDetalle[85].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput86.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[85].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[85].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput86"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[85].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>Ambiente de almacenamiento</b></p>
                      </div>

                      <div class="col-3">
                        <span>Parihuelas </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[86].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[86].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[86].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[86].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[86].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[86].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[86].imagenes != null"
                              >{{ respuestaDetalle[86].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput87.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[86].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[86].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput87"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[86].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Jabas </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[87].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[87].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[87].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[87].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[87].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[87].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[87].imagenes != null"
                              >{{ respuestaDetalle[87].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput88.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[87].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[87].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput88"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[87].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Balanza </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[88].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[88].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[88].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[88].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[88].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[88].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[88].imagenes != null"
                              >{{ respuestaDetalle[88].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput89.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[88].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[88].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput89"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[88].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Refrigeradora </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[89].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[89].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[89].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[89].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[89].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[89].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[89].imagenes != null"
                              >{{ respuestaDetalle[89].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput90.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[89].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[89].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput90"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[89].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Congeladora </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[90].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[90].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[90].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[90].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[90].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[90].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[90].imagenes != null"
                              >{{ respuestaDetalle[90].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput91.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[90].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[90].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput91"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[90].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>Ambiente de preparación</b></p>
                      </div>

                      <div class="col-3">
                        <span>Cocina </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[91].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[91].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[91].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[91].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[91].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[91].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[91].imagenes != null"
                              >{{ respuestaDetalle[91].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput92.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[91].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[91].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput92"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[91].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Mesa de trabajo (preparación) </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[92].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[92].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[92].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[92].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[92].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[92].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[92].imagenes != null"
                              >{{ respuestaDetalle[92].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput93.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[92].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[92].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput93"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[92].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Mesa de trabajo (servido) </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[93].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[93].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[93].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[93].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[93].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[93].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[93].imagenes != null"
                              >{{ respuestaDetalle[93].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput94.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[93].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[93].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput94"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[93].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Lavado </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[94].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[94].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[94].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[94].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[94].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[94].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[94].imagenes != null"
                              >{{ respuestaDetalle[94].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput95.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[94].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[94].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput95"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[94].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Licuadora </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[95].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[95].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[95].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[95].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[95].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[95].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[95].imagenes != null"
                              >{{ respuestaDetalle[95].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput96.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[95].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[95].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput96"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[95].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Ollas </span>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[96].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[96].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[96].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[96].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[96].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[96].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[96].imagenes != null"
                              >{{ respuestaDetalle[96].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput97.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[96].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[96].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput97"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[96].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Tabla de picar </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[97].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[97].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[97].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[97].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[97].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[97].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[97].imagenes != null"
                              >{{ respuestaDetalle[97].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput98.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[97].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[97].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput98"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[97].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Picadora/Procesador de alimentos </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[98].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[98].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[98].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[98].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[98].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[98].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[98].imagenes != null"
                              >{{ respuestaDetalle[98].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput99.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[98].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[98].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput99"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[98].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Tacho de basura </span>
                      </div>
                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[99].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[99].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[99].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[99].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[99].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[99].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[99].imagenes != null"
                              >{{ respuestaDetalle[99].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput100.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[99].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[99].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput100"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[99].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <q-input
                          v-model="
                            respuestaDetalle[100].pdf_otro_ambpreparacion
                          "
                          label="otros"
                          dense
                        />
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[100].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[100].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[100].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[100].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[100].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[100].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[100].imagenes != null"
                              >{{ respuestaDetalle[100].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput101.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[100].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[100].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput101"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[100].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>Comedor (de corresponder)</b></p>
                      </div>

                      <div class="col-3">
                        <span>Mesa / Carpeta </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[101].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[101].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[101].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[101].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[101].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[101].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[101].imagenes != null"
                              >{{ respuestaDetalle[101].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput102.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[101].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[101].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput102"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[101].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Sillas </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[102].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[102].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[102].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[102].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[102].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[102].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[102].imagenes != null"
                              >{{ respuestaDetalle[102].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput103.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[102].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[102].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput103"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[102].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Lavadero de manos </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[103].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[103].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[103].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[103].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[103].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[103].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[103].imagenes != null"
                              >{{ respuestaDetalle[103].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput104.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[103].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[103].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput104"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[103].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-3">
                        <span>Tacho de basura </span>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[104].pdf_limpio"
                          :options="consulta.limpio"
                          label="LIMPIO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2">
                        <q-select
                          v-model="respuestaDetalle[104].pdf_desinfectado"
                          :options="consulta.desinfectado"
                          label="DESINFECTADO"
                          option-value="codigo"
                          option-label="descripcion"
                          emit-value
                          map-options
                          dense
                          outlined
                          ref="iiee"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
                        ></q-select>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[104].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[104].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[104].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[104].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[104].imagenes != null"
                              >{{ respuestaDetalle[104].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput105.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[104].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[104].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput105"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[104].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-7">
                        <span
                          >Ambiente para utensilios de distribución de
                          alimentos, limpios y de uso exclusivo
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[105].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[105].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[105].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[105].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[105].imagenes != null"
                              >{{ respuestaDetalle[105].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput106.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[105].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[105].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput106"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[105].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-7">
                        <span
                          >Mobiliario y utensilios para distribución de
                          alimentos limpio y desinfectado
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[106].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[106].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[106].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[106].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[106].imagenes != null"
                              >{{ respuestaDetalle[106].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput107.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[106].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[106].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput107"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[106].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-7">
                        <span>
                          La I.E cuenta con área de disposición y almacenamiento
                          de residuos sólidos
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[107].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[107].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[107].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[107].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[107].imagenes != null"
                              >{{ respuestaDetalle[107].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput108.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[107].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[107].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput108"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[107].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-12">
                        <p><b>PREVENCIÓN Y CONTROL DE VECTORES</b></p>
                      </div>

                      <div class="col-7">
                        <span
                          >La I.E cuenta con medidas destinadas a evitar el
                          ingreso de insectos, roedores u otras plagas a las
                          áreas de elaboración
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[108].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[108].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[108].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[108].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[108].imagenes != null"
                              >{{ respuestaDetalle[108].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput109.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[108].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[108].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput109"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[108].imagenes"
                        >
                        </q-file>
                      </div>

                      <div class="col-7">
                        <span
                          >Los productos químicos y biológicos se guardan bajo
                          estrictas medidas de seguridad
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuestaDetalle[109].pdf_cumplimiento"
                          :val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuestaDetalle[109].pdf_cumplimiento"
                          :val="1"
                          label="NO"
                        />
                        <q-radio
                          v-model="respuestaDetalle[109].pdf_cumplimiento"
                          :val="2"
                          label="NO CORRESPONDE"
                        />
                      </div>

                      <div class="col-2">
                        <q-input
                          v-model="respuestaDetalle[109].pdf_observacion"
                          label="Observación"
                          dense
                        />
                      </div>

                      <div class="row col-1">
                        <q-field
                          style="width: 100%"
                          label="Img"
                          dense
                          outlined
                          filled
                          stack-label
                          :disable="this.paramEnvio.operacion == 'CON'"
                        >
                          <template v-slot:control>
                            <span
                              v-if="respuestaDetalle[109].imagenes != null"
                              >{{ respuestaDetalle[109].imagenes.name }}</span
                            >
                          </template>
                          <template v-slot:append>
                            <q-icon
                              name="attach_file"
                              @click="$refs.fileInput110.pickFiles()"
                              class="text-blue cursor-pointer"
                            />
                            <q-icon
                              v-if="respuestaDetalle[109].imagenes != null"
                              name="cancel"
                              @click="respuestaDetalle[109].imagenes = null"
                              class="text-blue cursor-pointer"
                            />
                          </template>
                        </q-field>
                        <q-file
                          style="display: none"
                          ref="fileInput110"
                          accept=".jpg"
                          @rejected="eventoRechazo"
                          v-model="respuestaDetalle[109].imagenes"
                        >
                        </q-file>
                      </div>

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
                          @click="EjecucionGuardado('COM')"
                          :disable="
                            paramEnvio.operacion == 'CON' ? true : false
                          "
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
                v-model="respuestaCabecera[0].pfObservacionesGeneral"
                filled
                type="textarea"
                counter
                maxlength="250"
              >
              </q-input>
            </div>
          </div>

          <div class="col-10" v-if="accion == '2'"></div>
          <div class="col-2" v-if="accion == '2'">
            <q-btn
              color="red"
              icon-left="add"
              label="Finalizar"
              @click="EjecucionGuardado('OBS')"
              :disable="paramEnvio.operacion == 'CON' ? true : false"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="center" class="bg-white text-teal">
      <q-btn
        ref="cancelar"
        class="botonFinalizar"
        :dense="true"
        label="Cancelar"
        v-close-popup
        @click="eventoCancelar()"
      />

      <div>{{ date }}</div>
      <!--v-close-popup-->

      <q-dialog v-model="EsConfirmacionRegistroSAC" persistent>
        <MantenimientoRegistroSAC
          :paramEnvioConfirmacion="ParamConfirmacionRegistroSAC"
          @estado-confirmacion="estadoFinalGU"
        ></MantenimientoRegistroSAC>
      </q-dialog>

      <q-dialog v-model="EsRegistroResponsableSAC" persistent max-width="300px">
        <RegistroResponsableSAC
          :ParamResponsableSAC="ParamRegistroResponsable"
          @estado-confirmacion="estadoFinal"
        ></RegistroResponsableSAC>
      </q-dialog>
    </q-card-actions>
  </q-card>
</template>

<script>
import MantenimientoRegistroSAC from "src/components/MantenimientoRegistroSAC.vue";
import RegistroResponsableSAC from "src/components/RegistroResponsableSAC.vue";

export default {
  props: {
    paramEnvio: Object,
  },
  components: {
    MantenimientoRegistroSAC,
    RegistroResponsableSAC,
  },
  data() {
    return {
      date: null,
      ParamRegistroResponsable: {
        pie_id: null,
      },
      EsRegistroResponsableSAC: false,
      yaEjecutado: false,
      EsConfirmacionRegistroSAC: false,

      ParamConfirmacionRegistroSAC: {
        codigo: "",
        tipo: "",
        titulo: "",
        mensaje1: "",
        mensaje2: "",
        valores: [],
        operacion: "",
        valoresCombinado: [],
        listaArchivo: {
          evidencia01: null,
          evidencia02: null,
        },
      },

      evidencia01: null,
      evidencia02: null,
      tab: "seccion-3",
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
        estado: [
          { codigo: 1, descripcion: "BUENO" },
          { codigo: 2, descripcion: "REGULAR" },
          { codigo: 3, descripcion: "MALO" },
        ],
        material: [
          { codigo: 1, descripcion: "ACERO INOXIDABLE" },
          { codigo: 2, descripcion: "PLASTICO" },
          { codigo: 3, descripcion: "MADERA" },
          { codigo: 4, descripcion: "OTROS" },
        ],
        limpio: [
          { codigo: 1, descripcion: "SI" },
          { codigo: 0, descripcion: "NO" },
        ],
        desinfectado: [
          { codigo: 1, descripcion: "SI" },
          { codigo: 0, descripcion: "NO" },
        ],
        tipoCocina: [
          { codigo: 1, descripcion: "LA COCINA ES A GAS" },
          { codigo: 2, descripcion: "LA COCINA ES A KEROSENE" },
          { codigo: 3, descripcion: "LA COCINA ES ELECTRICA" },
          { codigo: 4, descripcion: "OTROS" },
        ],

        vigencia: [
          { codigo: 1, descripcion: "SI" },
          { codigo: 0, descripcion: "NO" },
        ],

        reponsable: [],

        raciones: [
          { codigo: 1, descripcion: "CALIENTE" },
          { codigo: 2, descripcion: "LISTA PARA CONSUMO" },
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
      },

      respuestaCabecera: [
        {
          pf_definicion: null,
          pf_id: null,
          pie_id: null,
          pf_fecha_ini: null,
          pf_fecha_fin: null,
          pf_nummanipuladores: null,
          pf_ubiseralimentacion: null,
          pf_racionesrecibieron: null,
          pf_derracionesrecibieron: null,
          pf_nusuarios: null,
          pf_resultado: null,
          pf_estado: null,
          pf_ultimoHito: null,
          pfObservacionesGeneral: null,
          pr_id: null,
        },
      ],

      respuestaDetalle: [],

      listaInstitucione1: [],

      listaInstitucione2: [],

      definicionUbigeo: {
        departamento: "",
        provincia: "",
        distrito: "",
      },

      listaDetalleSola: [],
    };
  },

  updated() {
    if (this.yaEjecutado == false) {
      console.log("ya ingrese aqui");
      this.ConsultaCabecera();
      this.ConsultaDetalleFicha();
      this.ConsultaInstituciones();
      this.yaEjecutado = true;
    }
  },

  created() {
    this.definicionUbigeo.departamento = this.paramEnvio.departamento;
    this.definicionUbigeo.provincia = this.paramEnvio.provincia;
    this.definicionUbigeo.distrito = this.paramEnvio.distrito;

    if (this.paramEnvio.operacion == "CON") {
      this.ConsultaCabecera();

      this.ConsultaDetalleFicha();
      this.ConsultaInstituciones();

      if (this.paramEnvio.resultado == 1) {
        this.accion = 1;
      } else if (this.paramEnvio.resultado == 2) {
        this.accion = 2;
      } else {
        this.accion = null;
      }
    } else if (this.paramEnvio.operacion == "MOD") {
      this.ConsultaCabecera();
      this.ConsultaDetalleFicha();
      this.ConsultaInstituciones();
      if (this.respuestaCabecera[0].pfObservacionesGeneral == null) {
        this.accion = 1;
      } else {
        this.accion = 2;
      }
    }
  },

  methods: {
    estadoFinalGU(e) {
      if (e == true) {
        this.$emit("estado-vistaRegistroSAC", true);
        this.$refs.cancelar.$el.click();
      }
    },

    eventoCancelar() {
      this.$emit("estado-vistaRegistroSAC", true);
    },

    mostrarAhora() {
      this.ConsultaDetalleFicha();
    },

    ConsultaResponsableIE() {
      let datos = new FormData();
      datos.append("codigoInstitucion", this.respuestaCabecera[0].pie_id);
      this.$axios
        .post(
          this.$apiUrl + "Instituciones/consultar_personalIIEE",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
            this.consulta.reponsable = response.data;
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },

    estadoFinal(e) {
      console.log(e);
      this.ConsultaResponsableIE();
      this.respuestaCabecera[0].pr_id = e.codigo;
      //this.$refs.iieeyy.$el.textContent = e.nombre;

      //this.respuestaCabecera[0].pr_id = e.codigo;
    },

    mostrarNuevoResponsable() {
      this.ParamRegistroResponsable.pie_id = this.respuestaCabecera[0].pie_id;
      this.EsRegistroResponsableSAC = true;
    },

    verificacion() {
      var indice = this.listaInstitucione1.findIndex(
        (f) => f.pie_id === this.respuestaCabecera[0].pie_id
      );

      this.definicionUbigeo.departamento =
        this.listaInstitucione1[indice].ub_nombdep;
      this.definicionUbigeo.provincia =
        this.listaInstitucione1[indice].ub_nombprov;
      this.definicionUbigeo.distrito =
        this.listaInstitucione1[indice].ub_nombdist;

      this.ConsultaResponsableIE();
    },

    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.listaInstitucione1 = this.listaInstitucione2;
        this.listaInstitucione1 = this.listaInstitucione2.filter(
          (v) => v.pie_definicion.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    eventoRechazo: function () {
      this.$q.notify("TIPO DE ARCHIVO NO SOPORTADO");
    },

    EjecucionGuardado(tipoOperacion) {
      if (tipoOperacion == "COM") {
        (this.respuestaCabecera[0].pf_resultado = 1),
          (this.respuestaCabecera[0].pf_estado = 2);
      } else {
        (this.respuestaCabecera[0].pf_resultado = 2),
          (this.respuestaCabecera[0].pf_estado = 2);
      }

      (this.ParamConfirmacionRegistroSAC.codigo = "001"),
        (this.ParamConfirmacionRegistroSAC.titulo =
          "Confirmación de Cierre Evento"),
        (this.ParamConfirmacionRegistroSAC.valores = this.respuestaCabecera),
        (this.ParamConfirmacionRegistroSAC.operacion = tipoOperacion),
        (this.ParamConfirmacionRegistroSAC.valoresCombinado =
          this.respuestaDetalle),
        (this.ParamConfirmacionRegistroSAC.tipo = this.paramEnvio.operacion),
        (this.ParamConfirmacionRegistroSAC.mensaje1 =
          "Se va a finalizar el registro, desea realizar el cierre de Ficha"),
        (this.ParamConfirmacionRegistroSAC.mensaje2 = `¿Desea realizar el cierre de la Ficha?`),
        (this.EsConfirmacionRegistroSAC = true);
    },

    ConsultaDetalleFicha() {
      let datos = new FormData();
      datos.append("codigoFicha", this.paramEnvio.codigo);
      this.$axios
        .post(
          this.$apiUrl + "fichas/ConsultaDetalle",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
            this.respuestaDetalle = response.data;
            console.log(response.data);
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },

    ConsultaInstituciones() {
      let datos = new FormData();
      this.$axios
        .post(
          this.$apiUrl + "Instituciones/ConsultaInstituciones",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
            this.listaInstitucione1 = response.data;
            this.listaInstitucione2 = response.data;
            console.log(this.listaInstitucione1);
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },

    ConsultaCabecera() {
      let datos = new FormData();
      datos.append("codigoFicha", this.paramEnvio.codigo);
      this.$axios
        .post(
          this.$apiUrl + "fichas/ConsultaCabecera",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
            console.log(response.data);
            this.respuestaCabecera = [];
            this.respuestaCabecera = response.data;
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },

    consultaProvincia() {},

    consultaDistrito() {},

    avanzarHito03() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-3";
    },

    retrocederHito02() {
      this.tab = "seccion-2";
    },

    iniciarPreGuardado() {
      if (this.paramEnvio.operacion != "CON") {
        this.preparacionDataDetalle();
        this.guardadoAutomatico();
      }
    },

    guardadoAutomatico() {
      (this.respuestaCabecera[0].pf_resultado = 0),
        (this.respuestaCabecera[0].pf_estado = 1);
      let datos = new FormData();
      datos.append("json", JSON.stringify(this.respuestaCabecera));
      datos.append("jsonDetalle", JSON.stringify(this.listaDetalleSola));
      this.$axios
        .post(
          this.$apiUrl + "fichas/GCabeceraDetalle",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
          }
        })
        .catch((e) => {})

        .finally(() => {
          this.mostrarMensaje(
            "SE REALIZO EL PRE GUARDADO",
            "orange",
            "check_circle"
          );
        });
    },

    mostrarMensaje: function (mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        icon: icono,
        position: "top-right",
      });
    },

    preparacionDataDetalle() {
      this.respuestaDetalle.forEach((p) => {
        this.listaDetalleSola.push({
          pdf_id: p.pdf_id,
          pp_id: p.pp_id,
          pdf_cumplimiento: p.pdf_cumplimiento,
          pdf_observacion: p.pdf_observacion,
          pdf_posicion: p.pdf_posicion,
          pdf_cantidad: p.pdf_cantidad,
          pdf_estado: p.pdf_estado,
          pdf_material: p.pdf_material,
          pdf_material_esp: p.pdf_material_esp,
          pdf_vigencia: p.pdf_vigencia,
          pdf_fecha_caducidad: p.pdf_fecha_caducidad,
          pdf_tipo_cocina: p.pdf_tipo_cocina,
          pdf_tipo_cocina_esp: p.pdf_tipo_cocina_esp,
          pdf_limpio: p.pdf_limpio,
          pdf_desinfectado: p.pdf_desinfectado,
          pdf_otro_ambpreparacion: p.pdf_otro_ambpreparacion,
        });
      });
    },

    avanzarHito04() {
      this.iniciarPreGuardado();
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-4";
    },

    retrocederHito04() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-4";
    },

    retrocederHito03() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-3";
    },

    avanzarHito05() {
      this.iniciarPreGuardado();
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-5";
    },

    retrocederHito06() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-6";
    },

    retrocederHito05() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-5";
    },

    avanzarHito06() {
      this.iniciarPreGuardado();
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      this.tab = "seccion-6";
    },

    RegistroGuardar() {
      console.log(this.respuestaCabecera);
      console.log(this.respuestaDetalle);
      alert("Se registro todo Correctamente");
    },

    estadoConfirmacionRegistroSAC() {},
  },
};
</script>

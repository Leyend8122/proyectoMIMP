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

                      <div class="col-12">
                         <p><b>RECEPCION</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Alimentos de proveedores autorizados
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II01"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >2.-Medio de transporte cerrado, limpio y exclusivo para alimentos				
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >3.-Productos frescos con caracterísitcas de calidad (organolépticas)		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II03"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >4.-Alimentos perecibles que mantienen la cadena de frio			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II04"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >5.-Productos envasados con registro sanitario y norma de rotulado			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II05"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >6.-Inspección sanitaria por personal calificado		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I01II06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I01II06"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-12">
                         <p><b>ALMACENAMIENTO</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Ambiente de uso exclusivo para el almacenamiento				
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Ambiente limpio, seco, ventilado e iluminado			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II02"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >3.-Alimentos secos sobre tarimas o similares
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II03"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >4.-Durante el almacenamiento el empaque garantiza la protección del producto y este es de primer uso	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II04"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >5.-Aplica cadena de frío en conservación de alimentos perecibles			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II05"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >6.-Aplica principio de rotación de stock (PEPS primero en entrar, primero en salir)		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II06"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >7.-Se dispone de equipos de control de temperatura y se realiza el monitoreo constante de la temperatura	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II07"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II07"
                          val="1"
                          label="NO"
                        />
                      </div>


                    <div class="col-10">
                        <span
                          >8.-Cuenta con un control de ingreso y salida de los alimentos (KARDEX)	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I02II08"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I02II08"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-12">
                         <p><b>PREPARACIÓN</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Ambiente de cocina limpia y desinfectada			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Agua segura para preparar alimentos (cloro residual 0.5 ppm)			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II02"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >3.-Se aplica el flujo lineal (recto o en U) durante la preparación de los alimentos (preparación previa - preparación final - servido)	de cocina limpia y desinfectada			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II03"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >4.-No existe riesgo de contaminación cruzada (por operaciones, utensilio, manipulador, etc.)	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II04"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >5.-Utiliza tablas de picar diferenciadas para los productos crudos y cocidos		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II05"
                          val="1"
                          label="NO"
                        />
                      </div>

                   <div class="col-10">
                        <span
                          >6.-Para las preparaciones se utiliza aceite de aspecto limpio y sin olor rancio
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II06"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >7.-Aplica cadena de frío en conservación de alimentos perecibles
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II07"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II07"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >8.-Perapaciones calientes se mantienen a temperatura superiores a 70°C.			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II08"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II08"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >9.-Lavan y desinfectan las frutas y verduras de tallo corto de consumo directo (crudos).			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II09"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II09"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >10.-Se dispone de equipos de control de temperatura y se realiza el monitoreo de la temperatura		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I03II10"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I03II10"
                          val="1"
                          label="NO"
                        />
                      </div>
                      
                      <div class="col-12">
                         <p><b>SERVICIO DE ALIMENTOS</b></p>
                      </div>


                      <div class="col-10">
                        <span
                          >1.-El menaje, vajilla, cubiertos, vasos, deben estar en buen estado de conservación e higiene (de material sanitario), los de material de vidrio o similares, deben estar íntegros.		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I04II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I04II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-El mobiliario y mantelería deben estar en buen estado de conservación e higiene			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I04II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I04II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-12">
                         <p><b>TRANSPORTE DE ALIMENTOS AL LUGAR DE CONSUMO(DE CORRESPONDER)</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-El vehículo debe ser exclusivo para transportar alimentos y debe estar higienizado antes de transportar los alimentos			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I05II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I05II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >2.-Los procesos, frecuencias y responsables de la limpieza, higiene y desinfección de los vehículos, deben contemplarse en el programa de higiene y saneamiento del servicio de alimentación. (constatar con su manual del PHS)			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I05II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I05II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-12">
                         <p><b>DE LOS MANIPULADORES</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Todo el personal manipulador cuenta con carné de sanidad vigente		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II01"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >2.-Asuencia de signos de engfermedad (heridas, tos, estornudos)	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >3.-Usan uniforme completo: mascarilla, guantes (de corresponder), mandil (atado al cuerpo que evite la contaminación del alimento o accidentes de trabajo), gorro (que cubra todo el cabello), zapatos cerrados y antideslizantes, de color claro y limpio			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II03"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >4.-Uniforme de uso exclusivo en las áreas de trabajo		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II04"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >5.-Manos limpias, sin joyas, uñas limpias, cortas y sin esmalte		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II05"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >6.-Aplican principios de higiene en la manipulación de alimentos			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II06"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II06"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >7.-Reciben capacitaciones continuas (al menos una vez al año)			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II07"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II07"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >8.-Las personas que actúen en calidad de visitantes de las áreas de fabricación, diferentes al personal manipulador cumplen con las medidas de protección y sanitarias reglamentadas			
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I06II08"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I06II08"
                          val="1"
                          label="NO"
                        />
                      </div>


                  <div class="col-12">
                         <p><b>COMEDOR</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Se dispone de un lugar exclusivo para el consumo de alimentos		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I07II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I07II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Existe un área de lavado de manos exclusivo para los usuarios y con implementos para el lavado de manos (agua potable, jabón y papel toalla)		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S04I07II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S04I07II02"
                          val="1"
                          label="NO"
                        />
                      </div>







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
                        <div class="col-12">
                         <p><b>PRÁCTICA DE LIMPIEZA Y DESINFECCIÓN</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-Equipos de material inocuo, desmontables, limpios y desinfectados		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I01II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I01II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >2.-Ambiente para utensilios de distribución de alimentos, limpios y de uso exclusivo	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I01II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I01II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-10">
                        <span
                          >3.-Mobiliario y utensilios para distribución de alimentos limpio y desinfectado		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I01II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I01II03"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >4.-El PHS debe considerar la renovación, mantenimiento de equipos, y utensilios que asegure el buen funcionamiento y condición sanitaria de los mismos (evidenciar en el manual)		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I01II04"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I01II04"
                          val="1"
                          label="NO"
                        />
                      </div>


                      <div class="col-10">
                        <span
                          >5.-Se cuenta con área de dispocisión y almacenamiento de residuos sólidos		
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I01II05"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I01II05"
                          val="1"
                          label="NO"
                        />
                      </div>

                      <div class="col-12">
                         <p><b>PREVENCIÓN Y CONTROL DE VECTORES</b></p>
                      </div>

                      <div class="col-10">
                        <span
                          >1.-El PHS contempla medidas preventivas y de control, descritas, documentadas y supervisadas por el responsable de esta actividad	
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I02II01"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I02II01"
                          val="1"
                          label="NO"
                        />
                      </div>

                       <div class="col-10">
                        <span
                          >2.-El establecimiento cuenta con medidas destinadas a evitar el ingreso de insectos, roedores u otras plagas a las áreas de elaboración
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I02II02"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I02II02"
                          val="1"
                          label="NO"
                        />
                      </div>

                    <div class="col-10">
                        <span
                          >3.-Los productos químicos y biológicos se guardan bajo estrictas medidas de seguridad
                        </span>
                      </div>

                      <div class="col-2" style="margin-top: -10px">
                        <q-radio
                          v-model="respuesta.S05I02II03"
                          val="0"
                          label="SI"
                        />
                        <q-radio
                          v-model="respuesta.S05I02II03"
                          val="1"
                          label="NO"
                        />
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
                            <div style="max-width: 800px">
                              <q-input
                                v-model="respuesta.observacion"
                                filled
                                type="textarea"
                                counter
                                maxlength="250"
                                label="Observacion"
                              >
                              </q-input>
                            </div>
                      </div>

                      <div class="col-12">
                        <p><b>EVIDENCIA</b></p>
                      </div>
                      <div class="col-2">
                                  <q-field style="width: 100%;" label="Primera Evidencia" dense outlined filled stack-label :disable = "this.paramEnvio.operacion == 'CON'">
                                      <template v-slot:control>
                                        <span v-if="evidencia01!=null">{{ evidencia01.name}}</span>
                                      </template>
                                      <template v-slot:append>
                                        <q-icon name="attach_file" @click="$refs.fileEvidencia01.pickFiles()" class="text-blue cursor-pointer" />
                                        <q-icon v-if="evidencia01!=null" name="cancel" @click="evidencia01=null" class="text-blue cursor-pointer" />
                                      </template>
                                    </q-field>
                                      <q-file style="display: none;" ref="fileEvidencia01" accept=".pdf" @rejected="eventoRechazo"  v-model="evidencia01">
                                          <!--<template #label></template>-->
                                      </q-file>
                      </div>
                      <div class="col-10"></div>
                      <div class="col-12"></div>
                      <div class="col-12"></div>
                      <div class="col-2">
                                    <q-field style="width: 100%;" label="Segunda Evidencia" dense outlined filled stack-label :disable = "this.paramEnvio.operacion == 'CON'">
                                      <template v-slot:control>
                                        <span v-if="evidencia02!=null">{{ evidencia02.name}}</span>
                                      </template>
                                      <template v-slot:append>
                                        <q-icon name="attach_file" @click="$refs.fileEvidencia02.pickFiles()" class="text-blue cursor-pointer" />
                                        <q-icon v-if="evidencia02!=null" name="cancel" @click="evidencia02=null" class="text-blue cursor-pointer" />
                                      </template>
                                    </q-field>
                                      <q-file style="display: none;" ref="fileEvidencia02" accept=".pdf" @rejected="eventoRechazo"  v-model="evidencia02">
                                          <!--<template #label></template>-->
                                      </q-file>
                      </div>
                      <div class="col-10"></div>
                      <div class="col-12"></div>



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
                          @click="EjecucionGuardado()"
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

          <div class="col-10" v-if="accion == '2'"></div>
          <div class="col-2" v-if="accion == '2'">
                <q-btn
                          color="red"
                          icon-left="add"
                          label="Finalizar"
                          @click="EjecucionGuardado()"
                        />
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

      <q-dialog v-model="EsConfirmacionRegistroSAC" persistent>
                  <MantenimientoRegistroSAC :paramEnvioConfirmacion = "ParamConfirmacionRegistroSAC" @estado-confirmacion = "estadoConfirmacionRegistroSAC"></MantenimientoRegistroSAC>
              </q-dialog>

      <!--<q-dialog v-model="EsAvisoConfirmacion" persistent>
                  <AvisosConfirmacionAgenda :paramEnvioAvisos = "paramEnvioAvisos"></AvisosConfirmacionAgenda>
              </q-dialog>-->
    </q-card-actions>
  </q-card>
</template>

<script>
import MantenimientoRegistroSAC from 'src/components/MantenimientoRegistroSAC.vue';
export default {
  props: {
    paramEnvio: Object,
  },
  components:{
    MantenimientoRegistroSAC
  },

  data() {
    return {

      EsConfirmacionRegistroSAC:false,
      ParamConfirmacionRegistroSAC:{
            codigo:'',
            tipo:'',
            titulo:'',
            mensaje1:'',
            mensaje2:'',
            valores: {
              
            },
            listaArchivo:
              {
                evidencia01:null,
                evidencia02:null
              }
      },

      evidencia01:null,
      evidencia02:null,
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
        ]
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


        S04I01II01: "",
        S04I01II02: "",
        S04I01II03: "",
        S04I01II04: "",
        S04I01II05: "",
        S04I01II06: "",


        S04I02II01: "",
        S04I02II02: "",
        S04I02II03: "",
        S04I02II04: "",
        S04I02II05: "",
        S04I02II06: "",
        S04I02II07: "",
        S04I02II08: "",


        S04I03II01: "",
        S04I03II02: "",
        S04I03II03: "",
        S04I03II04: "",
        S04I03II05: "",
        S04I03II06: "",
        S04I03II07: "",
        S04I03II08: "",
        S04I03II09: "",
        S04I03II10: "",


        S04I04II01: "",
        S04I04II02: "",

        S04I05II01: "",
        S04I05II02: "",

        S04I06II01: "",
        S04I06II02: "",
        S04I06II03: "",
        S04I06II04: "",
        S04I06II05: "",
        S04I06II06: "",
        S04I06II07: "",
        S04I06II08: "",

        S04I07II01: "",
        S04I07II02: "",

        S05I01II01: "",
        S05I01II02: "",
        S05I01II03: "",
        S05I01II04: "",
        S05I01II05: "",

        S05I02II01: "",
        S05I02II02: "",
        S05I02II03: "",

      },
    };
  },

  methods: {
    eventoRechazo: function () {
    this.$q.notify('TIPO DE ARCHIVO NO SOPORTADO');
    },

    EjecucionGuardado() {
        this.ParamConfirmacionRegistroSAC.codigo = "001",
        this.ParamConfirmacionRegistroSAC.titulo = "Confirmación de Cierre Evento",
        this.ParamConfirmacionRegistroSAC.valores = this.respuesta,
        this.ParamConfirmacionRegistroSAC.tipo = this.paramEnvio.operacion,
        this.ParamConfirmacionRegistroSAC.mensaje1 = 'Se va a finalizar el registro, desea realizar el cierre de Ficha',
        this.ParamConfirmacionRegistroSAC.mensaje2 = `¿Desea realizar el cierre de la Ficha?`,
        this.EsConfirmacionRegistroSAC = true
    },

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

    estadoConfirmacionRegistroSAC(){

    }
  },
};
</script>

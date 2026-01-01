<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-5"></div>
      <div class="col-4">
        <h6>Registro de Servicio Alimentación Colectiva</h6>
      </div>
      <div class="col-3"></div>

      <div class="col-2">
        <q-select
          v-model="respuesta.ano_"
          :options="consulta.ano"
          label="Año"
          dense
          filled
        />
      </div>

      <div class="col-2">
        <q-select
          v-model="respuesta.mes_"
          :options="consulta.mes"
          label="Mes"
          dense
          filled
          option-value="codigo"
          option-label="descripcion"
          emit-value
          map-options
        />
      </div>

      <div class="col-4">
        <q-input v-model="respuesta.ficha_" label="N Ficha" dense filled />
      </div>

      <div class="col-2"></div>

      <div class="col-2">
        <q-btn color="red" icon-right="search" label="Consulta" @click="listaFicha"/>
      </div>

      <div class="col-10"></div>
      <div class="col-2">
        <q-btn color="green" icon-right="download" label="Descargar" />
      </div>

      <div class="col-2">
        <q-btn
          color="red"
          icon-left="add"
          label="+ Registrar"
          @click="registrarSAC"
        />
      </div>

      <div class="col-12">
        <q-table
          class="my-sticky-header-table"
          :data="listaPrincipal"
          :columns="columnaPrincipal"
          row-key="fuente"
          :pagination="{
            rowsPerPage: 4,
          }"
        >
          <template v-slot:header-cell="props">
            <q-th
              :props="props"
              class="bg-inabif"
              style="background-color: #dee8f5"
            >
              {{ props.col.label }}
            </q-th>
          </template>

          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn-dropdown
                size="sm"
                dropdown-icon="settings"
                class="q-mr-xs"
                no-icon-animation
              >
                <q-list>
                  <q-item v-if="props.row.resultado == 1"
                    clickable
                    v-close-popup
                    @click="mantenimiento('CON', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="search" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section> CONSULTAR </q-item-section>
                  </q-item>

                  <q-item v-if="props.row.resultado != 1"
                    clickable
                    v-close-popup
                    @click="mantenimiento('MOD', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="search" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section> MODIFICAR </q-item-section>
                  </q-item>

                  <!--<q-item
                    clickable
                    v-close-popup
                    @click="mantenimiento('REV', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="delete" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section>  </q-item-section>
                  </q-item>-->

                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="vistaRegistroSAC" full-width persistent>
      <VistaRegistroSAC
        :paramEnvio="ParamVistaRegistroSAC"
        @estado-vistaRegistroSAC="estadoVistaRegistroSAC"
      ></VistaRegistroSAC>
    </q-dialog>
  </div>
</template>

<script>
import VistaRegistroSAC from "src/components/VistaRegistroSAC.vue";
export default {
  components: {
    VistaRegistroSAC,
  },

  data() {
    return {
      consulta: {
        evaluadores: [],

        ano: [2024, 2025, 2026],

        mes: [
          { codigo: 1, descripcion: "ENERO" },
          { codigo: 2, descripcion: "FEBRERO" },
          { codigo: 3, descripcion: "MARZO" },
          { codigo: 4, descripcion: "ABRIL" },
          { codigo: 5, descripcion: "MAYO" },
          { codigo: 6, descripcion: "JUNIO" },
          { codigo: 7, descripcion: "JULIO" },
          { codigo: 8, descripcion: "AGOSTO" },
          { codigo: 9, descripcion: "SEPTIEMBRE" },
          { codigo: 10, descripcion: "OCTUBRE" },
          { codigo: 11, descripcion: "NOVIEMBRE" },
          { codigo: 12, descripcion: "DICIEMBRE" },
        ],
      },

      respuesta: {
        ano_: "",
        mes_: "",
        registra_:'',
        ficha_: ""
      },

      text: "",
      vistaRegistroSAC: false,

      ParamVistaRegistroSAC: {
        usuario: null,
        codigo: null,
        operacion: null,
      },

      listaPrincipal: [
        {
          codigoFicha: "001",
          numeroFicha: "F-001",
          codigoUbigeo: "120501",

          departamento: "Lima",
          provincia: "Cercado de Lima",
          distrito: "Pueblo Libre",

          codigoResponsableIEE: "002",
          nombreResponsableIEE: "JUAN PASCO GUTIERREZ",

          codigoEvaluador: "004",
          nombreEvaluador: "LUCAS CHANCAFE LUPE",

          fechaEvaluacion: "20/02/2025",

          resultado: 1,
          estado: 2,
        },
      ],

      requestConfig: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },

      columnaPrincipal: [
        {
          name: "nombreFicha",
          required: true,
          label: "N° FICHA",
          field: "nombreFicha",
          align: "left",
        },

        {
          name: "fechaRegistro",
          required: true,
          label: "FECHA REGISTRO",
          field: "fechaRegistro",
          align: "left",
        },


        {
          name: "ubigeo",
          required: true,
          label: "UBIGEO",
          field: (a) => this.definicionUbigeo(a),
          align: "left",
        },
        {
          name: "nombreInstitucion",
          required: true,
          label: "INSTITUCION",
          field: "nombreInstitucion",
          align: "left",
        },
        {
          name: "nombreResponsable",
          required: true,
          label: "RESPONSABLE",
          field: "nombreResponsable",
          align: "left",
        },

        {
          name: "resultado",
          required: true,
          label: "RESULTADO",
          field: (a) => this.definicionResultado(a.resultado),
          classes: (a) => this.disenoResultado(a.resultado),
          align: "center",
        },

        {
          name: "estado",
          required: true,
          label: "ESTADO",
          field: (a) => this.definicionEstado(a.estado),
          classes: (a) => this.disenoEstado(a.estado),
          align: "center",
        },
        {
          name: "opciones",
          required: true,
          field: "opciones",
          label: "OPCIONES",
          align: "center",
        },
      ],
    };
  },

  methods: {
    registrarSAC() {
      if ((this.ParamVistaRegistroSAC.operacion = "REG")) {
        this.$nextTick(() => {
          this.AperturaFicha();
        });
        this.vistaRegistroSAC = true;
      }
    },

    estadoVistaRegistroSAC(e) {},

    mantenimiento(condicion, indice) {
      var numeroFicha = this.listaPrincipal[indice].codigoFicha
      if (condicion == "CON") {
        this.ParamVistaRegistroSAC.operacion = "CON"
        this.ParamVistaRegistroSAC.usuario = this.$DATOS_USUARIO.codUsuario
        this.ParamVistaRegistroSAC.codigo = numeroFicha
        this.vistaRegistroSAC = true;
      } else if (condicion == "MOD") {
        this.ParamVistaRegistroSAC.operacion = "MOD"
        this.ParamVistaRegistroSAC.usuario = this.$DATOS_USUARIO.codUsuario
        this.ParamVistaRegistroSAC.codigo = numeroFicha
        this.vistaRegistroSAC = true;
      }
    },

    definicionUbigeo(a) {
      return a.departamento + "/" + a.provincia + "/" + a.distrito;
    },

    definicionResultado(a) {
      var definicion = "";
      switch (a) {
        case 0:
          definicion = "";
          break;
        case 1:
          definicion = "COMPLETO";
          break;

        case 2:
          definicion = "NO CONTESTO LLAMADA";
          break;
      }
      return definicion;
    },

    disenoResultado(a) {
      var diseno = "";
      switch (a) {
        case 0:
          diseno = "text-bold";
          break;
        case 1:
          diseno = "text-bold";
          break;
        case 2:
          diseno = "text-bold";
          break;
      }
      return diseno;
    },

    definicionEstado(a) {
      var definicion = "";
      switch (a) {
        case 0:
          definicion = "PENDIENTE";
          break;
        case 1:
          //definicion = "PENDIENTE";
          break;
        case 2:
          definicion = "CULMINADO";
          break;

        case 3:
          definicion = "ELIMINADA";
          break;
      }
      return definicion;
    },

    disenoEstado(a) {
      var diseno = "";
      switch (a) {
        case 0:
          diseno = "";
          break;
        case 1:
          diseno = "text-primary text-bold";
          break;
        case 2:
          diseno = "text-secondary text-bold";
          break;
        case 3:
          diseno = "text-negative text-bold";
          break;
      }
      return diseno;
    },


    listaFicha() {
      this.respuesta.registra_ = this.$DATOS_USUARIO.codUsuario;

      let datos = new FormData();
      datos.append(
        "Cuerpo",
        JSON.stringify(this.respuesta)
      );

      this.$axios
        .post(this.$apiUrl + "fichas/listaficha", datos, this.requestConfig)
        .then((response) => {
          if (response.data != null) {
             console.log(response.data);
             this.listaPrincipal = response.data;
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },


    AperturaFicha() {
      let datos = new FormData();
      datos.append(
        "codigoUsuario",
        JSON.stringify(this.$DATOS_USUARIO.codUsuario)
      );

      this.$axios
        .post(this.$apiUrl + "fichas/Aperturas", datos, this.requestConfig)
        .then((response) => {
          if (response.data != null) {
            console.log("-------");
            (this.ParamVistaRegistroSAC.usuario =
              this.$DATOS_USUARIO.codUsuario),
              console.log("-------");
            this.ParamVistaRegistroSAC.codigo = response.data;
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {});
    },

    mostrarMensaje: function (mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        icon: icono,
        position: "top-right",
      });
    },
  },
};
</script>

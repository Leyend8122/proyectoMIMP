<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-5"></div>
      <div class="col-4">
        <h6>Registro de Servicio Alimentación Colectiva</h6>
      </div>
      <div class="col-3">
            <b>{{ $DATOS_USUARIO}}</b>
      </div>

      <div class="col-2">
        <q-select
          v-model="respuesta.ano"
          :options="consulta.ano"
          label="Año"
          dense
          filled
        />
      </div>

      <div class="col-2">
        <q-select
          v-model="respuesta.mes"
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
        <q-input v-model="text" label="N Ficha" dense filled />
      </div>

      <div class="col-2"></div>

      <div class="col-2">
        <q-btn color="red" icon-right="search" label="Consulta" />
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
                  <q-item
                    clickable
                    v-close-popup
                    @click="mantenimiento('CON', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="search" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section> Consultar </q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-close-popup
                    @click="mantenimiento('REV', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="delete" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section> Reversion </q-item-section>
                  </q-item>
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
          { codigo: "01", descripcion: "ENERO" },
          { codigo: "02", descripcion: "FEBRERO" },
          { codigo: "03", descripcion: "MARZO" },
          { codigo: "04", descripcion: "ABRIL" },
          { codigo: "05", descripcion: "MAYO" },
          { codigo: "06", descripcion: "JUNIO" },
          { codigo: "07", descripcion: "JULIO" },
          { codigo: "08", descripcion: "AGOSTO" },
          { codigo: "09", descripcion: "SEPTIEMBRE" },
          { codigo: "10", descripcion: "OCTUBRE" },
          { codigo: "11", descripcion: "NOVIEMBRE" },
          { codigo: "12", descripcion: "DICIEMBRE" },
        ],
      },


      respuesta: {
        evaluadores: "",
        ano: "2025",
        mes: "12",
      },

      text: "",
      vistaRegistroSAC: false,

      ParamVistaRegistroSAC: {
        usuario:null,
        codigo:null,
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
          name: "numeroFicha",
          required: true,
          label: "N Ficha",
          field: "numeroFicha",
          align: "left",
        },
        {
          name: "ubigeo",
          required: true,
          label: "Ubigeo",
          field: (a) => this.definicionUbigeo(a),
          align: "left",
        },
        {
          name: "nombreEvaluador",
          required: true,
          label: "Evaluador",
          field: "nombreEvaluador",
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
          if (this.ParamVistaRegistroSAC.operacion = "REG"){
                    this.$nextTick(() => {
                      this.AperturaFicha();
                    })
                    this.vistaRegistroSAC = true;
              
                  
                  
          }
          

    },

    estadoVistaRegistroSAC(e) {},

    mantenimiento(condicion, indice) {
      if (condicion == "CON") {
        this.vistaRegistroSAC = true;
      } else if (condicion == "REV") {
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
          definicion = "";
          break;
        case 1:
          definicion = "PENDIENTE";
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

    AperturaFicha() {
      let datos = new FormData();
      datos.append("codigoUsuario", JSON.stringify(this.$DATOS_USUARIO.codUsuario));

      this.$axios
        .post(this.$apiUrl + "fichas/Aperturas", datos, this.requestConfig)
        .then((response) => {
          if (response.data != null) {
            console.log('-------');
            this.ParamVistaRegistroSAC.usuario = this.$DATOS_USUARIO.codUsuario,
            console.log('-------');
            this.ParamVistaRegistroSAC.codigo = response.data
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {
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



  },
};
</script>

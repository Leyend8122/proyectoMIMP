<template>
  <q-card style="max-width: 60%; width: 100%">
    <q-card-section class="bg-inabif" style="background-color: #dee8f5">
      <div class="subtitulo"></div>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-md">
        <div class="row q-col-gutter-sm">
          <div class="col-4"></div>
          <div class="col-6">
            <p><b>REGISTRO DE RESPONSABLE DE IIEE</b></p>
          </div>
          <div class="col-2"></div>

          <div class="col-3">
            <q-select
              v-model="respuesta.p_tipo_doc_"
              :options="consulta.tipoDocumento"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              label="TIPO DOC"
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuesta.p_nrdocumento_"
              label="DOCUMENTO"
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuesta.p_primer_apellido_"
              label="PRIMER APELLIDO"
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuesta.p_segundo_apellido_"
              label="SEGUNDO APELLIDO"
              dense
              filled
            />
          </div>

          <div class="col-6">
            <q-input
              v-model="respuesta.p_nombres_"
              label="NOMBRES"
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-select
              v-model="respuesta.p_sexo_"
              :options="consulta.sexo"
              label="SEXO"
              option-value="codigo"
              option-label="descripcion"
              emit-value
              map-options
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuesta.p_telefono_1_"
              label="PRIMER TELEFONO"
              dense
              filled
            />
          </div>

          <div class="col-3">
            <q-input
              v-model="respuesta.p_telefono_2_"
              label="SEGUNDO TELEFONO"
              dense
              filled
            />
          </div>

          <div class="col-4">
            <q-input
              v-model="respuesta.p_correo_"
              label="CORREO"
              dense
              filled
            />
          </div>

          <div class="col-5">
            <q-input
              v-model="respuesta.p_direccion_"
              label="DIRECCION"
              dense
              filled
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        class="botonFinalizar"
        @click="guadarResponsableIE()"
        :dense="true"
        label="Aceptar"
      />
      <q-btn
        ref="cancelar"
        class="botonFinalizar"
        :dense="true"
        label="Cancelar"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "tablaEdicion",
  props: {
    ParamResponsableSAC: Object,
  },

  data() {
    return {
      text: null,

      consulta: {
        tipoDocumento: [
          { codigo: 1, descripcion: "DNI" },
          { codigo: 2, descripcion: "CE" },
        ],

        sexo: [
          { codigo: 1, descripcion: "MASCULINO" },
          { codigo: 2, descripcion: "FEMENINO" },
        ],
      },

      respuesta: {
        p_nombres_: "",
        p_primer_apellido_: "",
        p_segundo_apellido_: "",
        p_sexo_: null,
        p_fecha_nacimiento_: null,
        p_telefono_1_: "",
        p_telefono_2_: "",
        p_correo_: "",
        p_direccion_: "",
        p_nrdocumento_: null,
        p_tipo_doc_: "",
        pie_id_: null,
        codigoRegistra_: null,
      },

      codigofinal: [],

      datosRepresentante: {
        codigo: null,
        nombre: "",
      },

      respuestaEnvio: {
        codigo: null,
        nombreCompleto: "",
      },
    };
  },
  methods: {
    guadarResponsableIE() {
      this.respuesta.pie_id_ = this.ParamResponsableSAC.pie_id;
      this.respuesta.codigoRegistra_ = this.$DATOS_USUARIO.codUsuario;

      let datos = new FormData();
      datos.append("Cuerpo", JSON.stringify(this.respuesta));
      this.$axios
        .post(
          this.$apiUrl + "Instituciones/registro_personalIIEE",
          datos,
          this.requestConfig
        )
        .then((response) => {
          if (response.data != null) {
            this.guardadoFinal(response.data);
          }
        })
        .catch((e) => {})

        .finally(() => {});
    },

    guardadoFinal(s) {
      this.datosRepresentante.codigo = s;
      this.datosRepresentante.nombre =
        this.respuesta.p_primer_apellido_ +
        " " +
        this.respuesta.p_segundo_apellido_ +
        " " +
        this.respuesta.p_nombres_;
      this.$emit("estado-confirmacion", this.datosRepresentante);
      this.$refs.cancelar.$el.click();
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

<style scoped>
.estiloBoton {
  font-size: 75%;
  width: 90%;
  background-color: #f56a6a;
  color: white;
}

.botonFinalizar {
  background-color: #f56a6a;
  color: white;
  font-size: 90%;
}
</style>

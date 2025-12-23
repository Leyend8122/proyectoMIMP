<template>
  <q-card>
    <q-card-section class="bg-inabif" style="background-color: #dee8f5">
      <div class="subtitulo">{{ paramEnvioConfirmacion.titulo }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row q-pa-md">
        <div class="row" style="width: 500px; padding-left: 40px">
          {{ paramEnvioConfirmacion.mensaje1 }}
        </div>
        <div class="row row q-pa-md" style="width: 400px; padding-left: 120px">
          <strong>{{ paramEnvioConfirmacion.mensaje2 }}</strong>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        class="botonFinalizar"
        :dense="true"
        label="Aceptar"
        @click="EjecucionOperacion()"
        v-close-popup
      />
      <q-btn
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
    paramEnvioConfirmacion: Object,
  },

  data() {
    return {
      requestConfig: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      resultado: null,
      respuesta: false,

      listaCabecera: [],

      listaDetalleSola: [],
      listaDetalleImagenes: [],

      prepacionConceptoImagen: [],
      prepacionImagen: [],
    };
  },
  methods: {
    preparacionDataDetalleImagenes() {
      this.listaDetalleImagenes.forEach((p) => {
        this.prepacionConceptoImagen.push({ pdf_id: p.pdf_id });
        this.prepacionImagen.push({ imagenes: p.imagenes });
      });

      console.log(this.prepacionConceptoImagen);
      console.log(this.prepacionImagen);
    },

    EjecucionOperacion() {
      this.preparacionDataDetalle();
      this.guardarCabecera();
      this.preparacionDataDetalleImagenes();
      if (this.listaDetalleImagenes.length == 0) {
      } else {
        this.guardarImagenes();
      }
      this.$emit("estado-confirmacion", true);
      this.mostrarMensaje(
        "SE REALIZO EXITOSAMENTE EL REGISTRO DE LA SOLICITUD",
        "green",
        "check_circle"
      );

      /*if (this.paramEnvioConfirmacion.tipo == "REG") {
        this.registroAgenda();
        if ((this.resultado = 1)) {
          this.respuesta = true;
          this.$emit("estado-confirmacion", this.respuesta);
          this.mostrarMensaje(
            "SE REALIZO EXITOSAMENTE EL REGISTRO DE LA SOLICITUD",
            "green",
            "check_circle"
          );
        }
      } else if (this.paramEnvioConfirmacion.tipo == "EVA") {
      } else if (this.paramEnvioConfirmacion.tipo == "MOD") {
      }*/
    },

    preparacionDataDetalle() {
      this.paramEnvioConfirmacion.valoresCombinado.forEach((p) => {
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
        if (p.imagenes != null) {
          this.listaDetalleImagenes.push({
            pdf_id: p.pdf_id,
            imagenes: p.imagenes,
          });
        }
      });
      console.log(this.listaDetalleSola);
      console.log("---------");
      console.log(this.listaDetalleImagenes);
    },

    mostrarMensaje: function (mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        icon: icono,
        position: "top-right",
      });
    },

    guardarCabecera() {
      let datos = new FormData();
      datos.append("json", JSON.stringify(this.paramEnvioConfirmacion.valores));
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

        .finally(() => {});
    },

    guardarImagenes() {
      let datos = new FormData();
      datos.append(
        "metadata",
        new Blob([JSON.stringify(this.prepacionConceptoImagen)], {
          type: "application/json",
        })
      );

      this.prepacionImagen.forEach((file) => {
        datos.append("files", file.imagenes);
      });

      this.$axios
        .post(this.$apiUrl + "fichas/cargaArchivo", datos, this.requestConfig)
        .then((response) => {
          if (response.data != null) {
          }
        })
        .catch((e) => {})

        .finally(() => {});
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

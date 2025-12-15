<template>
  <div class="q-pa-md">
    <div class="row col-12"></div>
    <br /><br /><br /><br /><br /><br /><br /><br />
    <div class="row q-col-gutter-xs">
      <div class="col-5"></div>
      <div class="col-4">
        <h3>Login de PEA</h3>
      </div>
      <div class="col-5"></div>
    </div>

    <div class="row q-col-gutter-xs">
      <div class="col-5"></div>
      <div class="col-4">
        <div class="row">
          <div class="col-12">
            <q-input
              filled
              v-model="datosUsuario.usuario"
              label="Ingreso Usuario"
              icon="search"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon name="person" color="orange" size="30px" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-12">
            <q-input
              filled
              v-model="datosUsuario.contrasena"
              label="Ingreso Contraseña"
              icon="search"
              type="password"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon name="key" color="blue" size="30px" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </div>

        <br />

        <div class="row">
          <div class="col-4"></div>
          <div class="col-5">
            <q-btn
              color="red"
              icon-right="send"
              label="Ingresar"
              @click="validacionCredencial"
            />
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <div class="col-5"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      datosUsuario: {
        usuario: "",
        contrasena: "",
      },

      respuesta: [],

      requestConfig: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };
  },

  methods: {
    validacionCredencial() {
      this.validacionDatos();
    },

    mostrarMensaje: function (mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        icon: icono,
        position: "top-right",
      });
    },

    validacionDatos() {
      let datos = new FormData();
      datos.append("Cuerpo", JSON.stringify(this.datosUsuario));

      this.$axios
        .post(this.$apiUrl + "validacion_usuario", datos, this.requestConfig)
        .then((response) => {
          if (response.data != null) {
            this.respuesta = response.data;
          }
          if (this.respuesta.length == 1) {
            //this.$router.replace("/componentes");

            this.$router.replace({
              path: "/componentes",
              query: this.respuesta[0],
            });
            Vue.prototype.$DATOS_USUARIO = this.respuesta[0];
            //Vue.prototype.$VariableConstante = "AAAA";
          } else {
            this.mostrarMensaje(
              "EL USUARIO O CONTRASEÑA NO SON CORRECTAS",
              "orange",
              "warning"
            );
          }
        })
        .catch((e) => {
          this.mostrarMensaje("EXISTE PROBLEMAS DE REGISTRO", "red", "warning");
        })
        .finally(() => {
          //console.log('Ingrese al finally');
          //this.cargaConsulta.tipoRde = [];
        });
    },
  },
};
</script>

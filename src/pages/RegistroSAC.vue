<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-5"></div>
      <div class="col-4">
        <h6>Registro de Servicio Alimentación Colectiva</h6>
      </div>
      <div class="col-3"></div>

      <div class="col-2">
        <q-select v-model="model" :options="options" label="Año" dense filled />
      </div>

      <div class="col-2">
        <q-select v-model="model" :options="options" label="Mes" dense filled />
      </div>

      <div class="col-4">
        <q-select
          v-model="model"
          :options="options"
          label="Evaluadores"
          dense
          filled
        />
      </div>

      <div class="col-2">
        <q-input v-model="text" label="N Ficha" dense filled />
      </div>

      <div class="col-2">
        <q-btn color="red" icon-right="search" label="Consulta" />
      </div>

      <div class="col-10"></div>
      <div class="col-2">
        <q-btn color="green" icon-right="download" label="Descargar" />
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
                    @click="consultaRegistro('CON', props.rowIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="search" color="red" text-color="white" />
                    </q-item-section>
                    <q-item-section> Consultar </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",

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

          resultado: "EN CURSO",
          estado: 0,
        },
      ],

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
          name: "fechaEvaluacion",
          required: true,
          label: "FECHA EVALUACIÓN",
          field: "fechaEvaluacion",
          align: "center",
        },
        {
          name: "defestado",
          required: true,
          label: "ESTADO",
          field: "defestado",
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
    definicionUbigeo(a) {
      return a.departamento + "/" + a.provincia + "/" + a.distrito;
    },
  },
};
</script>

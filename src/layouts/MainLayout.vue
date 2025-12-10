<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Programa Alimentación Escolar</q-toolbar-title>

        <div @click="irPaginaLogeo">Salir</div>
      </q-toolbar>
    </q-header>

    <!--<q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>-->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-expansion-item
        v-for="item01 in Proceso[0].nombre"
        :key="item01"
        expand-separator
        icon=" mdi mdi-coffee-outline"
        :label="item01"
        class="negative"
      >
        <q-list bordered separator>
          <q-item
            :to="item02.ruta"
            clickable
            v-ripple
            v-for="item02 in Proceso[0].subproceso"
            :key="item02.ruta"
            @click="leftDrawerOpen = false"
          >
            <q-item-section avatar
              ><q-icon :name="item02.icono"
            /></q-item-section>
            <q-item-section>{{ item02.subnombre }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  /*components: {
    EssentialLink,
  },*/
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,

      Proceso: [
        {
          nombre: ["Servicio Alimentacion Colectiva"],
          subproceso: [
            {
              subnombre: "Registro",
              icono: "mdi-file-document-edit-outline",
              ruta: "/componentes/Registro",
            },
            {
              subnombre: "Reporte",
              icono: "mdi-chart-box-outline",
              ruta: "/componentes/Reporte",
            },
          ],
        },
      ],
    };
  },

  methods: {
    irPaginaLogeo() {
      this.$router.replace("/");
    },
  },
};
</script>

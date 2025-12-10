const routes = [
  {
    path: "/componentes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/componentes/Registro",
        component: () => import("pages/RegistroSAC.vue"),
      },
      {
        path: "/componentes/Reporte",
        component: () => import("pages/ReporteSAC.vue"),
      },
    ],
  },

  { path: "/", component: () => import("layouts/Login.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("layouts/Login.vue"),
  },
];

export default routes;

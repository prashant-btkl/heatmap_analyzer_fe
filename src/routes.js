import Dashboard from "views/Dashboard.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "HeatMaps",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
];

export default dashboardRoutes;

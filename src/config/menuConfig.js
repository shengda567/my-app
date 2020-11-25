const menuList = [
  {
    title: "Main page",
    key: "/home",
  },
  {
    title: "Log in",
    key: "/form",
    children: [
      {
        title: "Sign in",
        key: "/login",
      },
      {
        title: "Sign up",
        key: "/register",
      },
    ],
  },

  {
    title: "Cities",
    key: "/city",
  },
  {
    title: "Orders",
    key: "/order",

    btnList: [
      {
        title: "Order details",
        key: "detail",
      },
      {
        title: "Completed orders",

        key: "finish",
      },
    ],
  },
  {
    title: "Employees",
    key: "/user",
  },
  {
    title: "Map",
    key: "/bikeMap",
  },
  {
    title: "Charts",

    key: "/charts",

    children: [
      {
        title: "Bar",
        key: "/charts/bar",
      },
      {
        title: "Pie",
        key: "/charts/pie",
      },
      {
        title: "Line",
        key: "/charts/line",
      },
    ],
  },

  /*{
        title: 'permission',
        key: '/admin/permission'
    },*/
];
export default menuList;

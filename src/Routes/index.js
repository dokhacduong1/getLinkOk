import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import PrivateRoutes from "../Components/PrivateRoutes";

import Register from "../Pages/Register";
import LayoutMain from "../Layout";

import AddKey from "../Pages/AddKey";
import KeyManagement from "../Pages/KeyManagement";
import HelloWord from "../Pages/HelloWord/Index";
import GetKeyUser from "../Pages/GetKeyUser";



export const routes = [
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <GetKeyUser />,
      },
      {
        path: "namicute",
        element: <Login />,
      },
      {
        path: "key/:id",
        element: <GetKeyUser />,
      },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "add-key",
            element: <AddKey />,
          },
          {
            path: "key-management",
            element: <KeyManagement />,
          },
          {
            path: "home",
            element: <HelloWord />,
          },
        ],
      },
    ],
  },
];

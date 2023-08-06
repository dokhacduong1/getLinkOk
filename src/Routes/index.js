import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import PrivateRoutes from "../Components/PrivateRoutes";

import Register from "../Pages/Register";
import LayoutMain from "../Layout";

import AddKey from "../Pages/AddKey";
import KeyManagement from "../Pages/KeyManagement";
import HelloWord from "../Pages/HelloWord/Index";
import GetKeyUser from "../Pages/GetKeyUser";
import AddGame from "../Pages/AddGame";
import GameManagement from "../Pages/GameManagement";
import AddLink from "../Pages/AddLink";
import LinkManagement from "../Pages/LinkManagement";



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
            path: "add-game",
            element: <AddGame />,
          },
          {
            path: "game-management",
            element: <GameManagement />,
          },
          {
            path: "add-link",
            element: <AddLink />,
          },
          {
            path: "link-management",
            element: <LinkManagement />,
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

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AllVehicles from "./pages/AllVehicles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddVehicle from "./pages/AddVehicle"
import MyBookings from "./pages/MyBookings"
import MyVehicle from "./pages/MyVehicle"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allVehicles",
        element: <AllVehicles />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/addVehicle",
        element: <AddVehicle></AddVehicle>
      },
      {
        path: "/myBookings",
        element: <MyBookings></MyBookings>
      },
      {
        path: "/myVehicle",
        element: <MyVehicle></MyVehicle>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

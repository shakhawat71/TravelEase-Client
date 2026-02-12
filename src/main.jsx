import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";


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
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        )
      },
      {
        path: "/myVehicle",
        element: (
          <PrivateRoute>
            <MyVehicle></MyVehicle>
          </PrivateRoute>
        )
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);


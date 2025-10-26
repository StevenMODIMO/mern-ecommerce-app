import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
/**Routes and Pages */
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Cart from "./routes/Cart";
import Dashboard from "./routes/Dashboard";
import CompleteAccount from "./routes/CompleteAccount";
import Products from "./routes/Products";

/**Layouts */
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "account-setup",
        Component: CompleteAccount,
      },
      // BUYER ROUTES
      {
        path: "products",
        Component: Products,
      },
    ],
  },
]);

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

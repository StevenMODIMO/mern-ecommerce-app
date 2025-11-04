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
import Orders from "./routes/Orders";
import Invoices from "./routes/Invoices";
import Wishlist from "./routes/Wishlist";

/**Layouts */
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      // PUBLIC ROUTES
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
      // ACCOUNT COMPLETION ROUTE IF USER NOT YET COMPLETED THEIR ACCOUNT
      {
        path: "account-setup",
        Component: CompleteAccount,
      },
      // SELLER ROUTES
      {
        Component: DashboardLayout,
        children: [
          {
            path: "/dashboard",
            index: true,
            Component: Dashboard,
          },
        ],
      },
      {
        path: "invoices",
        Component: Invoices,
      },
      // BUYER ROUTES
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "orders",
        Component: Orders,
      },
      {
        path: "wishlist",
        Component: Wishlist,
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

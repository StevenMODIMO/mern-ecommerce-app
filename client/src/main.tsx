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
import UserLayout from "./layouts/UserLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          {
            path: "invoices",
            Component: Invoices,
          },
        ],
      },
      // BUYER ROUTES
      {
        Component: UserLayout,
        children: [
          {
            path: "products",
            index: true,
            Component: Products,
          },
          {
            path: "cart",
            Component: Cart,
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
    ],
  },
]);

const queryClient = new QueryClient();

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* Devtools for debugging queries (optional) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

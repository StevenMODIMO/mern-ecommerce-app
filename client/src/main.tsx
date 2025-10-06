import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

import { createBrowserRouter, RouterProvider } from "react-router";
import Landing from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
]);

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
}

import "./assets/css/style.css"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ReactDom from "react-dom/client"

import App from "./routes/App"
import Transactions from "./routes/Transactions/Transactions";
import Liquidity from "./routes/Liquidity/Liquidity";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: 'transactions',
    element: <Transactions />
  },
  {
    path: 'liquidity',
    element: <Liquidity />
  }
])

const root = ReactDom.createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
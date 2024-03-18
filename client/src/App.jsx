import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login page/Login";
import Register from "./pages/register page/Register";
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout page/Checkout";
import Confirmation from "./pages/order confirmation page/Confirmation";
import ViewProduct from "./pages/view product page/ViewProduct";
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <Suspense>
              <AppLayout />
            </Suspense>
          }
        >
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="order-confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

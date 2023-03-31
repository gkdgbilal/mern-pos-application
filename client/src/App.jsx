import HomePage from "./pages/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RouterControl>
              <HomePage />
            </RouterControl>
          }
        />
        <Route path='/cart' element={<RouterControl>
          <CartPage />
        </RouterControl>} />
        <Route path='/bills' element={<RouterControl>
          <BillPage />
        </RouterControl>} />
        <Route path='/customers' element={
          <RouterControl>
            <CustomerPage />
          </RouterControl>
        } />
        <Route path='/statistics' element={
          <RouterControl>
            <StatisticPage />
          </RouterControl>
        } />
        <Route path='/products' element={
          <RouterControl>
            <ProductPage />
          </RouterControl>
        } />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export const RouterControl = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;

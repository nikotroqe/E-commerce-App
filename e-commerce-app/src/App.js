import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";
import MyProducts from "./components/MyProducts";
import AddProduct from "./components/AddProduct";
import Profile from "./components/Profile";
import AddEditProduct from "./components/AddEditProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/add-product" element={<AddEditProduct />} />
                {/**<Route path="/edit-product/:id" element={<AddEditProduct />} />**/}
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;

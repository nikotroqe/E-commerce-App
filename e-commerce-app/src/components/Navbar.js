import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axiosInstance.get("/User/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchBalance();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <img src="/videoteka-logo.png" alt="Logo" className="logo" />
      </div>

      <div className="right-section">
        <Link to="/home" className="link">Home</Link>
        <Link to="/cart" className="link">Cart</Link>
        <Link to="/my-products" className="link">My Products</Link>
        <Link to="/orders" className="link">My Orders</Link>
        <Link to="/profile" className="link">Profile</Link>
        <div className="balance">💰 ${balance}</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";


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
  <nav style={navbarStyle}>
    <div style={leftSectionStyle}>
      <img src="/videoteka-logo.png" alt="Logo" style={logoStyle} />
    </div>

    <div style={rightSectionStyle}>
      <Link to="/home" style={linkStyle}>Home</Link>
      <Link to="/cart" style={linkStyle}>Cart</Link>
      <Link to="/my-products" style={linkStyle}>My Products</Link>
      <Link to="/orders" style={linkStyle}>My Orders</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <div style={balanceStyle}>💰 ${balance}</div>
      <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
    </div>
  </nav>
 );
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 24px",
  background: "#0d6efd",
  flexWrap: "wrap",
};

const leftSectionStyle = {
  display: "flex",
  alignItems: "center",
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
};

const logoStyle = {
  height: 28,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "15px",
};

const balanceStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "14px",
};

const logoutButtonStyle = {
  padding: "6px 14px",
  background: "#dc3545",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};


export default Navbar;

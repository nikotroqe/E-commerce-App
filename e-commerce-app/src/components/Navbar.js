import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/home" style={linkStyle}>Home</Link>
      <Link to="/cart" style={linkStyle}>Cart</Link>
      <Link to="/my-products" style={linkStyle}>My Products</Link>
      <Link to="/orders" style={linkStyle}>My Orders</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </nav>
  );
};

const navbarStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  background: "#0d6efd",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "15px",
  fontWeight: "500",
};

const logoutButtonStyle = {
  marginLeft: "auto",
  padding: "6px 12px",
  background: "#dc3545",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

export default Navbar;

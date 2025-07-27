import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/Product/my-orders");
      setOrders(response.data);
      setError("");
    } catch {
      setError("Failed to load orders.");
      setOrders([]);
    }
  };

  return (
  <div className="my-orders-container">
    <h2>📦 My Orders</h2>

    {error && <p className="error-message">{error}</p>}

    {orders.length === 0 ? (
      <p className="empty-message">You have no orders.</p>
    ) : (
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-header">
              Order {order.orderNumber}
            </div>
            <div className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </div>

            <ul className="order-items-list">
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  <img src={item.product.imageUrl} alt={item.product.productName} />
                  <div className="order-item-details">
                    {item.product.productName} - ${item.product.productPrice} × {item.quantity}
                  </div>
                </li>
              ))}
            </ul>

            <p className="order-total">Total: ${order.totalAmount}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default MyOrders;

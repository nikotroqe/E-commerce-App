import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate } from "react-router-dom";

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
    } catch {
      setError("Failed to load orders.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 My Orders</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId} style={{ marginBottom: 15 }}>
              <strong>Order #{order.orderId}</strong> - {new Date(order.date).toLocaleString()}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.totalAmount}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;


import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchCart();
  }, [navigate]);

  const fetchCart = async () => {
  try {
    const res = await axiosInstance.get("/Product/my-cart");
    
    // Sigurohemi që të jetë array
    const items = Array.isArray(res.data) ? res.data : [];
    
    setCartItems(items);
    setError("");
  } catch {
    setError("Failed to load cart");
    setCartItems([]); // fallback për të shmangur errorin
  }
};


  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post(`/Product/remove-from-cart/${productId}`);
      setSuccess("Item removed!");
      fetchCart(); // refresh
    } catch {
      setError("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    try {
      await axiosInstance.post("/Product/place-order");
      setSuccess("Order placed successfully!");
      fetchCart(); // refresh
    } catch {
      setError("Order failed. Check your balance or stock.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 My Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <strong>{item.productName}</strong> - ${item.productPrice} x {item.quantity} = ${item.productPrice * item.quantity}
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total}</h4>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;

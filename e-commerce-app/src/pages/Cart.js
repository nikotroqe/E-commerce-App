import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

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
    const items = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.items)
      ? res.data.items
      : [];
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
    <div className="cart-container">
      <h2>🛒 My Cart</h2>

      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="cart-item-image"
                    />
                  )}
                  <div>
                    <strong>{item.productName}</strong><br />
                    ${item.productPrice} x {item.quantity} = ${item.productPrice * item.quantity}
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total-section">Total: ${total}</div>
          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

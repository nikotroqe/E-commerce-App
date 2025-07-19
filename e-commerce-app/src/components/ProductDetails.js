import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AuthFetch";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/Product/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post(`/Product/add-to-cart/${id}`);
      alert("Product added to cart!");
    } catch {
      alert("Failed to add to cart");
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      <h2 className="product-title">{product.productName}</h2>
      <p className="product-description">{product.productDescription}</p>
      <p className="product-price">Price: ${product.productPrice}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;


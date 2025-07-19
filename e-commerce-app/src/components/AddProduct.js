import React, { useState } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 5 || name.length > 100) {
      setError("Name must be between 5 and 100 characters");
      return;
    }

    if (description.length > 1000) {
      setError("Description can be max 1000 characters");
      return;
    }

    if (Number(price) <= 0 || isNaN(price)) {
      setError("Price must be a number greater than 0");
      return;
    }

    if (Number(stock) < 0 || isNaN(stock)) {
      setError("Stock must be 0 or more");
      return;
    }

    const productData = {
      productName: name,
      productDescription: description,
      productPrice: Number(price),
      stock: Number(stock),
      productImageUrl: imageUrl.trim() || null
    };

    try {
      await axiosInstance.post("/Product/create", productData);
      navigate("/my-products");
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err.message);
      setError("Failed to create product");
    }
  };

    return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>

      {error && <p className="add-product-error">{error}</p>}

      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>

        <div>
          <label>Image URL (optional):</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg"/>
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

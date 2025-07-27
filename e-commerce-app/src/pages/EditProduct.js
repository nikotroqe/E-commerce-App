import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // ✅ Funksioni i mbështjellë me useCallback
  const fetchProduct = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/Product/${id}`);
      const prod = res.data;
      setName(prod.productName || "");
      setDescription(prod.productDescription || "");
      setPrice(prod.productPrice ?? "");
      setStock(prod.stock ?? "");
      setImageUrl(prod.imageUrl ?? "");
    } catch {
      setError("Failed to load product details");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const validate = () => {
    if (name.length < 5 || name.length > 100) {
      setError("Name must be between 5 and 100 characters");
      return false;
    }
    if (description.length > 1000) {
      setError("Description can be max 1000 characters");
      return false;
    }
    if (Number(price) <= 0 || isNaN(price)) {
      setError("Price must be a number greater than 0");
      return false;
    }
    if (Number(stock) < 0 || isNaN(stock)) {
      setError("Stock must be a number 0 or greater");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const productData = {
    id,
    productName: name,
    productDescription: description,
    productPrice: Number(price),
    stock: Number(stock),
    imageUrl: imageUrl.trim() || null,
  };

  try {
    if (id) {
      await axiosInstance.post("/Product/update", productData);
    } else {
      await axiosInstance.post("/Product/create", productData);
    }
    setError("");
    navigate("/my-products");
  } catch {
    setError("Failed to save product");
  }
};


  return (
    <div className="edit-product-container">
      <h2 className="edit-product-title">Edit Product</h2>

      {error && <p className="edit-product-error">{error}</p>}

      <form className="edit-product-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={4}
          />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

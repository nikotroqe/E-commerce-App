/*import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  // ✅ Funksioni i mbështjellë me useCallback
  const fetchProduct = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/api/Product/${id}`);
      const prod = res.data;
      setName(prod.name);
      setDescription(prod.description);
      setPrice(prod.price);
      setStock(prod.stock);
      setImageUrl(prod.imageUrl || "");
      setError("");
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
      name,
      description,
      price: Number(price),
      stock: Number(stock)
    };

    try {
      if (id) {
        await axiosInstance.post("/api/Product/update", { id, ...productData });
      } else {
        await axiosInstance.post("/api/Product/create", productData);
      }
      setError("");
      navigate("/my-products");
    } catch {
      setError("Failed to save product");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{id ? "Edit Product" : "Add New Product"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={4}
          />
        </div>

        <div>
          <label>Price:</label><br />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Stock:</label><br />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <button type="submit">{id ? "Update Product" : "Create Product"}</button>
      </form>
    </div>
  );
};

export default AddEditProduct;*/

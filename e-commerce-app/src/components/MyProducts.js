import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import './MyProducts.css';

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kontrollojmë nëse ka token në localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      // Këtu mund të thërrasim funksionin që merr produktet e përdoruesit
      fetchMyProducts();
    }
  }, [navigate]); // Këtu shtojmë `navigate` në vargun e dependencave

  const fetchMyProducts = async () => {
    try {
      const res = await axiosInstance.get("/Product/my-products");
      setMyProducts(res.data);
      setError("");
    } catch {
      setError("Failed to load your products");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosInstance.post(`/Product/delete/${id}`, {});
      fetchMyProducts(); // refresh list
    } catch (err){
      console.log(err);
      setError("Failed to delete product");
    }
  };

  return (
    <div className="my-products-container">
      <div className="my-products-header">
        <h2>My Products</h2>
        <Link to="/add-product" className="add-link">Add New Product</Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {myProducts.length === 0 ? (
        <p>You have not listed any products yet.</p>
      ) : (
        <div className="my-product-list">
          <div className="my-product-header">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Actions</div>
          </div>

          {myProducts.map((product) => (
            <div key={product.id} className="my-product-row">
              {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.productName} />
                ) : (
                  <div className="no-image-placeholder">
                    No Image
                  </div>
                )}
              <div>{product.productName}</div>
              <div>${product.productPrice}</div>
              <div>{product.stock}</div>
              <div className="actions">
                <Link to={`/edit-product/${product.id}`}>Edit</Link>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;

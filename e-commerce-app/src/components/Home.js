import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/");
    } else {
        fetchProducts();
        fetchUserInfo(); // ← marrim profilin dhe balancën
    }
    }, [navigate]);

const fetchUserInfo = async () => {
  try {
    const profileRes = await axiosInstance.get("/User/profile");
    setUserId(profileRes.data.id);

    const balanceRes = await axiosInstance.get("/User/balance");
    setBalance(balanceRes.data.balance);
  } catch (err) {
    setError("Failed to fetch user info");
  }
};
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/Product/all");
      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load products");
    }
  };
  const addToCart = async (product) => {
  if (product.sellerId === userId) {
    alert("You cannot add your own product.");
    return;
  }

  if (product.stock <= 0) {
    alert("This product is out of stock.");
    return;
  }

  if (balance < product.price) {
    alert("Insufficient balance.");
    return;
  }

  try {
    await axiosInstance.post(`/Product/add-to-cart/${product.id}`);
    alert("Product added to cart!");
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart.");
  }
};


  const filteredProducts = products.filter((product) => {
    const nameMatches = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const price = product.productPrice;
    const minValid = minPrice === "" || price >= parseFloat(minPrice);
    const maxValid = maxPrice === "" || price <= parseFloat(maxPrice);
    return nameMatches && minValid && maxValid;
  });

  return (
  <div className="home-container">
    <h2>🏠 Home Page</h2>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Search & Filter */}
    <div className="search-filter-bar">
      <input type="text" placeholder="🔍 Search products..."  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
      <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
    </div>

    {filteredProducts.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="product-image"
                style={{ width: "100%", height: "180px", objectFit: "cover", marginBottom: "10px" }}
              />
            )}
            <h5>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "#333" }}>
                {product.productName}
              </Link>
            </h5>
            <p>💰 ${product.productPrice}</p>
            <p>📦 Stock: {product.stock}</p>
            <p>🛒 Seller: {product.sellerUsername}</p>
            <button
              onClick={() => addToCart(product)}
              disabled={product.sellerId === userId || product.stock === 0}
              title={
                product.sellerId === userId
                  ? "You cannot add your own product"
                  : product.stock === 0
                  ? "Out of stock"
                  : ""
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Home;

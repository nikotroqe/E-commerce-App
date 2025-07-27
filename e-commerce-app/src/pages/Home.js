import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    else {
      fetchProducts();
      fetchUserInfo();
    }
  }, [navigate]);

  const fetchUserInfo = async () => {
    try {
      const profileRes = await axiosInstance.get("/User/profile");
      setUserId(profileRes.data.id);
      const balanceRes = await axiosInstance.get("/User/balance");
      setBalance(balanceRes.data.balance);
    } catch {
      setError("Failed to fetch user info");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/Product/all");
      setProducts(res.data);
      setFilteredProducts(res.data);
      setError("");
      setCurrentPage(1);
    } catch {
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
    if (balance < product.productPrice) {
      alert("Insufficient balance.");
      return;
    }

    try {
      await axiosInstance.post("/Product/add-to-cart", {
        productId: product.id,
        quantity: 1,
      });
      alert("Product added to cart!");
      const balanceRes = await axiosInstance.get("/User/balance");
      setBalance(balanceRes.data.balance);
    } catch {
      console.error("Add to cart failed");
      alert("Failed to add to cart.");
    }
  };

  const handleFilter = async () => {
    try {
      const res = await axiosInstance.post("/Product/active", {
        searchTerm,
        minPrice: minPrice === "" ? 0 : parseFloat(minPrice),
        maxPrice: maxPrice === "" ? 0 : parseFloat(maxPrice),
      });
      setFilteredProducts(res.data);
      setCurrentPage(1);
    } catch {
      console.error("Filter failed");
      setError("Filter failed");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search & Filter */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleFilter}>🔎 Filter</button>
        <button onClick={handleReset}>🔁 Reset</button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="product-grid">
            {currentItems.map((prod) => (
              <div key={prod.id} className="product-card">
                {prod.imageUrl && (
                  <img
                    src={prod.imageUrl}
                    alt={prod.productName}
                    className="product-image"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h5>
                  <Link
                    to={`/product/${prod.id}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    {prod.productName}
                  </Link>
                </h5>
                <p>💰 ${prod.productPrice}</p>
                <p>📦 Stock: {prod.stock}</p>
                <p>🛒 Seller: {prod.username}</p>
                <button
                  onClick={() => addToCart(prod)}
                  disabled={prod.userId === userId || prod.stock === 0}
                  title={
                    prod.userId === userId
                      ? "Yours"
                      : prod.stock === 0
                      ? "Out of stock"
                      : ""
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={currentPage === idx + 1 ? "active" : ""}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

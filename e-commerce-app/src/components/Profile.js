import React, { useState, useEffect } from "react";
import axiosInstance from "../api/AuthFetch";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
    } else {
        fetchUserProfile();
        fetchBalance();
    }
    }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/User/profile");
      setProfile(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axiosInstance.get("/User/balance");
      setBalance(res.data.balance);
      setError("");
    } catch (err) {
      setError("Failed to load balance");
    }
  };

  const handleAddFunds = async () => {
    setError("");
    setSuccess("");
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      await axiosInstance.post("/User/updateBalance", { amount: Number(amount) });
      setSuccess("Funds added successfully!");
      setAmount("");
      fetchBalance(); // rifresko bilancin pas suksesi
    } catch (err) {
      setError("Failed to add funds");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Profile</h2>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <div className="profile-info">
        <p><strong>Username:</strong> {profile.username || "Loading..."}</p>
        <p><strong>Email:</strong> {profile.email || "Loading..."}</p>
        <p><strong>Wallet Balance:</strong> <span className="balance">${balance}</span></p>
      </div>

      <div className="fund-section">
        <h4>Add Funds</h4>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddFunds}>Add</button>
      </div>
    </div>
  );
};

export default Profile;

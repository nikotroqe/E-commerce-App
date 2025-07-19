import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from '../services/auth.service.js';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length < 3 || password.length < 8) {
            setError("Invalid username or password length");
            return;
        }

        try {
            const userData = {
                username,
                password
            };
            const response = await AuthService.login(userData);
            debugger;
            const token = response.token;
            localStorage.setItem("token", token);
      navigate("/home");
            
        } catch (err) {
            debugger;
            
            setError(err.response?.data?.message || "Login failed");
            return;
        }
    };

    return (
        <div className="login-container">
            <Form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                {error && <div className="login-error-message">{error}</div>}

                <Form.Group controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-button">
                    Login
                </Button>

                <div className="text-center mt-3">
                    Don't have an account?
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="register-button-link"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;

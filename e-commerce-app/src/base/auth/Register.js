import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/auth.service.js';
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validate = () => {
    if (username.length < 3 || username.length > 20) {
        return "Username must be 3–20 characters";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return null;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
        setError(validationError);
        return;
    }
    setError("");

    try {
        const userData = {
            username,
            email,
            password,
            confirmPassword
        };
        const response = await AuthService.register(userData );
        debugger;
        const token = response.token;
        localStorage.setItem("token", token);
        navigate("/home"); 
    } catch (err) {
        debugger;
        setError(err.response?.data?.message || "Registration failed");
    }
  };

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Register</h2>

                {error && <div className="register-error-message">{error}</div>}

                <Form.Group controlId="registerUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="registerEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="registerConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="register-button">
                    Register
                </Button>

                <div className="text-center mt-3">
                    Already have an account?
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="login-button-link"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;

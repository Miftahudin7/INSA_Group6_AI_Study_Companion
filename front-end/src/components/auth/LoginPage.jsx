import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Auth context
  const { login, isLoading, error } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Login successful, parent component will handle navigation
      onLoginSuccess && onLoginSuccess();
    }
    // Error handling is managed by AuthContext
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} xl={3}>
            <div className="login-container fade-in">
              {/* Brand Header */}
              <div className="text-center mb-4">
                <div className="brand-logo">
                  <i className="bi bi-mortarboard-fill text-success fs-1"></i>
                </div>
                <h2 className="brand-title text-light mb-2">
                  BrightRoot Academy
                </h2>
                <p className="brand-subtitle text-muted">
                  Your AI-Powered Study Companion
                </p>
              </div>

              {/* Login Card */}
              <Card className="login-card shadow-lg border-0">
                <Card.Body className="p-4">
                  <h4 className="text-center mb-4 text-light">Welcome Back</h4>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                    </Alert>
                  )}

                  {/* Login Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">
                        <i className="bi bi-envelope me-2"></i>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        isInvalid={!!formErrors.email}
                        disabled={isLoading}
                        className="custom-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">
                        <i className="bi bi-lock me-2"></i>
                        Password
                      </Form.Label>
                      <div className="password-input-container">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          isInvalid={!!formErrors.password}
                          disabled={isLoading}
                          className="custom-input"
                        />
                        <Button
                          variant="link"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                          disabled={isLoading}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Login Button */}
                    <div className="d-grid mb-3">
                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        disabled={isLoading}
                        className="login-btn"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Sign In
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Demo Credentials */}
                    <div className="demo-credentials text-center">
                      <small className="text-muted">
                        Demo: any email + any password (6+ chars)
                      </small>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Footer */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  Built by Team BrightRoot • Frontend: Abdurehman • Backend:
                  Mihretab • AI: Miftah
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

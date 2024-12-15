import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState(""); // Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log("Registering with:", { name, email, password });
      const response = await axios.post("http://127.0.0.1:5001/register", {
        name, // Send name to the backend
        email,
        password,
      });
      console.log("Register Response:", response.data);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redirect to login after success
    } catch (err) {
      console.error("Register Error:", err.response || err.message);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3>Register</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Registration successful! Redirecting...</Alert>}
              <Form onSubmit={handleRegister}>
                <Form.Group>
                  <Form.Label>Name</Form.Label> {/* Add name field */}
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3 w-100">
                  Register
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-primary p-0"
                    onClick={() => navigate("/")}
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

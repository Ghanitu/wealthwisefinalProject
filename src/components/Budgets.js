import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Budgets.css";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
  });
  const [deleteBudgetId, setDeleteBudgetId] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Healthcare",
    "Entertainment",
    "Shopping",
    "Other",
  ];

  // Fetch budgets
  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5001/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(response.data);
      setFilteredBudgets(response.data);
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Add budget
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:5001/budgets",
        newBudget,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      fetchBudgets();
      setNewBudget({ category: "", amount: "" });
    } catch (err) {
      console.error("Error adding budget:", err);
      setError("Failed to add budget");
    }
  };

  // Open Delete Confirmation Modal
  const openDeleteConfirm = (id) => {
    setDeleteBudgetId(id);
    setShowDeleteConfirm(true);
  };

  // Delete budget
  const deleteBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:5001/budgets/${deleteBudgetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBudgets();
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Error deleting budget:", err);
    }
  };

  // Filter budgets based on search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = budgets.filter((budget) =>
      budget.category.toLowerCase().includes(term.toLowerCase()) ||
      budget.amount.toString().includes(term)
    );
    setFilteredBudgets(filtered);
  };

  return (
    <Container className="mt-4 budgets-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Budgets</h2>
        <div>
          <Button variant="outline-primary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="primary" className="ms-2" onClick={() => setShowModal(true)}>
            Add Budget
          </Button>
        </div>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search budgets by category or amount..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBudgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.category}</td>
              <td>${budget.amount.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteConfirm(budget.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newBudget.category}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, category: e.target.value })
                }
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={newBudget.amount}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, amount: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Add Budget
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this budget?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteBudget}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Budgets;

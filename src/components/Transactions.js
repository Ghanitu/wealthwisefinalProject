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
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Food",
    "Housing",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Other",
  ];

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5001/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (err) {
      console.error("Error fetching transactions:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle Add Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:5001/transactions",
        newTransaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      fetchTransactions();
      setNewTransaction({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    } catch (err) {
      console.error("Error adding transaction:", err.response?.data || err.message);
      setError("Failed to add transaction");
    }
  };

  // Open Delete Confirmation
  const openDeleteConfirm = (id) => {
    setDeleteTransactionId(id);
    setShowDeleteConfirm(true);
  };

  // Handle Delete Transaction
  const deleteTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:5001/transactions/${deleteTransactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTransactions();
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Error deleting transaction:", err.response?.data || err.message);
    }
  };

  // Filter Transactions
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = transactions.filter(
      (transaction) =>
        transaction.category.toLowerCase().includes(term.toLowerCase()) ||
        transaction.description?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <Container className="mt-4 transactions-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transactions</h2>
        <div>
          <Button variant="outline-primary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button
            variant="primary"
            className="ms-2"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.description}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteConfirm(transaction.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Transaction Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteTransaction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Transactions;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        const [transactionsRes, budgetsRes] = await Promise.all([
          axios.get("http://127.0.0.1:5001/transactions", { headers }),
          axios.get("http://127.0.0.1:5001/budgets", { headers }),
        ]);

        setTransactions(transactionsRes.data);
        setBudgets(budgetsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401 || error.response?.status === 422) {
          localStorage.removeItem("token");
          navigate("/");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const savingsPercentage = totalBudget
    ? (((totalBudget - totalSpent) / totalBudget) * 100).toFixed(2)
    : 0;

  const budgetChartData = {
    labels: budgets.map((b) => b.category),
    datasets: [
      {
        label: "Budget Amount",
        data: budgets.map((b) => b.amount),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const exportCombinedCSV = () => {
    const combinedData = [];

    // Add transactions to the combined data
    if (transactions.length > 0) {
      combinedData.push(["Transactions"]);
      combinedData.push(["Date", "Category", "Amount", "Description"]);
      transactions.forEach((transaction) =>
        combinedData.push([
          transaction.date,
          transaction.category,
          transaction.amount,
          transaction.description || "",
        ])
      );
    }

    // Add budgets to the combined data
    if (budgets.length > 0) {
      combinedData.push([]);
      combinedData.push(["Budgets"]);
      combinedData.push(["Category", "Amount"]);
      budgets.forEach((budget) =>
        combinedData.push([budget.category, budget.amount])
      );
    }

    // Convert combined data to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      combinedData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FinancialData.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col>
          <h2>Dashboard</h2>
          <p>Insights into your financial data at a glance.</p>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Budget</Card.Title>
              <Card.Text className="h2 text-danger">${totalBudget}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Transactions</Card.Title>
              <Card.Text className="h2 text-primary">${totalSpent}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Remaining</Card.Title>
              <Card.Text className="h2 text-success">
                ${(totalBudget - totalSpent).toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Savings Percentage</Card.Title>
              <Card.Text className="h2 text-info">
                {savingsPercentage}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Transactions and Budgets */}
      <Row className="mb-4">
        <Col md={6}>
          <h3>Recent Transactions</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.category}</td>
                  <td>${t.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => navigate("/transactions")}
          >
            View All Transactions
          </Button>
        </Col>
        <Col md={6}>
          <h3>Budgets Overview</h3>
          <Bar data={budgetChartData} />
          <Button
            variant="outline-primary"
            className="w-100 mt-3"
            onClick={() => navigate("/budgets")}
          >
            View All Budgets
          </Button>
        </Col>
      </Row>

      {/* Export Data */}
      <Row className="mb-4">
        <Col>
          <Button variant="outline-success" onClick={exportCombinedCSV}>
            Export All Data to CSV
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

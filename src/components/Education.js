import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Education.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Education = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const articles = [
    {
      title: "5 Tips to Save Money",
      description: "Learn effective strategies to save more money every month.",
      link: "https://example.com/save-money",
    },
    {
      title: "Understanding Credit Scores",
      description: "A beginner's guide to credit scores and how to improve them.",
      link: "https://example.com/credit-scores",
    },
    {
      title: "Investing 101",
      description: "An introduction to investing for long-term financial growth.",
      link: "https://example.com/investing-101",
    },
  ];

  const handleCalculateSavings = (e) => {
    e.preventDefault();
    const finalAmount = amount * Math.pow(1 + rate / 100, years);
    setResult(finalAmount.toFixed(2));
  };

  const savingsChartData = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        label: "Savings Growth",
        data: Array.from({ length: 5 }, (_, i) =>
          (amount * Math.pow(1 + rate / 100, i + 1)).toFixed(2)
        ),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <Container className="my-4">
      <h1>Financial Education</h1>

      {/* Articles Section */}
      <section className="mb-5">
        <h2>Articles</h2>
        <Row>
          {articles.map((article, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Button variant="primary" href={article.link} target="_blank">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Savings Calculator Section */}
      <section className="mb-5">
        <h2>Savings Growth Calculator</h2>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleCalculateSavings}>
              <Form.Group className="mb-3">
                <Form.Label>Initial Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Annual Interest Rate (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Years</Form.Label>
                <Form.Control
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success">
                Calculate
              </Button>
            </Form>
            {result && (
              <Alert variant="info" className="mt-3">
                Final Savings Amount: ${result}
              </Alert>
            )}
          </Col>
          <Col md={6}>
            <Bar data={savingsChartData} />
          </Col>
        </Row>
      </section>

      {/* Video Section */}
      <section className="mb-5">
        <h2>Learn from Videos</h2>
        <Row>
          <Col md={6}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/q5JWp47z4bY"
              title="Saving Money - YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
          <Col md={6}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/4j2emMn7UaI"
              title="Budgeting - YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Education;

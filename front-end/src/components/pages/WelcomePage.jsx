import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./WelcomePage.css";

const WelcomePage = ({ onSubjectSelected }) => {
  const { user, updateUserProfile } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Available subjects with Ethiopian curriculum focus
  const subjects = [
    { id: "maths", name: "Maths", icon: "bi-calculator", color: "#3498db", description: "Algebra, Geometry, and Problem Solving", topics: ["Algebra", "Geometry", "Statistics", "Calculus"] },
    { id: "physics", name: "Physics", icon: "bi-lightning", color: "#9b59b6", description: "Mechanics, Electricity, and Modern Physics", topics: ["Mechanics", "Thermodynamics", "Electricity", "Optics"] },
    { id: "chemistry", name: "Chemistry", icon: "bi-droplet", color: "#2ecc71", description: "Organic, Inorganic, and Physical Chemistry", topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"] },
    { id: "biology", name: "Biology", icon: "bi-tree", color: "#f39c12", description: "Life Sciences and Human Biology", topics: ["Cell Biology", "Genetics", "Ecology", "Human Biology"] },
    { id: "english", name: "English", icon: "bi-book", color: "#e74c3c", description: "Literature, Grammar, and Writing Skills", topics: ["Grammar", "Literature", "Essay Writing", "Reading Comprehension"] },
  ];

  // Grade levels for Ethiopian curriculum
  const grades = [
    { value: "Grade9", label: "Grade 9", level: "Preparatory" },
    { value: "Grade10", label: "Grade 10", level: "Preparatory" },
    { value: "Grade11", label: "Grade 11", level: "Preparatory" },
    { value: "Grade12", label: "Grade 12", level: "Preparatory" },
  ];

  // Handle subject selection
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedGrade(null); // Reset grade when subject changes
  };

  // Handle grade selection
  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
  };

  // Handle continue to study
  const handleContinue = () => {
    if (selectedSubject && selectedGrade) {
      // Update user profile with selections
      updateUserProfile({
        currentSubject: selectedSubject.id,
        currentGrade: selectedGrade.value,
        lastActivity: new Date().toISOString(),
      });

      // Notify parent component
      onSubjectSelected &&
        onSubjectSelected({
          subject: selectedSubject,
          grade: selectedGrade,
        });
    }
  };

  return (
    <div className="welcome-page">
      <Container fluid className="py-5">
        {/* Hero Section */}
        <Row className="hero-section mb-5">
          <Col xs={12} className="text-center">
            <div className="hero-content fade-in">
              <div className="hero-icon mb-3">
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <h1 className="hero-title">
                Welcome to{" "}
                <span className="brand-gradient">BrightRoot Academy</span>
              </h1>
              <p className="hero-subtitle text-muted mb-4">
                Your AI-powered study companion for Ethiopian students. Upload
                documents, chat with AI, and master your subjects with
                personalized learning.
              </p>

              {user && (
                <div className="user-welcome mb-4">
                  <Badge bg="success" className="user-badge">
                    <i className="bi bi-person-check me-2"></i>
                    Welcome back, {user.firstName}!
                  </Badge>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Features Highlight */}
        <Row className="features-section mb-5">
          <Col xs={12} className="text-center mb-4">
            <h3 className="section-title text-light">What You Can Do</h3>
            <p className="text-muted">
              Powerful AI tools designed for Ethiopian curriculum
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-card">
              <i className="bi bi-upload feature-icon text-primary"></i>
              <h5 className="text-light">Upload Documents</h5>
              <p className="text-muted">
                PDF, Word docs, textbooks - upload any study material
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-card">
              <i className="bi bi-chat-dots feature-icon text-success"></i>
              <h5 className="text-light">AI Chat Assistant</h5>
              <p className="text-muted">
                Ask questions and get instant explanations from your documents
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="feature-card">
              <i className="bi bi-patch-question feature-icon text-warning"></i>
              <h5 className="text-light">Smart Quizzes</h5>
              <p className="text-muted">
                Generate custom quizzes and get bullet-point summaries
              </p>
            </div>
          </Col>
        </Row>

        {/* Subject Selection */}
        <Row className="selection-section">
          <Col xs={12} className="mb-4">
            <div className="text-center">
              <h3 className="section-title text-light">Choose Your Subject</h3>
              <p className="text-muted">
                Select a subject to start your learning journey
              </p>
            </div>
          </Col>

          {subjects.map((subject) => (
            <Col key={subject.id} md={6} lg={4} className="mb-4">
              <Card
                className={`subject-card h-100 ${
                  selectedSubject?.id === subject.id ? "selected" : ""
                }`}
                onClick={() => handleSubjectClick(subject)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="text-center p-4">
                  <div
                    className="subject-icon mb-3"
                    style={{ color: subject.color }}
                  >
                    <i className={subject.icon}></i>
                  </div>
                  <h5 className="text-light mb-2">{subject.name}</h5>
                  <p className="text-muted small mb-3">{subject.description}</p>

                  <div className="subject-topics">
                    {subject.topics.map((topic, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        className="me-1 mb-1 topic-badge"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {selectedSubject?.id === subject.id && (
                    <div className="selected-indicator">
                      <i className="bi bi-check-circle-fill text-success"></i>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Grade Selection */}
        {selectedSubject && (
          <Row className="grade-selection mt-5 fade-in">
            <Col xs={12} className="mb-4">
              <div className="text-center">
                <h4 className="section-title text-light">
                  Select Your Grade for {selectedSubject.name}
                </h4>
                <p className="text-muted">Choose your current grade level</p>
              </div>
            </Col>

            {grades.map((grade) => (
              <Col key={grade.value} sm={6} md={3} className="mb-3">
                <Button
                  variant={
                    selectedGrade?.value === grade.value
                      ? "success"
                      : "outline-light"
                  }
                  className="grade-btn w-100"
                  onClick={() => handleGradeClick(grade)}
                >
                  <div className="grade-content">
                    <strong>{grade.label}</strong>
                    <br />
                    <small>{grade.level}</small>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        )}

        {/* Continue Button */}
        {selectedSubject && selectedGrade && (
          <Row className="continue-section mt-5 fade-in">
            <Col xs={12} className="text-center">
              <div className="continue-card">
                <h5 className="text-light mb-3">Ready to Start Learning?</h5>
                <p className="text-muted mb-4">
                  You've selected{" "}
                  <strong className="text-success">
                    {selectedSubject.name}
                  </strong>{" "}
                  for{" "}
                  <strong className="text-success">
                    {selectedGrade.label}
                  </strong>
                </p>
                <Button
                  variant="success"
                  size="lg"
                  className="continue-btn"
                  onClick={handleContinue}
                >
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Continue to Study Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default WelcomePage;

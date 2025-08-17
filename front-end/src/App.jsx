import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import WelcomePage from "./components/pages/WelcomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// Main App Content Component (needs to be inside AuthProvider)
const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState("welcome");
  const [selectedSubjectGrade, setSelectedSubjectGrade] = useState(null);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-light">Loading BrightRoot Academy...</h4>
          <p className="text-muted">Preparing your learning experience</p>
        </div>
      </div>
    );
  }

  // Show login page if user is not authenticated
  if (!user) {
    return (
      <LoginPage
        onLoginSuccess={() => {
          setCurrentView("welcome");
        }}
      />
    );
  }

  // Handle subject and grade selection from WelcomePage
  const handleSubjectSelected = (selection) => {
    setSelectedSubjectGrade(selection);
    setCurrentView("dashboard"); // Will implement dashboard later
    console.log("Selected:", selection); // For now, just log it
  };

  // Render different views based on current state
  const renderCurrentView = () => {
    switch (currentView) {
      case "welcome":
        return <WelcomePage onSubjectSelected={handleSubjectSelected} />;

      case "dashboard":
        // TODO: Implement Dashboard component
        return (
          <div className="dashboard-placeholder">
            <div className="container py-5">
              <div className="text-center">
                <h2 className="text-light mb-4">Study Dashboard</h2>
                <div className="alert alert-info">
                  <h5>Coming Soon!</h5>
                  <p className="mb-0">
                    You selected{" "}
                    <strong>{selectedSubjectGrade?.subject?.name}</strong> for{" "}
                    <strong>{selectedSubjectGrade?.grade?.label}</strong>
                  </p>
                  <hr />
                  <p className="mb-2">
                    <strong>Next features to implement:</strong>
                  </p>
                  <ul className="list-unstyled">
                    <li>📄 Document Upload</li>
                    <li>💬 AI Chat Interface</li>
                    <li>📝 Quiz Generation</li>
                    <li>📊 Progress Tracking</li>
                  </ul>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => setCurrentView("welcome")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Subject Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <WelcomePage onSubjectSelected={handleSubjectSelected} />;
    }
  };

  return (
    <div className="app">
      {/* Navigation Header (when user is logged in) */}
      {user && (
        <nav className="app-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-mortarboard-fill text-success fs-4 me-2"></i>
                <span className="text-light fw-bold fs-5">
                  BrightRoot Academy
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-muted me-3">
                  <i className="bi bi-person me-1"></i>
                  {user.firstName} {user.lastName}
                </span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    // Handle logout
                    if (window.confirm("Are you sure you want to logout?")) {
                      // This will be handled by AuthContext
                      window.location.reload(); // Simple reload for now
                    }
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="app-main">{renderCurrentView()}</main>

      {/* Footer (when user is logged in) */}
      {user && (
        <footer className="app-footer">
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6">
                <p className="text-muted mb-0">
                  <strong>BrightRoot Academy</strong> - AI-Powered Study
                  Companion
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="text-muted mb-0">
                  Built by Team BrightRoot • Frontend: Abdurehman • Backend:
                  Mihretab • AI: Miftah
                </p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

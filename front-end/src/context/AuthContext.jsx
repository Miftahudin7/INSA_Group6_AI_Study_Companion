import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (on app startup)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for saved JWT token in localStorage
        const token = localStorage.getItem("brightroot_token");
        const userData = localStorage.getItem("brightroot_user");

        if (token && userData) {
          // Verify token is still valid by making a test request
          try {
            await axios.get('http://localhost:8000/api/users/profile/', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            // Token is valid, restore user session
            setUser(JSON.parse(userData));
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem("brightroot_token");
            localStorage.removeItem("brightroot_refresh");
            localStorage.removeItem("brightroot_user");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear corrupted data
        localStorage.removeItem("brightroot_token");
        localStorage.removeItem("brightroot_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/ai/login/', {
        email,
        password
      });

      const { access, refresh, user } = response.data;

      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.username,
        lastName: "",
        subjects: [],
        grades: {},
      };

      // Save to localStorage for persistence
      localStorage.setItem("brightroot_token", access);
      localStorage.setItem("brightroot_refresh", refresh);
      localStorage.setItem("brightroot_user", JSON.stringify(userData));

      // Update state
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed";
      
      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("brightroot_token");
    localStorage.removeItem("brightroot_refresh");
    localStorage.removeItem("brightroot_user");

    // Clear state
    setUser(null);
    setError(null);
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/ai/signup/', {
        username: userData.username,
        email: userData.email,
        password: userData.password
      });

      // Then login
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed";
      
      if (error.response?.data) {
        // Handle Django validation errors
        const errors = error.response.data;
        if (errors.username) {
          errorMessage = `Username: ${errors.username[0]}`;
        } else if (errors.email) {
          errorMessage = `Email: ${errors.email[0]}`;
        } else if (errors.password) {
          errorMessage = `Password: ${errors.password[0]}`;
        } else if (errors.non_field_errors) {
          errorMessage = errors.non_field_errors[0];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile (subjects, grades, etc.)
  const updateUserProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("brightroot_user", JSON.stringify(updatedUser));
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    updateUserProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

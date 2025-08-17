import React, { createContext, useContext, useState, useEffect } from "react";

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
    const checkAuthStatus = () => {
      try {
        // Check for saved JWT token in localStorage
        const token = localStorage.getItem("brightroot_token");
        const userData = localStorage.getItem("brightroot_user");

        if (token && userData) {
          // User is logged in, restore their session
          setUser(JSON.parse(userData));
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
      // TODO: Replace with actual API call to Mihretab's Django backend
      // const response = await axios.post('http://localhost:8000/api/auth/login', {
      //   email,
      //   password
      // });

      // TEMPORARY: Mock successful login for development
      const mockUser = {
        id: 1,
        email: email,
        firstName: "Student",
        lastName: "User",
        subjects: [],
        grades: {},
      };

      const mockToken = "mock_jwt_token_123";

      // Save to localStorage for persistence
      localStorage.setItem("brightroot_token", mockToken);
      localStorage.setItem("brightroot_user", JSON.stringify(mockUser));

      // Update state
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
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
      // TODO: Replace with actual API call to backend
      // const response = await axios.post('http://localhost:8000/api/auth/register', userData);

      // For now, auto-login after registration
      return await login(userData.email, userData.password);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
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

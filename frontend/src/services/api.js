// API service for handling form submissions and data fetching
const API_BASE_URL = "http://localhost:8000/api";

class ApiService {
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get(endpoint) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  // Get auth headers for protected requests
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Authentication methods
  async login(credentials) {
    return this.post("/auth/login", credentials);
  }

  async register(userData) {
    return this.post("/auth/register", userData);
  }

  // Forgot Password methods
  async forgotPassword(email) {
    return this.post("/auth/forgot-password", { email });
  }

  async verifyOTP(email, otp) {
    return this.post("/auth/verify-otp", { email, otp });
  }

  async resetPassword(email, newPassword) {
    return this.post("/auth/reset-password", { email, newPassword });
  }

  // Existing methods
  async submitInquiry(inquiryData) {
    return this.post("/inquiry", inquiryData);
  }

  async submitEnrollment(enrollmentData) {
    return this.post("/enroll", enrollmentData);
  }

  async submitContact(contactData) {
    return this.post("/contact", contactData);
  }
}

export const apiService = new ApiService();

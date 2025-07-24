import networkMiddleware from '../utils/networkMiddleware';

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:8000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  errorType?: string;
}

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface LoginErrorResponse {
  message: string;
  errorType: string;
}

interface RegisterResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return networkMiddleware.withConnectionCheck(async () => {
      try {
        const url = `${this.baseURL}${endpoint}`;
        const config: RequestInit = {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: data.message || `HTTP error! status: ${response.status}`,
            errorType: data.errorType,
          };
        }

        return {
          success: true,
          data,
        };
      } catch (error) {
        console.error("API request failed:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Network error",
        };
      }
    }, { requireConnectivityTest: false }); // Don't require connectivity test for API calls
  }

  // Admin Authentication
  async adminLogin(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async adminRegister(
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>("/admin/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Admin Forgot Password
  async adminForgotPassword(email: string): Promise<ApiResponse<any>> {
    return this.request("/admin/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async adminVerifyOTP(email: string, otp: string): Promise<ApiResponse<any>> {
    return this.request("/admin/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  async adminResetPassword(
    email: string,
    newPassword: string
  ): Promise<ApiResponse<any>> {
    return this.request("/admin/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
    });
  }

  // Get admin profile (protected route)
  async getAdminProfile(): Promise<ApiResponse<any>> {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      return {
        success: false,
        error: "No authentication token found",
      };
    }

    return this.request("/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
export default apiService;

import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "@/services/api.ts";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; errorType?: string; message?: string }>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; errorType?: string; message?: string }> => {
    try {
      // API call for admin login
      const response = await apiService.adminLogin(email, password);

      if (response.success && response.data) {
        const { token: apiToken, admin } = response.data;

        setUser(admin);
        setToken(apiToken);
        localStorage.setItem("adminToken", apiToken);
        localStorage.setItem("adminUser", JSON.stringify(admin));
        return { success: true };
      } else {
        console.error("Login failed:", response.error);
        return {
          success: false,
          errorType: response.errorType,
          message: response.error,
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Network error",
      };
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ): Promise<boolean> => {
    try {
      // API call for admin registration
      const response = await apiService.adminRegister(name, email, password);

      if (response.success && response.data) {
        const { token: apiToken, admin } = response.data;

        setUser(admin);
        setToken(apiToken);
        localStorage.setItem("adminToken", apiToken);
        localStorage.setItem("adminUser", JSON.stringify(admin));
        return true;
      } else {
        console.error("Registration failed:", response.error);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

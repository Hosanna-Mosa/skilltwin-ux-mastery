import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // DUMMY LOGIN FOR TESTING (uncomment to use)
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (email && password) {
      //   login("dummy-jwt-token-123", { email: email });
      //   toast({
      //     title: "Login Successful!",
      //     description: "Welcome back to SkillTwin.",
      //   });
      //   navigate("/admin/dashboard");
      //   return;
      // } else {
      //   throw new Error("Please fill in all fields");
      // }



    // REAL API LOGIN

    const result = await login(email, password);

    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
    } else {
      let errorMessage = "Login failed. Please try again.";

      // Provide specific error messages based on error type
      if (result.errorType === "EMAIL_NOT_FOUND") {
        errorMessage =
          "Email not found. Please check your email or register a new account.";
      } else if (result.errorType === "INVALID_PASSWORD") {
        errorMessage = "Invalid password. Please try again.";
      } else if (result.message) {
        errorMessage = result.message;
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            SkillTwin Admin
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@skilltwin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  Forgot Password?
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/admin/register"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register here
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                Forgot your email? Contact your system administrator.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
    </div>
  );
};

export default LoginPage;

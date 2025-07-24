import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Checkbox } from "../components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import { useToast } from "../hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const fromContact = location.state && location.state.fromContact;
  const fromServiceInquiry = location.state && location.state.fromServiceInquiry;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hadError = !!error;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
      // Show success toast if there was an error and user is fixing it
      if (hadError) {
        toast({
          title: "Good!",
          description: "Keep going with your input.",
        });
      }
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      const errorMsg = "Name is required";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      const errorMsg = "Email is required";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.includes("@")) {
      const errorMsg = "Please enter a valid email address";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords do not match";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    if (!acceptTerms) {
      const errorMsg = "Please accept the terms and conditions";
      setError(errorMsg);
      toast({
        title: "Validation Error",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // DUMMY REGISTRATION FOR TESTING (uncomment to use)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (formData.name && formData.email && formData.password) {
        login("dummy-jwt-token-456", { name: formData.name, email: formData.email });
        toast({
          title: "Registration Successful!",
          description: "Welcome to SkillTwin! Your account has been created.",
        });
        navigate("/");
        return;
      } else {
        throw new Error("Please fill in all required fields");
      }

      // REAL API CALL
      // const { confirmPassword, ...registerData } = formData;
      // const response = await apiService.register(registerData);
      // login(response.token, { name: formData.name, email: formData.email });

      // Show success toast
      toast({
        title: "Registration Successful!",
        description: "Welcome to SkillTwin! Your account has been created.",
      });

      navigate("/trainings");
    } catch (err: any) {
      const errorMessage =
        err.message || "Registration failed. Please try again.";
      setError(errorMessage);

      // Show error toast
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0)
      return { strength: 0, color: "bg-gray-200", text: "" };
    const score = password.length / 10;
    if (score <= 1) {
      return { strength: 1, color: "bg-red-400", text: "Weak" };
    } else if (score <= 2) {
      return { strength: 2, color: "bg-yellow-400", text: "Fair" };
    } else if (score <= 3) {
      return { strength: 3, color: "bg-blue-300", text: "Good" };
    } else {
      return { strength: 4, color: "bg-green-400", text: "Strong" };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      {fromContact && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert>
            <AlertDescription>
              Please register or log in to send us a message.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {fromServiceInquiry && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert>
            <AlertDescription>
              Please register or log in to submit a service inquiry.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <Card className="w-full max-w-md shadow-xl border-0 bg-white dark:bg-white">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-700" />
          </div>
          <CardTitle className="text-2xl font-bold text-black dark:text-gray-900">Create Account</CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-700">
            Register for a SkillTwin account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium dark:text-gray-900">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium dark:text-gray-900">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium dark:text-gray-900">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Password strength: {passwordStrength.text}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium dark:text-gray-900">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-red-300" />
                  )}
                  <span
                    className={`text-xs ${
                      formData.password === formData.confirmPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formData.password === formData.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-700">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-blue-800 underline dark:text-blue-600 dark:hover:text-blue-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-800 underline dark:text-blue-600 dark:hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium underline dark:text-blue-600 dark:hover:text-blue-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

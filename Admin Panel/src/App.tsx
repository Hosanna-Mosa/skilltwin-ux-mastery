import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/admin/layout/AdminLayout";
import LoginPage from "@/admin/pages/LoginPage";
import RegisterPage from "@/admin/pages/RegisterPage";
import Dashboard from "@/admin/pages/Dashboard";
import Leads from "@/admin/pages/Leads";
import Enrollments from "@/admin/pages/Enrollments";
import Services from "@/admin/pages/Services";
import Training from "@/admin/pages/Training";
import Blogs from "@/admin/pages/Blogs";
import Experts from "@/admin/pages/Experts";
import Sessions from "@/admin/pages/Sessions";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/register" element={<RegisterPage />} />
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="enrollments" element={<Enrollments />} />
              <Route path="services" element={<Services />} />
              <Route path="training" element={<Training />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="experts" element={<Experts />} />
              <Route path="sessions" element={<Sessions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

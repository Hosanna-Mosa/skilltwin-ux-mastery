import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  Calendar,
  Menu,
  LogOut,
  X,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Training", href: "/admin/training", icon: BookOpen },
    { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { name: "Experts", href: "/admin/experts", icon: UserCheck },
    { name: "Sessions", href: "/admin/sessions", icon: Calendar },
  ];

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-lg transition-all duration-300 flex flex-col fixed lg:relative z-50",
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-16 lg:w-16 -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <LayoutDashboard className="h-6 w-6" />
              </button>
              {sidebarOpen && (
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">SkillTwin</h1>
                  <p className="text-sm text-gray-500">Admin Panel</p>
                </div>
              )}
            </div>
            {/* Close button for mobile */}
            {sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={closeSidebar}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", sidebarOpen ? "mr-3" : "mx-auto")}
                />
                {sidebarOpen && item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-gray-500 capitalize">{user?.role}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-sm text-gray-500 truncate">
              Welcome back, {user?.email}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

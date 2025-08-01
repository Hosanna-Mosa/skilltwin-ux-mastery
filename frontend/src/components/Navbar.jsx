import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Proxy Services", path: "/services" },
    { name: "Trainings", path: "/trainings" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="SkillTwin Logo" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-gray-900">SkillTwin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-300 bg-blue-50"
                    : "text-gray-700 hover:text-blue-300 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-blue-300 hover:bg-gray-50 flex items-center justify-center group`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5 text-gray-700 group-hover:text-blue-300 transition-colors" /> : <Moon className="h-5 w-5 text-gray-700 group-hover:text-blue-300 transition-colors" />}
              </Button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-blue-300 hover:bg-gray-50 flex items-center space-x-2 group`}
                >
                  <LogOut className="h-4 w-4 text-gray-700 group-hover:text-blue-300 transition-colors" />
                  <span className="text-gray-700 group-hover:text-blue-300 transition-colors">Logout</span>
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button  className="hover">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-blue-300 hover:bg-gray-50 flex items-center justify-center group`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-gray-700 group-hover:text-blue-300 transition-colors" /> : <Moon className="h-5 w-5 text-gray-700 group-hover:text-blue-300 transition-colors" />}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? "text-blue-300 bg-blue-50"
                          : "text-gray-700 hover:text-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    {isAuthenticated ? (
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-blue-300 hover:bg-gray-50 w-full justify-start flex items-center space-x-2 group`}
                      >
                        <LogOut className="h-4 w-4 text-gray-700 group-hover:text-blue-300 transition-colors" />
                        <span className="text-gray-700 group-hover:text-blue-300 transition-colors">Logout</span>
                      </Button>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start no-hover"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full justify-start">
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

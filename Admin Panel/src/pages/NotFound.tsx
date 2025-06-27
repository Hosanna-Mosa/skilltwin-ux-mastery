import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md mx-auto text-center px-6">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">!</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-8xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Attempted URL:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 break-all">
              {location.pathname}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Home className="w-4 h-4" />
              Return Home
            </a>
          </div>

          {/* Additional Help */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team or check our{" "}
              <a
                href="/help"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                help center
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-8 w-6 h-6 bg-yellow-200 rounded-full opacity-30 animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

export default NotFound;

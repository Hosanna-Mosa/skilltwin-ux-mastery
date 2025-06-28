
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Users, GraduationCap, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-full mb-6">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SkillTwin Admin Panel
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive admin dashboard to manage leads, enrollments, expert assignments, and track student progress across your SkillTwin platform.
          </p>
          <Link to="/admin/login">
            <Button size="lg" className="text-lg px-8 py-4">
              <Shield className="h-5 w-5 mr-2" />
              Access Admin Panel
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Lead Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Track and manage all incoming inquiries with advanced filtering, search, and assignment capabilities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Training Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Monitor student enrollments, progress, and completion rates across all training programs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                <LayoutDashboard className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get insights with comprehensive analytics, reports, and performance metrics at a glance.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo credentials */}
        <Card className="max-w-md mx-auto bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-lg">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> admin@skilltwin.com
            </p>
            <p className="text-sm text-gray-600">
              <strong>Password:</strong> admin123
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

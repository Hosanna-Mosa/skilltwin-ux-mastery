import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Mail, Phone } from "lucide-react";

const Enrollments = () => {
  // Mock data - replace with real API calls
  const enrollments = [
    {
      id: 1,
      studentName: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1234567890",
      trainingName: "Full Stack React Development",
      schedule: "2024-01-20 to 2024-03-20",
      status: "active",
      progress: 65,
      enrolledAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      email: "bob@example.com",
      phone: "+1987654321",
      trainingName: "Python for Data Science",
      schedule: "2024-02-01 to 2024-04-01",
      status: "upcoming",
      progress: 0,
      enrolledAt: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      studentName: "Carol Davis",
      email: "carol@example.com",
      phone: "+1122334455",
      trainingName: "Advanced Node.js",
      schedule: "2023-12-01 to 2024-02-01",
      status: "completed",
      progress: 100,
      enrolledAt: "2023-11-28T09:15:00Z",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Training Enrollments
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1 lg:mt-2">
          Track and manage all student enrollments
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl lg:text-2xl font-bold text-green-600">
              8
            </div>
            <p className="text-xs lg:text-sm text-gray-600">
              Active Enrollments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">
              12
            </div>
            <p className="text-xs lg:text-sm text-gray-600">
              Upcoming Programs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl lg:text-2xl font-bold text-gray-600">
              24
            </div>
            <p className="text-xs lg:text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl lg:text-2xl font-bold text-purple-600">
              73%
            </div>
            <p className="text-xs lg:text-sm text-gray-600">Avg Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrollments grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base lg:text-lg truncate">
                    {enrollment.trainingName}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1 text-xs lg:text-sm">
                    <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{enrollment.schedule}</span>
                  </CardDescription>
                </div>
                <Badge
                  className={`text-xs ${getStatusColor(enrollment.status)} flex-shrink-0`}
                >
                  {enrollment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                {/* Student info */}
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm lg:text-base truncate">
                      {enrollment.studentName}
                    </p>
                    <div className="flex items-center text-xs lg:text-sm text-gray-600 mt-1">
                      <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{enrollment.email}</span>
                    </div>
                    <div className="flex items-center text-xs lg:text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{enrollment.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {enrollment.status === "active" && (
                  <div>
                    <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    Contact Student
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Enrollments;

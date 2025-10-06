import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, GraduationCap, CheckCircle, Clock } from "lucide-react";
import apiService from "@/services/api";

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const [leadsRes, enrollRes] = await Promise.all([
        apiService.fetchLeads(),
        apiService.fetchEnrollments(),
      ]);

      if (leadsRes.success && enrollRes.success) {
        const leads = leadsRes.data || [];
        const enrolls = enrollRes.data || [];
        setStats([
          { title: "Total Inquiries", value: String(leads.length), change: "", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
          { title: "Active Enrollments", value: String(enrolls.filter((e:any)=>e.status==="active").length), change: "", icon: GraduationCap, color: "text-green-600", bgColor: "bg-green-100" },
          { title: "Completed Sessions", value: "-", change: "", icon: CheckCircle, color: "text-purple-600", bgColor: "bg-purple-100" },
          { title: "Pending Tasks", value: "-", change: "", icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" },
        ]);
        const ra = [
          ...leads.slice(0, 5).map((l:any) => ({ type: "New Inquiry", message: `${l.tech} inquiry from ${l.name}`, time: new Date(l.createdAt).toLocaleString() })),
          ...enrolls.slice(0, 5).map((e:any) => ({ type: "Enrollment", message: `${e.programTitle || e.trainingName || "Program"} enrollment by ${e.name || e.studentName}`, time: new Date(e.createdAt).toLocaleString() })),
        ].slice(0, 5);
        setRecentActivity(ra);
      } else {
        setError(leadsRes.error || enrollRes.error || "Failed to load dashboard data");
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1 lg:mt-2">
          Welcome to your SkillTwin admin panel
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm">
              Latest updates from your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.type}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900 text-sm lg:text-base">
                  Review New Inquiries
                </div>
                <div className="text-xs lg:text-sm text-gray-600">
                  12 pending inquiries
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900 text-sm lg:text-base">
                  Assign Expert Tasks
                </div>
                <div className="text-xs lg:text-sm text-gray-600">
                  5 unassigned leads
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900 text-sm lg:text-base">
                  Update Session Progress
                </div>
                <div className="text-xs lg:text-sm text-gray-600">
                  8 sessions pending update
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Briefcase,
  Users,
  UserCheck,
  Code,
  Save,
  X,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  isActive?: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "job-support",
      title: "Job Support",
      description:
        "Get expert help with your daily work tasks and challenging projects.",
      icon: "briefcase",
      features: [
        "Real-time project assistance",
        "Code review and optimization",
        "Problem-solving guidance",
      ],
      pricing: "Starting from $50/hour",
      isActive: true,
    },
    {
      id: "proxy-interviews",
      title: "Proxy Interview Support",
      description:
        "Professional interview support to help you succeed in technical interviews.",
      icon: "users",
      features: [
        "Technical interview guidance",
        "Mock interview sessions",
        "Question preparation",
      ],
      pricing: "Starting from $100/session",
      isActive: true,
    },
    {
      id: "mentorship",
      title: "1:1 Mentorship",
      description: "Personalized mentorship to accelerate your career growth.",
      icon: "user-check",
      features: [
        "Career roadmap planning",
        "Skill development guidance",
        "Industry insights",
      ],
      pricing: "Starting from $200/month",
      isActive: true,
    },
    {
      id: "project-help",
      title: "Project Help",
      description:
        "End-to-end assistance with your personal or professional projects.",
      icon: "code",
      features: [
        "Architecture design",
        "Code implementation",
        "Testing and debugging",
      ],
      pricing: "Custom pricing based on scope",
      isActive: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    icon: "briefcase",
    features: [""],
    pricing: "",
    isActive: true,
  });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "user-check":
        return <UserCheck className="h-5 w-5" />;
      case "code":
        return <Code className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    if (newService.title && newService.description && newService.pricing) {
      const service: Service = {
        id: `service-${Date.now()}`,
        title: newService.title,
        description: newService.description,
        icon: newService.icon || "briefcase",
        features: newService.features?.filter((f) => f.trim()) || [],
        pricing: newService.pricing,
        isActive: newService.isActive ?? true,
      };
      setServices([...services, service]);
      setNewService({
        title: "",
        description: "",
        icon: "briefcase",
        features: [""],
        pricing: "",
        isActive: true,
      });
      setIsAdding(false);
    }
  };

  const handleEditService = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setNewService(service);
      setEditingId(id);
    }
  };

  const handleUpdateService = () => {
    if (
      editingId &&
      newService.title &&
      newService.description &&
      newService.pricing
    ) {
      setServices(
        services.map((service) =>
          service.id === editingId
            ? {
                ...service,
                title: newService.title!,
                description: newService.description!,
                icon: newService.icon || "briefcase",
                features: newService.features?.filter((f) => f.trim()) || [],
                pricing: newService.pricing!,
                isActive: newService.isActive ?? true,
              }
            : service
        )
      );
      setNewService({
        title: "",
        description: "",
        icon: "briefcase",
        features: [""],
        pricing: "",
        isActive: true,
      });
      setEditingId(null);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  const addFeature = () => {
    setNewService({
      ...newService,
      features: [...(newService.features || []), ""],
    });
  };

  const removeFeature = (index: number) => {
    setNewService({
      ...newService,
      features: newService.features?.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...(newService.features || [])];
    updatedFeatures[index] = value;
    setNewService({
      ...newService,
      features: updatedFeatures,
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Services Management
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1 lg:mt-2">
            Manage and configure all service offerings
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">
              {editingId ? "Edit Service" : "Add New Service"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  placeholder="Service title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Icon</label>
                <select
                  value={newService.icon}
                  onChange={(e) =>
                    setNewService({ ...newService, icon: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="briefcase">Briefcase</option>
                  <option value="users">Users</option>
                  <option value="user-check">User Check</option>
                  <option value="code">Code</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                placeholder="Service description"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pricing</label>
              <Input
                value={newService.pricing}
                onChange={(e) =>
                  setNewService({ ...newService, pricing: e.target.value })
                }
                placeholder="e.g., Starting from $50/hour"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Features</label>
              <div className="space-y-2">
                {newService.features?.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={newService.isActive}
                onChange={(e) =>
                  setNewService({ ...newService, isActive: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm">
                Active Service
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingId ? handleUpdateService : handleAddService}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Service" : "Add Service"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setNewService({
                    title: "",
                    description: "",
                    icon: "briefcase",
                    features: [""],
                    pricing: "",
                    isActive: true,
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {getIconComponent(service.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1">
                      {service.pricing}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700 line-clamp-2">
                {service.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-600 flex items-center"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditService(service.id)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(service.id)}
                  className="flex-1"
                >
                  {service.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;

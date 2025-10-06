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
  Save,
  X,
  Clock,
  DollarSign,
  Users,
  BookOpen,
} from "lucide-react";

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  technologies: string[];
  syllabus: string[];
  isActive?: boolean;
}

const Training = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTraining, setNewTraining] = useState<Partial<Training>>({
    title: "",
    description: "",
    duration: "",
    level: "",
    price: "",
    image: "",
    technologies: [""],
    syllabus: [""],
    isActive: true,
  });

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleAddTraining = () => {
    if (newTraining.title && newTraining.description && newTraining.price) {
      const training: Training = {
        id: `training-${Date.now()}`,
        title: newTraining.title,
        description: newTraining.description,
        duration: newTraining.duration || "3 months",
        level: newTraining.level || "Beginner",
        price: newTraining.price,
        image: newTraining.image || "/course-images/placeholder.png",
        technologies: newTraining.technologies?.filter((t) => t.trim()) || [],
        syllabus: newTraining.syllabus?.filter((s) => s.trim()) || [],
        isActive: newTraining.isActive ?? true,
      };
      setTrainings([...trainings, training]);
      setNewTraining({
        title: "",
        description: "",
        duration: "",
        level: "",
        price: "",
        image: "",
        technologies: [""],
        syllabus: [""],
        isActive: true,
      });
      setIsAdding(false);
    }
  };

  const handleEditTraining = (id: string) => {
    const training = trainings.find((t) => t.id === id);
    if (training) {
      setNewTraining(training);
      setEditingId(id);
    }
  };

  const handleUpdateTraining = () => {
    if (
      editingId &&
      newTraining.title &&
      newTraining.description &&
      newTraining.price
    ) {
      setTrainings(
        trainings.map((training) =>
          training.id === editingId
            ? {
                ...training,
                title: newTraining.title!,
                description: newTraining.description!,
                duration: newTraining.duration || "3 months",
                level: newTraining.level || "Beginner",
                price: newTraining.price!,
                image: newTraining.image || "/course-images/placeholder.png",
                technologies:
                  newTraining.technologies?.filter((t) => t.trim()) || [],
                syllabus: newTraining.syllabus?.filter((s) => s.trim()) || [],
                isActive: newTraining.isActive ?? true,
              }
            : training
        )
      );
      setNewTraining({
        title: "",
        description: "",
        duration: "",
        level: "",
        price: "",
        image: "",
        technologies: [""],
        syllabus: [""],
        isActive: true,
      });
      setEditingId(null);
    }
  };

  const handleDeleteTraining = (id: string) => {
    setTrainings(trainings.filter((training) => training.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id
          ? { ...training, isActive: !training.isActive }
          : training
      )
    );
  };

  const addTechnology = () => {
    setNewTraining({
      ...newTraining,
      technologies: [...(newTraining.technologies || []), ""],
    });
  };

  const removeTechnology = (index: number) => {
    setNewTraining({
      ...newTraining,
      technologies: newTraining.technologies?.filter((_, i) => i !== index),
    });
  };

  const updateTechnology = (index: number, value: string) => {
    const updatedTechnologies = [...(newTraining.technologies || [])];
    updatedTechnologies[index] = value;
    setNewTraining({
      ...newTraining,
      technologies: updatedTechnologies,
    });
  };

  const addSyllabusItem = () => {
    setNewTraining({
      ...newTraining,
      syllabus: [...(newTraining.syllabus || []), ""],
    });
  };

  const removeSyllabusItem = (index: number) => {
    setNewTraining({
      ...newTraining,
      syllabus: newTraining.syllabus?.filter((_, i) => i !== index),
    });
  };

  const updateSyllabusItem = (index: number, value: string) => {
    const updatedSyllabus = [...(newTraining.syllabus || [])];
    updatedSyllabus[index] = value;
    setNewTraining({
      ...newTraining,
      syllabus: updatedSyllabus,
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Training Programs
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1 lg:mt-2">
            Manage and configure all training programs
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Training
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search trainings..."
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
              {editingId ? "Edit Training Program" : "Add New Training Program"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTraining.title}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, title: e.target.value })
                  }
                  placeholder="Training title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={newTraining.price}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, price: e.target.value })
                  }
                  placeholder="e.g., $1299"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={newTraining.duration}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, duration: e.target.value })
                  }
                  placeholder="e.g., 4 months"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Level</label>
                <Input
                  value={newTraining.level}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, level: e.target.value })
                  }
                  placeholder="e.g., Beginner to Advanced"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newTraining.description}
                onChange={(e) =>
                  setNewTraining({
                    ...newTraining,
                    description: e.target.value,
                  })
                }
                placeholder="Training description"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={newTraining.image}
                onChange={(e) =>
                  setNewTraining({ ...newTraining, image: e.target.value })
                }
                placeholder="e.g., /course-images/training.png"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Technologies</label>
              <div className="space-y-2">
                {newTraining.technologies?.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      placeholder={`Technology ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTechnology(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTechnology}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Technology
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Syllabus</label>
              <div className="space-y-2">
                {newTraining.syllabus?.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateSyllabusItem(index, e.target.value)
                      }
                      placeholder={`Syllabus item ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSyllabusItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSyllabusItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Syllabus Item
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={newTraining.isActive}
                onChange={(e) =>
                  setNewTraining({ ...newTraining, isActive: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm">
                Active Training
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingId ? handleUpdateTraining : handleAddTraining}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? "Update Training" : "Add Training"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setNewTraining({
                    title: "",
                    description: "",
                    duration: "",
                    level: "",
                    price: "",
                    image: "",
                    technologies: [""],
                    syllabus: [""],
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

      {/* Trainings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredTrainings.map((training) => (
          <Card key={training.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                    {training.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {training.description}
                  </CardDescription>
                </div>
                <Badge variant={training.isActive ? "default" : "secondary"}>
                  {training.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{training.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{training.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{training.price}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {training.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {training.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{training.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Syllabus:</h4>
                <ul className="space-y-1">
                  {training.syllabus.slice(0, 3).map((item, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-600 flex items-center"
                    >
                      <BookOpen className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                  {training.syllabus.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{training.syllabus.length - 3} more items
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditTraining(training.id)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(training.id)}
                  className="flex-1"
                >
                  {training.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTraining(training.id)}
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

export default Training;

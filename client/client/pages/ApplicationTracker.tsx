import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Building,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Plus,
  TrendingUp,
  BarChart3,
  Target,
  MessageCircle,
  FileText,
  Star,
  Send,
  PhoneCall,
  Users,
  Award,
  Moon,
  Sun,
} from "lucide-react";

const ApplicationTracker = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const applicationStatuses = [
    { id: "applied", label: "Applied", color: "bg-blue-500", count: 12 },
    {
      id: "reviewing",
      label: "Under Review",
      color: "bg-yellow-500",
      count: 8,
    },
    { id: "interview", label: "Interview", color: "bg-purple-500", count: 5 },
    { id: "offer", label: "Offer", color: "bg-green-500", count: 2 },
    { id: "rejected", label: "Rejected", color: "bg-red-500", count: 7 },
  ];

  const mockApplications = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "interview",
      nextStep: "Technical Interview",
      nextStepDate: "2024-01-20",
      salary: "$120k - $150k",
      source: "LinkedIn",
      notes: "Passed initial screening. Technical interview scheduled.",
      interviews: [
        { type: "Phone Screening", date: "2024-01-18", status: "completed" },
        {
          type: "Technical Interview",
          date: "2024-01-20",
          status: "scheduled",
        },
      ],
      priority: "high",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      appliedDate: "2024-01-10",
      status: "reviewing",
      nextStep: "Waiting for response",
      nextStepDate: null,
      salary: "$100k - $130k",
      source: "Company Website",
      notes: "Application submitted through company portal.",
      interviews: [],
      priority: "medium",
    },
    {
      id: 3,
      company: "BigTech Inc",
      position: "Software Engineer",
      location: "Seattle, WA",
      appliedDate: "2024-01-05",
      status: "offer",
      nextStep: "Review offer",
      nextStepDate: "2024-01-25",
      salary: "$140k - $170k",
      source: "Referral",
      notes: "Received offer! Need to negotiate salary and review benefits.",
      interviews: [
        { type: "Phone Screening", date: "2024-01-08", status: "completed" },
        {
          type: "Technical Interview",
          date: "2024-01-12",
          status: "completed",
        },
        { type: "Onsite Interview", date: "2024-01-15", status: "completed" },
      ],
      priority: "high",
    },
    {
      id: 4,
      company: "DataCorp",
      position: "Data Engineer",
      location: "New York, NY",
      appliedDate: "2024-01-08",
      status: "rejected",
      nextStep: "Application closed",
      nextStepDate: null,
      salary: "$110k - $140k",
      source: "Indeed",
      notes:
        "Not selected after technical interview. Good learning experience.",
      interviews: [
        { type: "Phone Screening", date: "2024-01-10", status: "completed" },
        {
          type: "Technical Interview",
          date: "2024-01-14",
          status: "completed",
        },
      ],
      priority: "low",
    },
    {
      id: 5,
      company: "CloudTech",
      position: "DevOps Engineer",
      location: "Austin, TX",
      appliedDate: "2024-01-12",
      status: "applied",
      nextStep: "Waiting for response",
      nextStepDate: null,
      salary: "$115k - $145k",
      source: "JobTrackr",
      notes: "Applied through platform. Auto-filled application.",
      interviews: [],
      priority: "medium",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Send className="h-4 w-4" />;
      case "reviewing":
        return <Eye className="h-4 w-4" />;
      case "interview":
        return <MessageCircle className="h-4 w-4" />;
      case "offer":
        return <Award className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const filteredApplications = mockApplications.filter((app) => {
    if (selectedStatus !== "all" && app.status !== selectedStatus) return false;
    if (
      searchQuery &&
      !app.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !app.position.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const totalApplications = mockApplications.length;
  const responseRate = Math.round(
    (mockApplications.filter((app) => app.status !== "applied").length /
      totalApplications) *
      100,
  );
  const interviewRate = Math.round(
    (mockApplications.filter(
      (app) => app.status === "interview" || app.status === "offer",
    ).length /
      totalApplications) *
      100,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Application Tracker</h1>
              <p className="text-sm text-muted-foreground">
                Track and manage your job applications
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="h-9 w-9"
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Overview */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Total Applications</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{totalApplications}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Response Rate</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{responseRate}%</p>
                <p className="text-sm text-muted-foreground">
                  Companies responded
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Interview Rate</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{interviewRate}%</p>
                <p className="text-sm text-muted-foreground">Got interviews</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Offers</h3>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {
                    mockApplications.filter((app) => app.status === "offer")
                      .length
                  }
                </p>
                <p className="text-sm text-muted-foreground">Pending offers</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Status Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            onClick={() => setSelectedStatus("all")}
            className="mb-2"
          >
            All ({totalApplications})
          </Button>
          {applicationStatuses.map((status) => (
            <motion.div key={status.id} whileHover={{ scale: 1.05 }}>
              <Button
                variant={selectedStatus === status.id ? "default" : "outline"}
                onClick={() => setSelectedStatus(status.id)}
                className="mb-2"
              >
                <div className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                {status.label} ({status.count})
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex items-center space-x-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Applied</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Applications List */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Card
                  className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${getPriorityColor(application.priority)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {application.position}
                          </h3>
                          <Badge
                            className={`${
                              applicationStatuses.find(
                                (s) => s.id === application.status,
                              )?.color
                            } text-white`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="ml-1">
                              {
                                applicationStatuses.find(
                                  (s) => s.id === application.status,
                                )?.label
                              }
                            </span>
                          </Badge>
                          {application.priority === "high" && (
                            <Badge variant="destructive">High Priority</Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {application.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied{" "}
                            {new Date(
                              application.appliedDate,
                            ).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <span>💰 {application.salary}</span>
                          <span>📍 Source: {application.source}</span>
                          {application.nextStepDate && (
                            <span className="text-orange-600 font-medium">
                              ⏰ Next: {application.nextStep} -{" "}
                              {new Date(
                                application.nextStepDate,
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {application.notes && (
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg mb-4">
                            {application.notes}
                          </p>
                        )}

                        {/* Interview Timeline */}
                        {application.interviews.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">
                              Interview Progress:
                            </h4>
                            <div className="flex items-center space-x-2">
                              {application.interviews.map((interview, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-1"
                                >
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      interview.status === "completed"
                                        ? "bg-green-500"
                                        : interview.status === "scheduled"
                                          ? "bg-blue-500"
                                          : "bg-gray-300"
                                    }`}
                                  />
                                  <span className="text-xs">
                                    {interview.type}
                                  </span>
                                  {idx < application.interviews.length - 1 && (
                                    <div className="w-8 h-0.5 bg-gray-300 mx-2" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Add Note
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            Mark as Priority
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {application.status === "interview" && (
                          <Button size="sm" variant="outline">
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Prepare Interview
                          </Button>
                        )}
                        {application.status === "offer" && (
                          <Button size="sm" className="gradient-primary">
                            <Award className="h-4 w-4 mr-2" />
                            Review Offer
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Add Update
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Last updated: {Math.floor(Math.random() * 7) + 1} days
                          ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredApplications.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No applications found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start tracking your job applications"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Application
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;

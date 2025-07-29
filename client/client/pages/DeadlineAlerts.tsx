import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Settings,
  Smartphone,
  Mail,
  MessageSquare,
  Zap,
  Target,
  TrendingUp,
  Filter,
  Search,
  MapPin,
  Building,
  Briefcase,
  Star,
  Eye,
  MoreHorizontal,
  Moon,
  Sun,
} from "lucide-react";

const DeadlineAlerts = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    slack: false,
  });

  const [alertSettings, setAlertSettings] = useState({
    advanceNotice: 3, // days
    dailyDigest: true,
    weeklyReminder: true,
    urgentAlerts: true,
  });

  const upcomingDeadlines = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      deadline: "2024-01-25",
      daysLeft: 3,
      priority: "high",
      status: "pending",
      applicationDate: "2024-01-15",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "application",
      notes: "Application deadline for Q1 hiring",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      deadline: "2024-01-27",
      daysLeft: 5,
      priority: "medium",
      status: "pending",
      applicationDate: "2024-01-20",
      location: "Remote",
      salary: "$100k - $130k",
      type: "interview",
      notes: "Technical interview preparation needed",
    },
    {
      id: 3,
      company: "BigTech Inc",
      position: "Software Engineer",
      deadline: "2024-01-30",
      daysLeft: 8,
      priority: "high",
      status: "pending",
      applicationDate: "2024-01-10",
      location: "Seattle, WA",
      salary: "$140k - $170k",
      type: "response",
      notes: "Follow up on interview feedback",
    },
    {
      id: 4,
      company: "DataCorp",
      position: "Data Engineer",
      deadline: "2024-01-22",
      daysLeft: 0,
      priority: "urgent",
      status: "overdue",
      applicationDate: "2024-01-08",
      location: "New York, NY",
      salary: "$110k - $140k",
      type: "application",
      notes: "Application deadline TODAY - submit ASAP",
    },
    {
      id: 5,
      company: "CloudTech",
      position: "DevOps Engineer",
      deadline: "2024-02-05",
      daysLeft: 14,
      priority: "low",
      status: "pending",
      applicationDate: "2024-01-18",
      location: "Austin, TX",
      salary: "$115k - $145k",
      type: "portfolio",
      notes: "Portfolio submission for technical review",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 0) return "text-red-600";
    if (daysLeft <= 3) return "text-orange-600";
    if (daysLeft <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-4 w-4" />;
      case "interview":
        return <MessageSquare className="h-4 w-4" />;
      case "response":
        return <Clock className="h-4 w-4" />;
      case "portfolio":
        return <Star className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

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

  const urgentCount = upcomingDeadlines.filter(
    (d) => d.priority === "urgent" || d.daysLeft <= 1,
  ).length;
  const todayCount = upcomingDeadlines.filter((d) => d.daysLeft === 0).length;
  const thisWeekCount = upcomingDeadlines.filter(
    (d) => d.daysLeft <= 7 && d.daysLeft > 0,
  ).length;

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
              <h1 className="text-2xl font-bold flex items-center">
                <Bell className="h-6 w-6 mr-2 text-primary" />
                Deadline Alerts
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay on top of your application deadlines and never miss an
                opportunity
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
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Deadline
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
            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Urgent</h3>
                </div>
                <p className="text-3xl font-bold mt-2 text-red-600">
                  {urgentCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  Needs immediate attention
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold">Today</h3>
                </div>
                <p className="text-3xl font-bold mt-2 text-orange-600">
                  {todayCount}
                </p>
                <p className="text-sm text-muted-foreground">Due today</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">This Week</h3>
                </div>
                <p className="text-3xl font-bold mt-2 text-blue-600">
                  {thisWeekCount}
                </p>
                <p className="text-sm text-muted-foreground">Due this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Completed</h3>
                </div>
                <p className="text-3xl font-bold mt-2 text-green-600">23</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Deadlines List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingDeadlines.length})
                </TabsTrigger>
                <TabsTrigger value="overdue">Overdue (1)</TabsTrigger>
                <TabsTrigger value="completed">Completed (23)</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {upcomingDeadlines
                      .filter((d) => d.status !== "overdue")
                      .sort((a, b) => a.daysLeft - b.daysLeft)
                      .map((deadline, index) => (
                        <motion.div
                          key={deadline.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ delay: index * 0.1 }}
                          layout
                        >
                          <Card
                            className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${
                              deadline.daysLeft <= 3
                                ? "border-l-red-500"
                                : deadline.daysLeft <= 7
                                  ? "border-l-yellow-500"
                                  : "border-l-green-500"
                            }`}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <div className="flex items-center space-x-2">
                                      {getDeadlineIcon(deadline.type)}
                                      <h3 className="text-xl font-semibold">
                                        {deadline.position}
                                      </h3>
                                    </div>
                                    <Badge
                                      className={getPriorityColor(
                                        deadline.priority,
                                      )}
                                    >
                                      {deadline.priority.toUpperCase()}
                                    </Badge>
                                  </div>

                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center">
                                      <Building className="h-4 w-4 mr-1" />
                                      {deadline.company}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {deadline.location}
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {deadline.deadline}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-4 text-sm mb-4">
                                    <span>💰 {deadline.salary}</span>
                                    <Badge
                                      variant="outline"
                                      className="capitalize"
                                    >
                                      {deadline.type} Deadline
                                    </Badge>
                                  </div>

                                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                    {deadline.notes}
                                  </p>
                                </div>

                                <div className="text-right ml-4">
                                  <div
                                    className={`text-2xl font-bold ${getDaysLeftColor(deadline.daysLeft)}`}
                                  >
                                    {deadline.daysLeft === 0
                                      ? "TODAY"
                                      : deadline.daysLeft === 1
                                        ? "1 DAY"
                                        : `${deadline.daysLeft} DAYS`}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    remaining
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-2"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center space-x-2">
                                  {deadline.daysLeft <= 1 && (
                                    <motion.div
                                      animate={{ scale: [1, 1.1, 1] }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                      }}
                                    >
                                      <Badge className="bg-red-100 text-red-800">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        Urgent
                                      </Badge>
                                    </motion.div>
                                  )}
                                </div>

                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="gradient-primary"
                                  >
                                    <Zap className="h-4 w-4 mr-2" />
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>
              </TabsContent>

              <TabsContent value="overdue" className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {upcomingDeadlines
                    .filter((d) => d.status === "overdue")
                    .map((deadline, index) => (
                      <motion.div
                        key={deadline.id}
                        variants={itemVariants}
                        className="p-6 border-2 border-red-200 bg-red-50/50 dark:bg-red-950/20 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 mb-4">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <h3 className="text-xl font-semibold text-red-700">
                            {deadline.position} - OVERDUE
                          </h3>
                        </div>
                        <p className="text-sm text-red-600 mb-4">
                          {deadline.notes}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="destructive">
                            Mark as Missed
                          </Button>
                          <Button size="sm" variant="outline">
                            Request Extension
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">
                    23 Deadlines Completed
                  </h3>
                  <p>Great job staying on top of your applications!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Notification Settings Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Test Notifications
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Sync Calendar
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Deadline
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email Alerts</span>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            email: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="text-sm">Push Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            push: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">SMS Alerts</span>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({
                            ...prev,
                            sms: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">
                      Advance Notice (days)
                    </Label>
                    <Select
                      value={alertSettings.advanceNotice.toString()}
                      onValueChange={(value) =>
                        setAlertSettings((prev) => ({
                          ...prev,
                          advanceNotice: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="14">2 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Digest</span>
                      <Switch
                        checked={alertSettings.dailyDigest}
                        onCheckedChange={(checked) =>
                          setAlertSettings((prev) => ({
                            ...prev,
                            dailyDigest: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Summary</span>
                      <Switch
                        checked={alertSettings.weeklyReminder}
                        onCheckedChange={(checked) =>
                          setAlertSettings((prev) => ({
                            ...prev,
                            weeklyReminder: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Urgent Alerts</span>
                      <Switch
                        checked={alertSettings.urgentAlerts}
                        onCheckedChange={(checked) =>
                          setAlertSettings((prev) => ({
                            ...prev,
                            urgentAlerts: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-time Rate</span>
                    <Badge className="bg-green-100 text-green-800">96%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <Badge variant="outline">2.3 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Missed Deadlines</span>
                    <Badge className="bg-red-100 text-red-800">2</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineAlerts;

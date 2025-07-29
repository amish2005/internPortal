import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Heart,
  Star,
  Eye,
  Share,
  Trash2,
  Plus,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Zap,
  MoreHorizontal,
  Calendar,
  FileText,
  MessageCircle,
  ExternalLink,
  Archive,
  Tag,
  SortAsc,
  Grid,
  List,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

const SavedJobs = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");

  const categories = [
    { id: "all", name: "All Jobs", count: 12 },
    { id: "applied", name: "Applied", count: 5 },
    { id: "interested", name: "Interested", count: 4 },
    { id: "priority", name: "Priority", count: 3 },
  ];

  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      remote: true,
      savedDate: "2024-01-20",
      matchPercentage: 95,
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      description:
        "Build scalable web applications using modern technologies...",
      category: "priority",
      applied: false,
      notes: "Great company culture, excellent benefits package",
      companyLogo: "🚀",
      isVerified: true,
      postedDate: "2024-01-18",
      applicants: 45,
      views: 234,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $130k",
      type: "Full-time",
      remote: true,
      savedDate: "2024-01-19",
      matchPercentage: 88,
      skills: ["Python", "Django", "React", "PostgreSQL"],
      description: "Join our innovative team building the future of fintech...",
      category: "interested",
      applied: true,
      notes: "Applied on 2024-01-20, waiting for response",
      companyLogo: "💰",
      isVerified: false,
      postedDate: "2024-01-15",
      applicants: 23,
      views: 156,
    },
    {
      id: 3,
      title: "Mobile App Developer",
      company: "MobileFirst",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      remote: false,
      savedDate: "2024-01-18",
      matchPercentage: 82,
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      description: "Create amazing mobile experiences for millions of users...",
      category: "interested",
      applied: false,
      notes: "Need to research company culture more",
      companyLogo: "📱",
      isVerified: true,
      postedDate: "2024-01-16",
      applicants: 67,
      views: 345,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$110k - $140k",
      type: "Full-time",
      remote: true,
      savedDate: "2024-01-17",
      matchPercentage: 78,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      description: "Scale our infrastructure to support rapid growth...",
      category: "interested",
      applied: true,
      notes: "Completed first interview, technical round next week",
      companyLogo: "☁️",
      isVerified: true,
      postedDate: "2024-01-12",
      applicants: 34,
      views: 189,
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataDriven",
      location: "Boston, MA",
      salary: "$130k - $160k",
      type: "Full-time",
      remote: true,
      savedDate: "2024-01-16",
      matchPercentage: 91,
      skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
      description: "Use data to drive business decisions and insights...",
      category: "priority",
      applied: false,
      notes: "Perfect match for skills, apply ASAP",
      companyLogo: "📊",
      isVerified: false,
      postedDate: "2024-01-14",
      applicants: 89,
      views: 567,
    },
    {
      id: 6,
      title: "Product Manager",
      company: "InnovateCorp",
      location: "Austin, TX",
      salary: "$140k - $170k",
      type: "Full-time",
      remote: false,
      savedDate: "2024-01-15",
      matchPercentage: 85,
      skills: ["Product Strategy", "User Research", "Analytics", "Agile"],
      description:
        "Lead product vision and strategy for our flagship products...",
      category: "applied",
      applied: true,
      notes: "Application submitted, follow up in 1 week",
      companyLogo: "🎯",
      isVerified: true,
      postedDate: "2024-01-10",
      applicants: 156,
      views: 432,
    },
  ];

  const filteredJobs = savedJobs.filter((job) => {
    if (selectedCategory !== "all" && job.category !== selectedCategory)
      return false;
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const removeFromSaved = (jobId: number) => {
    // In a real app, this would update the backend
    console.log("Removing job:", jobId);
  };

  const updateJobCategory = (jobId: number, newCategory: string) => {
    // In a real app, this would update the backend
    console.log("Updating job category:", jobId, newCategory);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "priority":
        return "bg-red-100 text-red-800";
      case "applied":
        return "bg-green-100 text-green-800";
      case "interested":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                <Bookmark className="h-6 w-6 mr-2 text-primary" />
                Saved Jobs
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your bookmarked job opportunities
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
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Find More Jobs
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
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Total Saved</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{savedJobs.length}</p>
                <p className="text-sm text-muted-foreground">Job bookmarks</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Applied</h3>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {savedJobs.filter((job) => job.applied).length}
                </p>
                <p className="text-sm text-muted-foreground">From saved jobs</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Avg Match</h3>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {Math.round(
                    savedJobs.reduce(
                      (acc, job) => acc + job.matchPercentage,
                      0,
                    ) / savedJobs.length,
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground">
                  Skill compatibility
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Priority</h3>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {
                    savedJobs.filter((job) => job.category === "priority")
                      .length
                  }
                </p>
                <p className="text-sm text-muted-foreground">High priority</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.div key={category.id} whileHover={{ scale: 1.05 }}>
                <Button
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                >
                  {category.name} ({category.count})
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search saved jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateAdded">Date Added</SelectItem>
                <SelectItem value="match">Match %</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Jobs Grid/List */}
        <motion.div
          className={`${
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Card
                  className={`group hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "p-0" : ""
                  }`}
                >
                  <CardContent className={viewMode === "list" ? "p-6" : "p-6"}>
                    {viewMode === "grid" ? (
                      // Grid View
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <motion.div
                            className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {job.companyLogo}
                          </motion.div>
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
                                <Share className="h-4 w-4 mr-2" />
                                Share Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="h-4 w-4 mr-2" />
                                Change Category
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Add Notes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => removeFromSaved(job.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            {job.isVerified && (
                              <Badge className="bg-green-100 text-green-800">
                                <Star className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                            {job.remote && (
                              <Badge variant="outline" className="ml-2">
                                Remote
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Saved {new Date(job.savedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={getMatchColor(job.matchPercentage)}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {job.matchPercentage}% Match
                          </Badge>
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        {job.notes && (
                          <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                            {job.notes}
                          </p>
                        )}

                        <div className="flex space-x-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              size="sm"
                              className="flex-1 gradient-primary"
                              disabled={job.applied}
                            >
                              {job.applied ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Applied
                                </>
                              ) : (
                                <>
                                  <Zap className="h-4 w-4 mr-2" />
                                  Apply
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="flex items-center space-x-6">
                        <motion.div
                          className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {job.companyLogo}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {job.company}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getMatchColor(job.matchPercentage)}
                              >
                                {job.matchPercentage}% Match
                              </Badge>
                              <Badge className={getCategoryColor(job.category)}>
                                {job.category}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            <span>{job.location}</span>
                            <span>{job.salary}</span>
                            <span>
                              Saved{" "}
                              {new Date(job.savedDate).toLocaleDateString()}
                            </span>
                            {job.remote && (
                              <Badge variant="outline">Remote</Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {job.skills.slice(0, 4).map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 4}
                              </Badge>
                            )}
                          </div>

                          {job.notes && (
                            <p className="text-xs text-muted-foreground bg-muted p-2 rounded mb-3">
                              {job.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="gradient-primary"
                            disabled={job.applied}
                          >
                            {job.applied ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Applied
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4 mr-2" />
                                Apply
                              </>
                            )}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="h-4 w-4 mr-2" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => removeFromSaved(job.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved jobs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start saving jobs that interest you"}
            </p>
            <Button onClick={() => navigate("/explore-jobs")}>
              <Search className="h-4 w-4 mr-2" />
              Explore Jobs
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

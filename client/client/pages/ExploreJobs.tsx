import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Wifi,
  Clock,
  DollarSign,
  Star,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  SlidersHorizontal,
  Building,
  Users,
  Calendar,
  TrendingUp,
  Zap,
  Heart,
  Moon,
  Sun,
} from "lucide-react";
import axios from "axios";

const ExploreJobs = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    experience: [],
    salary: [0, 200000],
    location: "",
    company: "",
    remote: false,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [jobs, setJobs] = useState<any[]>([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserId(res.data.user.userId);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
        setIsLoggedIn(false);

      });
  }, []);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/job/get-internships");
        const data = await response.json();

        const formattedJobs = data.map((job: any) => ({
          id: job._id,
          title: job.title,
          company: job.companyName
            ? job.companyName.split("\n")[0].trim()
            : job.company
              ? job.company.split("\n")[0].trim()
              : "Unknown",
          isActive: job.company.includes("Actively hiring"),
          location: job.location || "Remote",
          type: "Internship",
          salary: job.stipend || "Unpaid",
          experience: job.experience || "Entry Level",
          skills: job.skills || [],
          description: job.description || job.about || "",
          postedAt: job.postedOn || job.postDay || "Recently",
          applicants: job.openings || 0,
          matchPercentage: 80,
          isVerified: true,
          remote: job.location.includes("remote") || job.location.includes("Remote") || false,
          companyLogo: "🏢", // fallback emoji logo
          applyLink: job.applicationLink || job.directLink,
          source: job.source || "",
          isSaved: job.isSaved || false,
        }));

        setJobs(formattedJobs);
        if (isLoggedIn) {
          const res = await axios.get("http://localhost:5000/api/job/saved-jobs", {
            withCredentials: true,
          });
          const savedJobIds = res.data.map((job: any) => job._id);

          setJobs((prevJobs) =>
            prevJobs.map((job) => ({
              ...job,
              isSaved: savedJobIds.includes(job.id),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);


  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];
  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Lead/Principal",
  ];
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Spotify",
  ];

  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      experience: "Senior Level",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      description:
        "Build scalable web applications using modern technologies...",
      postedAt: "2 days ago",
      applicants: 45,
      matchPercentage: 95,
      isVerified: true,
      remote: true,
      companyLogo: "🚀",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $130k",
      experience: "Mid Level",
      skills: ["Python", "Django", "React", "PostgreSQL"],
      description: "Join our innovative team building the future of fintech...",
      postedAt: "1 day ago",
      applicants: 23,
      matchPercentage: 88,
      isVerified: false,
      remote: true,
      companyLogo: "💰",
    },
  ];

  const toggleSaveJob = async (jobId: string) => {
    try {
      const job = jobs.find((j) => j.id === jobId);
      if (!job) return;

      if (job.isSaved) {
        await axios.delete(`http://localhost:5000/api/job/unsave/${jobId}`, {
          withCredentials: true,
        });
      } else {
        await axios.post(`http://localhost:5000/api/job/save/${jobId}`, {}, {
          withCredentials: true,
        });
      }

      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === jobId ? { ...j, isSaved: !j.isSaved } : j
        )
      );

    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };


  const filteredJobs = React.useMemo(() => {
    return jobs.filter((job) => {
      if (
        searchQuery &&
        !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (activeTab === "saved" && !job.isSaved) return false;
      if (activeTab === "verified" && !job.isVerified) return false;
      return true;
    });
  }, [jobs, searchQuery, activeTab]);


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
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
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
              <h1 className="text-2xl font-bold">Explore Jobs</h1>
              <p className="text-sm text-muted-foreground">
                {filteredJobs.length} jobs available
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date Posted</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="match">Match %</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Job title, company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Job Type</label>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Experience Level
                  </label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={level} />
                        <label htmlFor={level} className="text-sm">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Salary Range: ${selectedFilters.salary[0].toLocaleString()}{" "}
                    - ${selectedFilters.salary[1].toLocaleString()}
                  </label>
                  <Slider
                    value={selectedFilters.salary}
                    onValueChange={(value) =>
                      setSelectedFilters((prev) => ({ ...prev, salary: value }))
                    }
                    max={200000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="City, state, or remote"
                    value={selectedFilters.location}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Select
                    value={selectedFilters.company}
                    onValueChange={(value) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        company: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remote Work */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={selectedFilters.remote}
                    onCheckedChange={(checked) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        remote: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="remote" className="text-sm font-medium">
                    Remote work only
                  </label>
                </div>

                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Listings */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All Jobs ({jobs.length})
                </TabsTrigger>
                <TabsTrigger value="verified">
                  Verified ({jobs.filter((j) => j.isVerified).length})
                </TabsTrigger>
                <TabsTrigger value="saved">
                  Saved ({jobs.filter((j) => j.isSaved).length})
                </TabsTrigger>
                <TabsTrigger value="applied">Applied (0)</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Job Cards */}

            <div key={activeTab} className="space-y-4">
              <AnimatePresence mode="wait">
                {filteredJobs.length === 0 ? (
                  <motion.div
                    key="no-jobs"
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search terms
                    </p>
                  </motion.div>
                ) : (
                  filteredJobs
                    .filter((job) => job.title && job.company)
                    .map((job, index) => (
                      <motion.div
                        key={job.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start space-x-4">
                                <motion.div
                                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  {job.companyLogo}
                                </motion.div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                      {job.title}
                                    </h3>
                                    {job.isVerified && (
                                      <Badge className="bg-green-100 text-green-800">
                                        <Star className="h-3 w-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                                    <div className="flex items-center">
                                      <Building className="h-4 w-4 mr-1" />
                                      {job.company}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center">
                                      <Briefcase className="h-4 w-4 mr-1" />
                                      {job.type}
                                    </div>
                                    <div className="flex items-center">
                                      <Wifi className="h-4 w-4 mr-1" />
                                      {job.source}
                                    </div>
                                    {job.remote && <Badge variant="outline">Remote</Badge>}
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {job.salary}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {job.postedAt}
                                    </div>
                                    {job.applicants !== 0 && (
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1" />
                                        {job.applicants} openings
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Badge className="bg-blue-100 text-blue-800">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  {job.matchPercentage}% Match
                                </Badge>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleSaveJob(job.id)}
                                  className="p-2 rounded-full hover:bg-muted transition-colors"
                                >
                                  {job.isSaved ? (
                                    <BookmarkCheck className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Bookmark className="h-5 w-5" />
                                  )}
                                </motion.button>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {job.experience}
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" className="gradient-primary">
                                      <Zap className="h-4 w-4 mr-2" />
                                      Quick Apply
                                    </Button>
                                  </a>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                )}
              </AnimatePresence>

              {/* Load More */}
              {filteredJobs.length > 0 && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="outline" size="lg">
                    Load More Jobs
                  </Button>
                </motion.div>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExploreJobs;

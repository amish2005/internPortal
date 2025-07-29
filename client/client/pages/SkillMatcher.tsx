import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Brain,
  Target,
  TrendingUp,
  Star,
  Zap,
  Award,
  Code,
  Database,
  Cloud,
  Smartphone,
  Palette,
  BarChart3,
  Users,
  Shield,
  Lightbulb,
  CheckCircle,
  Plus,
  Minus,
  RefreshCw,
  Eye,
  BookOpen,
  Rocket,
  Moon,
  Sun,
} from "lucide-react";

const SkillMatcher = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [userSkills, setUserSkills] = useState([
    { name: "JavaScript", level: 85, category: "Programming" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "TypeScript", level: 80, category: "Programming" },
    { name: "Python", level: 70, category: "Programming" },
    { name: "AWS", level: 65, category: "Cloud" },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [matchingJobs, setMatchingJobs] = useState([]);

  const skillCategories = [
    {
      id: "programming",
      name: "Programming",
      icon: Code,
      color: "bg-blue-500",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "Go",
        "Rust",
        "Swift",
      ],
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: Palette,
      color: "bg-purple-500",
      skills: ["React", "Vue.js", "Angular", "Svelte", "HTML", "CSS", "Sass"],
    },
    {
      id: "backend",
      name: "Backend",
      icon: Database,
      color: "bg-green-500",
      skills: [
        "Node.js",
        "Express",
        "Django",
        "Flask",
        "Spring Boot",
        "FastAPI",
      ],
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: Cloud,
      color: "bg-cyan-500",
      skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      color: "bg-orange-500",
      skills: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Xamarin",
        "Ionic",
      ],
    },
    {
      id: "data",
      name: "Data & AI",
      icon: BarChart3,
      color: "bg-red-500",
      skills: [
        "Machine Learning",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "NumPy",
        "SQL",
      ],
    },
  ];

  const jobMatches = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      matchPercentage: 95,
      salaryRange: "$120k - $150k",
      location: "San Francisco, CA",
      requiredSkills: [
        { name: "React", importance: "critical", userLevel: 90 },
        { name: "TypeScript", importance: "high", userLevel: 80 },
        { name: "JavaScript", importance: "critical", userLevel: 85 },
        { name: "GraphQL", importance: "medium", userLevel: 0 },
      ],
      skillGaps: ["GraphQL", "Testing"],
      strengthAreas: ["React", "JavaScript", "TypeScript"],
      remote: true,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      matchPercentage: 88,
      salaryRange: "$100k - $130k",
      location: "Remote",
      requiredSkills: [
        { name: "JavaScript", importance: "critical", userLevel: 85 },
        { name: "React", importance: "high", userLevel: 90 },
        { name: "Node.js", importance: "critical", userLevel: 75 },
        { name: "MongoDB", importance: "high", userLevel: 0 },
      ],
      skillGaps: ["MongoDB", "Redis"],
      strengthAreas: ["React", "JavaScript"],
      remote: true,
    },
    {
      id: 3,
      title: "Cloud Engineer",
      company: "CloudTech",
      matchPercentage: 72,
      salaryRange: "$110k - $140k",
      location: "Seattle, WA",
      requiredSkills: [
        { name: "AWS", importance: "critical", userLevel: 65 },
        { name: "Docker", importance: "high", userLevel: 0 },
        { name: "Kubernetes", importance: "high", userLevel: 0 },
        { name: "Python", importance: "medium", userLevel: 70 },
      ],
      skillGaps: ["Docker", "Kubernetes", "Terraform"],
      strengthAreas: ["Python", "AWS"],
      remote: false,
    },
  ];

  const updateSkillLevel = (skillName: string, newLevel: number) => {
    setUserSkills((prev) =>
      prev.map((skill) =>
        skill.name === skillName ? { ...skill, level: newLevel } : skill,
      ),
    );
  };

  const addSkill = (skillName: string, category: string) => {
    if (!userSkills.find((s) => s.name === skillName)) {
      setUserSkills((prev) => [
        ...prev,
        { name: skillName, level: 50, category },
      ]);
    }
  };

  const removeSkill = (skillName: string) => {
    setUserSkills((prev) => prev.filter((skill) => skill.name !== skillName));
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-red-500";
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
                <Brain className="h-6 w-6 mr-2 text-primary" />
                AI Skill Matcher
              </h1>
              <p className="text-sm text-muted-foreground">
                Discover jobs that match your skills and identify growth
                opportunities
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
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Matches
            </Button>
            <Button>
              <Rocket className="h-4 w-4 mr-2" />
              Improve Skills
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overview Stats */}
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
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Skill Match</h3>
                </div>
                <p className="text-3xl font-bold mt-2">87%</p>
                <p className="text-sm text-muted-foreground">
                  Average job match
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Skills Tracked</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{userSkills.length}</p>
                <p className="text-sm text-muted-foreground">Active skills</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Skill Gaps</h3>
                </div>
                <p className="text-3xl font-bold mt-2">5</p>
                <p className="text-sm text-muted-foreground">
                  Areas to improve
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Market Value</h3>
                </div>
                <p className="text-3xl font-bold mt-2">$125k</p>
                <p className="text-sm text-muted-foreground">
                  Estimated salary
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Management */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="current" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Skills</TabsTrigger>
                <TabsTrigger value="add">Add Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userSkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{skill.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {skill.category}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.name)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Proficiency</span>
                              <span className="font-medium">
                                {skill.level}%
                              </span>
                            </div>
                            <Slider
                              value={[skill.level]}
                              onValueChange={([value]) =>
                                updateSkillLevel(skill.name, value)
                              }
                              max={100}
                              step={5}
                              className="w-full"
                            />
                            <div
                              className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </motion.div>
                      ))}

                      {userSkills.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No skills added yet</p>
                          <p className="text-sm">Add skills to get started</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="add" className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {skillCategories.map((category, index) => (
                        <motion.div key={category.id} variants={itemVariants}>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <category.icon className={`h-5 w-5 text-white`} />
                              <h4 className="font-medium">{category.name}</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {category.skills.map((skill) => (
                                <motion.div
                                  key={skill}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Badge
                                    variant={
                                      userSkills.find((s) => s.name === skill)
                                        ? "default"
                                        : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() =>
                                      userSkills.find((s) => s.name === skill)
                                        ? removeSkill(skill)
                                        : addSkill(skill, category.name)
                                    }
                                  >
                                    {userSkills.find(
                                      (s) => s.name === skill,
                                    ) ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <Plus className="h-3 w-3 mr-1" />
                                    )}
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Job Matches */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Job Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {jobMatches.map((job, index) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <span>{job.location}</span>
                            <span>{job.salaryRange}</span>
                            {job.remote && (
                              <Badge variant="outline">Remote</Badge>
                            )}
                          </div>
                        </div>
                        <Badge
                          className={`text-lg px-3 py-1 ${getMatchColor(job.matchPercentage)}`}
                        >
                          {job.matchPercentage}% Match
                        </Badge>
                      </div>

                      {/* Skill Analysis */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">
                            💪 Your Strengths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.strengthAreas.map((skill) => (
                              <Badge
                                key={skill}
                                className="bg-green-100 text-green-800"
                              >
                                <Star className="h-3 w-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-orange-600">
                            📚 Skills to Learn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skillGaps.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="border-orange-300 text-orange-600"
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Required Skills Breakdown */}
                        <div>
                          <h4 className="font-medium mb-2">
                            Required Skills Analysis
                          </h4>
                          <div className="space-y-2">
                            {job.requiredSkills.map((skill) => (
                              <div
                                key={skill.name}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm">{skill.name}</span>
                                  <Badge
                                    variant={
                                      skill.importance === "critical"
                                        ? "destructive"
                                        : skill.importance === "high"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {skill.importance}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <span
                                    className={`text-sm font-medium ${
                                      skill.userLevel > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {skill.userLevel > 0
                                      ? `${skill.userLevel}%`
                                      : "Not learned"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" className="gradient-primary">
                            <Zap className="h-4 w-4 mr-2" />
                            Quick Apply
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Skill Development Recommendations */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Skill Development Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">High Priority</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn GraphQL to increase your match rate by 15%
                    </p>
                    <Button size="sm" variant="outline">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium">Medium Priority</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add MongoDB to unlock 8 more job opportunities
                    </p>
                    <Button size="sm" variant="outline">
                      Explore Courses
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium">Future Growth</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Strengthen your AWS skills for senior positions
                    </p>
                    <Button size="sm" variant="outline">
                      View Path
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillMatcher;

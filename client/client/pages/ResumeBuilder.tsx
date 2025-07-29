import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Download,
  Eye,
  Wand2,
  Plus,
  X,
  FileText,
  Palette,
  Layout,
  Sparkles,
  Github,
  Linkedin,
  Globe,
  CheckCircle,
  AlertCircle,
  Save,
  Share,
  Copy,
  Star,
  Moon,
  Sun,
} from "lucide-react";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });

  const [completionScore, setCompletionScore] = useState(65);

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      preview: "🎨",
      description: "Clean and contemporary design perfect for tech roles",
      color: "blue",
      features: ["ATS-friendly", "Modern layout", "Skills showcase"],
    },
    {
      id: "classic",
      name: "Classic Executive",
      preview: "📄",
      description: "Traditional format ideal for corporate positions",
      color: "gray",
      features: ["Traditional layout", "Professional", "Corporate-friendly"],
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      preview: "🎭",
      description: "Eye-catching design for creative professionals",
      color: "purple",
      features: ["Visual elements", "Creative layout", "Portfolio focus"],
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      preview: "⚪",
      description: "Simple and elegant design that highlights content",
      color: "green",
      features: ["Minimalist", "Content focus", "Easy to read"],
    },
  ];

  const aiSuggestions = [
    {
      section: "summary",
      suggestion: "Add action-oriented language and quantifiable achievements",
      impact: "High",
    },
    {
      section: "experience",
      suggestion: "Include more specific technical skills and project outcomes",
      impact: "Medium",
    },
    {
      section: "skills",
      suggestion:
        "Organize skills by category (Programming, Tools, Frameworks)",
      impact: "Medium",
    },
  ];

  const sampleExperience = {
    id: Date.now(),
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [],
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...sampleExperience, id: Date.now() }],
    }));
  };

  const updateExperience = (id: number, field: string, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const removeExperience = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
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
              <h1 className="text-2xl font-bold">Resume Builder</h1>
              <p className="text-sm text-muted-foreground">
                Create your professional resume with AI assistance
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
            <div className="text-right">
              <p className="text-sm font-medium">
                Completion: {completionScore}%
              </p>
              <Progress value={completionScore} className="w-32 h-2" />
            </div>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="template">
                  <Layout className="h-4 w-4 mr-2" />
                  Template
                </TabsTrigger>
                <TabsTrigger value="content">
                  <FileText className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="design">
                  <Palette className="h-4 w-4 mr-2" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="ai">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="template" className="space-y-6">
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {templates.map((template, index) => (
                    <motion.div key={template.id} variants={itemVariants}>
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedTemplate === template.id
                            ? "border-primary shadow-lg"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardHeader className="text-center">
                          <motion.div
                            className="text-6xl mb-4"
                            whileHover={{ scale: 1.1 }}
                          >
                            {template.preview}
                          </motion.div>
                          <CardTitle className="flex items-center justify-center">
                            {template.name}
                            {selectedTemplate === template.id && (
                              <CheckCircle className="h-4 w-4 ml-2 text-primary" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {template.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {template.features.map((feature) => (
                              <Badge
                                key={feature}
                                variant="secondary"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Import</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Import your information from existing profiles to get
                      started quickly.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" className="w-full">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" className="w-full">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Upload PDF
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Personal Information */}
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={resumeData.personalInfo.fullName}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    fullName: e.target.value,
                                  },
                                }))
                              }
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={resumeData.personalInfo.email}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    email: e.target.value,
                                  },
                                }))
                              }
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={resumeData.personalInfo.phone}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    phone: e.target.value,
                                  },
                                }))
                              }
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={resumeData.personalInfo.location}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    location: e.target.value,
                                  },
                                }))
                              }
                              placeholder="San Francisco, CA"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={resumeData.personalInfo.website}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    website: e.target.value,
                                  },
                                }))
                              }
                              placeholder="johndoe.dev"
                            />
                          </div>
                          <div>
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              value={resumeData.personalInfo.linkedin}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    linkedin: e.target.value,
                                  },
                                }))
                              }
                              placeholder="linkedin.com/in/johndoe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                              id="github"
                              value={resumeData.personalInfo.github}
                              onChange={(e) =>
                                setResumeData((prev) => ({
                                  ...prev,
                                  personalInfo: {
                                    ...prev.personalInfo,
                                    github: e.target.value,
                                  },
                                }))
                              }
                              placeholder="github.com/johndoe"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Professional Summary */}
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Professional Summary</CardTitle>
                        <Button variant="outline" size="sm">
                          <Wand2 className="h-4 w-4 mr-2" />
                          AI Generate
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={resumeData.summary}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              summary: e.target.value,
                            }))
                          }
                          placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                          rows={4}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Work Experience */}
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Work Experience</CardTitle>
                        <Button onClick={addExperience} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <AnimatePresence>
                          {resumeData.experience.map((exp, index) => (
                            <motion.div
                              key={exp.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 border rounded-lg space-y-4"
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">
                                  Experience #{index + 1}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeExperience(exp.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Company</Label>
                                  <Input
                                    value={exp.company}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "company",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Company Name"
                                  />
                                </div>
                                <div>
                                  <Label>Position</Label>
                                  <Input
                                    value={exp.position}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "position",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Job Title"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Start Date</Label>
                                  <Input
                                    type="date"
                                    value={exp.startDate}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "startDate",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>End Date</Label>
                                  <Input
                                    type="date"
                                    value={exp.endDate}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "endDate",
                                        e.target.value,
                                      )
                                    }
                                    disabled={exp.current}
                                  />
                                </div>
                              </div>

                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={exp.description}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Describe your role and achievements..."
                                  rows={3}
                                />
                                <div className="flex justify-end mt-2">
                                  <Button variant="outline" size="sm">
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    AI Enhance
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {resumeData.experience.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No work experience added yet</p>
                            <p className="text-sm">
                              Add your professional experience to get started
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customize Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Color Scheme</Label>
                      <div className="grid grid-cols-6 gap-3 mt-2">
                        {[
                          "blue",
                          "green",
                          "purple",
                          "red",
                          "orange",
                          "gray",
                        ].map((color) => (
                          <motion.div
                            key={color}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-12 h-12 rounded-lg bg-${color}-500 cursor-pointer`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Font Style</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter (Modern)</SelectItem>
                          <SelectItem value="roboto">Roboto (Clean)</SelectItem>
                          <SelectItem value="lato">Lato (Friendly)</SelectItem>
                          <SelectItem value="times">
                            Times (Traditional)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Layout Style</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Card className="cursor-pointer hover:shadow-md">
                          <CardContent className="p-4 text-center">
                            <div className="w-full h-16 bg-muted rounded mb-2" />
                            <p className="text-sm">Single Column</p>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:shadow-md">
                          <CardContent className="p-4 text-center">
                            <div className="grid grid-cols-3 gap-1 h-16 mb-2">
                              <div className="bg-muted rounded" />
                              <div className="bg-muted rounded col-span-2" />
                            </div>
                            <p className="text-sm">Two Column</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      AI Resume Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Optimization Suggestions</h4>
                      {aiSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-muted rounded-lg"
                        >
                          <AlertCircle
                            className={`h-5 w-5 mt-0.5 ${
                              suggestion.impact === "High"
                                ? "text-red-500"
                                : suggestion.impact === "Medium"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge
                                variant={
                                  suggestion.impact === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {suggestion.impact} Impact
                              </Badge>
                              <span className="text-sm font-medium capitalize">
                                {suggestion.section}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {suggestion.suggestion}
                            </p>
                          </div>
                          <Button size="sm">Apply</Button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">AI Tools</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex-col">
                          <Wand2 className="h-6 w-6 mb-2" />
                          <span>Improve Writing</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Star className="h-6 w-6 mb-2" />
                          <span>Keyword Optimizer</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <CheckCircle className="h-6 w-6 mb-2" />
                          <span>ATS Scanner</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <FileText className="h-6 w-6 mb-2" />
                          <span>Content Suggestions</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[8.5/11] bg-white border rounded-lg p-4 text-xs text-black overflow-hidden">
                  {/* Resume Preview */}
                  <div className="space-y-2">
                    <div className="text-center">
                      <h1 className="text-lg font-bold">
                        {resumeData.personalInfo.fullName || "Your Name"}
                      </h1>
                      <p className="text-xs text-gray-600">
                        {resumeData.personalInfo.email} |{" "}
                        {resumeData.personalInfo.phone}
                      </p>
                      <p className="text-xs text-gray-600">
                        {resumeData.personalInfo.location}
                      </p>
                    </div>

                    {resumeData.summary && (
                      <div className="border-t pt-2">
                        <h2 className="font-semibold text-sm">SUMMARY</h2>
                        <p className="text-xs mt-1 leading-tight">
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {resumeData.experience.length > 0 && (
                      <div className="border-t pt-2">
                        <h2 className="font-semibold text-sm">EXPERIENCE</h2>
                        {resumeData.experience.map((exp, index) => (
                          <div key={index} className="mt-1">
                            <div className="flex justify-between">
                              <span className="font-medium text-xs">
                                {exp.position}
                              </span>
                              <span className="text-xs text-gray-600">
                                {exp.startDate} -{" "}
                                {exp.current ? "Present" : exp.endDate}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              {exp.company}
                            </p>
                            {exp.description && (
                              <p className="text-xs mt-1 leading-tight">
                                {exp.description.substring(0, 100)}...
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>ATS Score</span>
                    <Badge className="bg-green-100 text-green-800">89%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Readability</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      Excellent
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Keywords</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      12 matched
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  Briefcase,
  Globe,
  FileText,
  Brain,
  MessageCircle,
  Shield,
  Moon,
  Sun,
  User,
  Search,
  Upload,
  CheckCircle,
  Target,
  Clock,
  Bell,
  Star,
  BarChart3,
  Users,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Filter,
  Bookmark,
  TrendingUp,
  Award,
  BookOpen,
  Settings,
} from "lucide-react";

const JobTrackrLanding = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [firstName, setFirstName] = useState("");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setFirstName(res.data.firstName);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });

    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
      withCredentials: true,
    });
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
    } 
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", mass: 0.2 }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              JobTrackr
            </span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <Home className="inline h-4 w-4 mr-1" />
              Home
            </motion.button>
            <a href="/explore-jobs">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("jobs")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <Globe className="inline h-4 w-4 mr-1" />
              Internships
            </motion.button>
            </a>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/resume-builder")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <FileText className="inline h-4 w-4 mr-1" />
              Resume Builder
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/skill-matcher")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <Brain className="inline h-4 w-4 mr-1" />
              Skill Matcher
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/interview-chat")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Interview Experiences
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/application-tracker")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <Shield className="inline h-4 w-4 mr-1" />
              Track Apps
            </motion.button>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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

            {!isLoggedIn ? (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="gradient-primary"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="h-9 w-20">
                    <User className="h-4 w-4" />
                    {firstName}
                  </Button>

                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="gradient-primary"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Sign Out
                  </Button>
                </motion.div>
              </motion.div>

            )}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden py-20 lg:py-32">
        <motion.div
          className="absolute inset-0 gradient-secondary opacity-5"
          style={{ y }}
        />

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y:
                  (typeof window !== "undefined" ? window.innerHeight : 800) +
                  100,
              }}
              animate={{
                y: -100,
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative">
          <motion.div
            className="mx-auto max-w-4xl text-center mb-12"
            style={{ opacity }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                The Smartest Way to
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              One-click applications, skill-based job matching, and complete
              tracking—all in one place.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="gradient-primary text-lg px-8"
                  onClick={() => navigate("/explore-jobs")}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Jobs
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => navigate("/create-profile")}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Create Your Profile
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {["Google", "Microsoft", "Amazon", "Meta"].map(
                (company, index) => (
                  <motion.div
                    key={company}
                    className="glass-card rounded-lg p-4 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <span className="text-sm font-medium">{company}</span>
                  </motion.div>
                ),
              )}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                We auto-fetch your GitHub/Leetcode stats for better matching.
              </p>
              <div className="flex justify-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    Login with GitHub
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm">
                    Login with Google
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and land your dream job faster
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                icon: User,
                title: "Create Profile",
                desc: "Set up your professional profile",
              },
              {
                icon: FileText,
                title: "Upload Resume",
                desc: "Add your resume or build one",
              },
              {
                icon: Github,
                title: "Connect Accounts",
                desc: "Link GitHub, Leetcode, etc.",
              },
              {
                icon: Target,
                title: "Get Matched",
                desc: "Apply to matched jobs with one click",
              },
              {
                icon: BarChart3,
                title: "Track Progress",
                desc: "Monitor all responses in dashboard",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to supercharge your job search
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Verified Jobs",
                desc: "Hand-picked opportunities from trusted companies",
                color: "text-green-500",
              },
              {
                icon: Globe,
                title: "Scraped Jobs",
                desc: "Thousands of jobs from across the web with smart filters",
                color: "text-blue-500",
              },
              {
                icon: FileText,
                title: "Resume Auto-Injection",
                desc: "Automatically fill applications with your details",
                color: "text-purple-500",
              },
              {
                icon: Brain,
                title: "AI Skill Matching",
                desc: "Get matched based on your skills and experience",
                color: "text-orange-500",
              },
              {
                icon: Clock,
                title: "Application Tracker",
                desc: "Never lose track of your job applications",
                color: "text-red-500",
              },
              {
                icon: Bell,
                title: "Deadline Alerts",
                desc: "Get notified before application deadlines",
                color: "text-yellow-500",
              },
              {
                icon: Bookmark,
                title: "Save for Later",
                desc: "Bookmark interesting jobs to apply later",
                color: "text-indigo-500",
              },
              {
                icon: MessageCircle,
                title: "Interview Sharing",
                desc: "Learn from others' interview experiences",
                color: "text-pink-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <feature.icon
                        className={`h-8 w-8 ${feature.color} mb-2`}
                      />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Portals Preview */}
      <section id="jobs" className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Job Portals Preview</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore thousands of opportunities with advanced filtering
            </p>
          </motion.div>

          <Tabs defaultValue="verified" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="verified">Verified Jobs</TabsTrigger>
              <TabsTrigger value="scraped">Scraped Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="verified" className="space-y-6">
              <motion.div
                className="flex flex-wrap gap-2 justify-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {["SDE", "Web Dev", "Android", "HR", "Data Science"].map(
                  (category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {category}
                      </Badge>
                    </motion.div>
                  ),
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((job, index) => (
                  <motion.div
                    key={job}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            Senior Frontend Developer
                          </CardTitle>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                        <CardDescription>
                          TechCorp • Remote • $120k-$150k
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <Badge className="bg-green-100 text-green-800">
                            95% Match
                          </Badge>
                          <Badge variant="outline">Not Applied</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {["React", "TypeScript", "Node.js"].map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button className="w-full">Apply Now</Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scraped" className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Over 10,000+ jobs scraped daily from top job boards
                </p>
                <div className="flex justify-center space-x-4">
                  <Badge variant="outline">LinkedIn</Badge>
                  <Badge variant="outline">Indeed</Badge>
                  <Badge variant="outline">AngelList</Badge>
                  <Badge variant="outline">Glassdoor</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Continue with remaining sections... */}
      {/* For brevity, I'll include the footer here */}

      {/* Footer */}
      <footer className="border-t bg-background py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">JobTrackr</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The smartest way to find and track your dream job applications.
              </p>
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="ghost" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/explore-jobs")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Explore Jobs
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/resume-builder")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Resume Builder
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/skill-matcher")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Skill Matcher
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/application-tracker")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  App Tracker
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/saved-jobs")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Jobs
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/deadline-alerts")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Deadline Alerts
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/connect-accounts")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Connect Accounts
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/interview-chat")}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Interview Chat
                </motion.button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </motion.button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get job alerts & interview tips weekly!
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 JobTrackr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>


      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center space-y-4"
            >
              <h2 className="text-lg font-semibold">Are you sure you want to logout?</h2>
              <div className="flex justify-center gap-4 mt-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  className="gradient-primary"
                  onClick={() => {
                    setShowLogoutModal(false);
                    handleLogout();
                  }}
                >
                  Confirm Logout
                </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default JobTrackrLanding;

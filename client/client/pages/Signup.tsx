import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Eye,
  EyeOff,
  Github,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Zap,
  Target,
} from "lucide-react";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    experience: "",
    skills: [] as string[],
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const skillOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "MongoDB",
    "PostgreSQL",
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
    .then((res) => {
      if(res.data.isLoggedIn) {
        setIsLoggedIn(true);
        navigate("/");
      }
    })
    .catch(() => {
      setIsLoggedIn(false);
    });
  }, []);


  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }, );
    await axios.post("http://localhost:5000/api/auth/send-otp", {
      email: formData.email,
    });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/verify-email",{
        state: {
          email: formData.email,
        },
      });
    }, 2000);

    } catch (error) {
    console.error("Signup failed:", error);
    setIsLoading(false);
  }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password
        );
      case 2:
        return formData.role && formData.experience;
      case 3:
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 gradient-secondary rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-10"
      >
        <Button variant="ghost" onClick={() => navigate("/")} className="group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>
      </motion.div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Logo */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center space-x-2 mb-6"
            >
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                JobTrackr
              </span>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Signup Card */}
          <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold">
                {step === 1 && "Create your account"}
                {step === 2 && "Tell us about yourself"}
                {step === 3 && "Almost there!"}
              </CardTitle>
              <CardDescription>
                {step === 1 &&
                  "Join thousands of job seekers finding their dream jobs"}
                {step === 2 &&
                  "Help us personalize your job matching experience"}
                {step === 3 && "Choose your skills and confirm your account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* OAuth Buttons */}
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" className="w-full h-11 group">
                          <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          Continue with Google
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" className="w-full h-11 group">
                          <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          Continue with GitHub
                        </Button>
                      </motion.div>
                    </div>

                    <div className="relative">
                      <Separator />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-card px-2 text-sm text-muted-foreground">
                          or create with email
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            placeholder="John"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            placeholder="Doe"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="john@example.com"
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            placeholder="Create a strong password"
                            className="h-11 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>What's your role?</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">
                              Frontend Developer
                            </SelectItem>
                            <SelectItem value="backend">
                              Backend Developer
                            </SelectItem>
                            <SelectItem value="fullstack">
                              Full Stack Developer
                            </SelectItem>
                            <SelectItem value="mobile">
                              Mobile Developer
                            </SelectItem>
                            <SelectItem value="data">Data Scientist</SelectItem>
                            <SelectItem value="design">
                              UI/UX Designer
                            </SelectItem>
                            <SelectItem value="product">
                              Product Manager
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Experience Level</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              experience: value,
                            }))
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">
                              Entry Level (0-2 years)
                            </SelectItem>
                            <SelectItem value="mid">
                              Mid Level (2-5 years)
                            </SelectItem>
                            <SelectItem value="senior">
                              Senior Level (5-8 years)
                            </SelectItem>
                            <SelectItem value="lead">
                              Lead/Principal (8+ years)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <motion.div
                        className="p-4 border rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Profile Match</p>
                        <p className="text-xs text-muted-foreground">
                          AI-powered job matching
                        </p>
                      </motion.div>
                      <motion.div
                        className="p-4 border rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Quick Apply</p>
                        <p className="text-xs text-muted-foreground">
                          One-click applications
                        </p>
                      </motion.div>
                      <motion.div
                        className="p-4 border rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Track Progress</p>
                        <p className="text-xs text-muted-foreground">
                          Application tracking
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select your skills (optional)</Label>
                        <div className="flex flex-wrap gap-2">
                          {skillOptions.map((skill) => (
                            <motion.div key={skill} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={
                                  formData.skills.includes(skill)
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleSkillToggle(skill)}
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              agreeToTerms: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-primary/10 border border-primary/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium">You're all set!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your profile will be automatically matched with relevant
                        job opportunities.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="min-w-20"
                >
                  Previous
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="min-w-20 gradient-primary"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isLoading}
                    className="min-w-20 gradient-primary"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center text-sm pt-4">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

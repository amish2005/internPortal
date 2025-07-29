import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Upload,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  X,
  CheckCircle,
  Save,
  AlertCircle,
} from "lucide-react";

const CreateProfile = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [profileData, setProfileData] = useState({
    avatar: "",
    name: "",
    title: "",
    location: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    skills: [] as string[],
    experience: [] as any[],
    education: [] as any[],
  });



  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setProfileData((prev) => ({
            ...prev, name: `${res.data.firstName} ${res.data.lastName}`,
          }));
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
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile/get-profile", {
        withCredentials: true,
      });
      const data = res.data.profile;

      setProfileData({
        avatar: data.avatar || "",
        name: data.name || "",
        title: data.title || "",
        location: data.location || "",
        bio: data.bio || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        website: data.website || "",
        skills: data.skills || [],
        experience: data.experience || [],
        education: data.education || [],
      });

      if (data.avatar) {
        setProfileData((prev) => ({
          ...prev,
          avatar: `http://localhost:5000${data.avatar}`,
        }));
      }

    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  fetchProfile();
}, []);


  const [completionPercentage, setCompletionPercentage] = useState(15);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const skillSuggestions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Jest",
    "Webpack",
    "Next.js",
    "Vue.js",
    "Angular",
  ];

  const addSkill = (skill: string) => {
    if (!profileData.skills.includes(skill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      updateCompletionPercentage();
    }
  };

  const updateCompletionPercentage = () => {
    let completed = 0;
    const totalFields = 9; // Total number of profile sections

    // Basic info completion (4 fields)
    if (profileData.name) completed += 1;
    if (profileData.title) completed += 1;
    if (profileData.location) completed += 1;
    if (profileData.bio) completed += 1;

    // Social links completion (3 fields - optional but adds value)
    if (profileData.github || profileData.linkedin || profileData.website)
      completed += 1;

    // Skills completion
    if (profileData.skills.length > 0) completed += 1;

    // Experience completion
    if (profileData.experience.length > 0) completed += 1;

    // Education completion
    if (profileData.education.length > 0) completed += 1;

    // Avatar completion
    if (profileData.avatar) completed += 1;

    const percentage = Math.round((completed / totalFields) * 100);
    setCompletionPercentage(percentage);
  };

  const validateProfile = () => {
    const errors = [];

    if (!profileData.name.trim()) {
      errors.push("Name is required");
    }

    if (!profileData.title.trim()) {
      errors.push("Professional title is required");
    }

    if (!profileData.location.trim()) {
      errors.push("Location is required");
    }

    if (profileData.skills.length === 0) {
      errors.push("At least one skill is required");
    }

    return errors;
  };

  const saveProfile = async () => {
    setSaveError("");
    setSaveSuccess(false);

    // Validate profile
    const validationErrors = validateProfile();
    if (validationErrors.length > 0) {
      setSaveError(validationErrors.join(", "));
      return;
    }

    setIsSaving(true);


    try {
    let uploadedImagePath = profileData.avatar;

    // 🟡 Upload avatar file first if selected
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const uploadRes = await axios.post(
        "http://localhost:5000/profile/upload-avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      uploadedImagePath = uploadRes.data.filePath; // backend should return image path
    }

      const cleanedExperience = profileData.experience.map(({ id, ...rest }) => rest);
      const cleanedEducation = profileData.education.map(({id, ...rest}) => rest);
      const payload = {
        ...profileData,
        experience: cleanedExperience,
        education: cleanedEducation,
        avatar: uploadedImagePath,
      };
      await axios.post("http://localhost:5000/profile/save-profile", {
        profileData: payload,
      }, {
        withCredentials: true,
      });

      setSaveSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
    updateCompletionPercentage();
  };

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id: number, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const removeExperience = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setSaveError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setSaveError("Image size must be less than 5MB");
      return;
    }

    setIsUploadingAvatar(true);
    setSaveError("");

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;

      setProfileData((prev) => ({
        ...prev,
        avatar: result,
      }));
    };
    reader.readAsDataURL(file);
    setIsUploadingAvatar(false);
  };

  const triggerAvatarUpload = () => {
    const fileInput = document.getElementById(
      "avatar-upload",
    ) as HTMLInputElement;
    fileInput?.click();
  };


  const addEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (id: number, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const removeEducation = (id: number) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleExperienceEndDateChange = (id: number, value: string) => {
    const today = getTodayDate();
    const isCurrent = value === today;

    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, endDate: value, current: isCurrent } : exp,
      ),
    }));
  };


  useEffect(() => {
    updateCompletionPercentage();
  }, [profileData]);

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
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <Button variant="ghost" onClick={() => navigate("/")}>
                ← Back to Home
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  Create Your Profile
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Complete your profile to get better job matches
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
            >
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium">
                  {completionPercentage}% Complete
                </p>
                <Progress
                  value={completionPercentage}
                  className="w-full sm:w-32 h-2"
                />
              </div>
              <Button
                className="gradient-primary w-full sm:w-auto"
                onClick={saveProfile}
                disabled={isSaving}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-4 md:py-8">
        {/* Success/Error Messages */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Profile saved successfully! Your information has been updated.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{saveError}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-4 gap-4 md:gap-8">
          {/* Profile Preview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <Card className="lg:sticky lg:top-24">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mx-auto"
                  >
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="text-2xl gradient-primary text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={triggerAvatarUpload}
                      disabled={isUploadingAvatar}
                      className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full text-white disabled:opacity-50"
                      title="Upload profile picture"
                    >
                      {isUploadingAvatar ? (
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
                        <Upload className="h-4 w-4" />
                      )}
                    </motion.button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </motion.div>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      {profileData.name || "Your Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {profileData.title || "Your Title"}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {profileData.location || "Your Location"}
                    </p>
                  </div>

                  {profileData.skills.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {profileData.skills.slice(0, 6).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {profileData.skills.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{profileData.skills.length - 6}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center space-x-3">
                    {profileData.github && (
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </motion.button>
                    )}
                    {profileData.linkedin && (
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </motion.button>
                    )}
                    {profileData.website && (
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <Globe className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                      </motion.button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger
                  value="basic"
                  className="flex items-center text-xs sm:text-sm"
                >
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Basic Info</span>
                  <span className="sm:hidden">Basic</span>
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="flex items-center text-xs sm:text-sm"
                >
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Experience</span>
                  <span className="sm:hidden">Exp</span>
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex items-center text-xs sm:text-sm"
                >
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Skills</span>
                  <span className="sm:hidden">Skills</span>
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex items-center text-xs sm:text-sm"
                >
                  <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Education</span>
                  <span className="sm:hidden">Edu</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => {
                              setProfileData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }));
                              setSaveError(""); // Clear any previous errors
                            }}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            value={profileData.title}
                            onChange={(e) => {
                              setProfileData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }));
                              setSaveError(""); // Clear any previous errors
                            }}
                            placeholder="Senior Frontend Developer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => {
                            setProfileData((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }));
                            setSaveError(""); // Clear any previous errors
                          }}
                          placeholder="San Francisco, CA"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          placeholder="Tell us about yourself, your experience, and what you're looking for..."
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            value={profileData.github}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                github: e.target.value,
                              }))
                            }
                            placeholder="github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={profileData.linkedin}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                linkedin: e.target.value,
                              }))
                            }
                            placeholder="linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Portfolio</Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                            placeholder="yourwebsite.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Work Experience</CardTitle>
                      <Button
                        onClick={addExperience}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <AnimatePresence>
                        {profileData.experience.map((exp, index) => (
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
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
                              <div className="space-y-2">
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={exp.startDate}
                                  max={getTodayDate()}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "startDate",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={exp.endDate}
                                  max={getTodayDate()}
                                  onChange={(e) =>
                                    handleExperienceEndDateChange(
                                      exp.id,
                                      e.target.value,
                                    )
                                  }
                                  disabled={exp.current}
                                />
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-experience-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "current",
                                    e.target.checked,
                                  )
                                }
                                className="rounded"
                              />
                              <Label htmlFor={`current-experience-${exp.id}`}>
                                I currently work here
                              </Label>
                            </div>

                            <div className="space-y-2">
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
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {profileData.experience.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No experience added yet</p>
                          <p className="text-sm">
                            Add your work experience to improve your profile
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Suggested Skills
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {skillSuggestions.map((skill) => (
                            <motion.div key={skill} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={
                                  profileData.skills.includes(skill)
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer hover:scale-105 transition-transform"
                                onClick={() =>
                                  profileData.skills.includes(skill)
                                    ? removeSkill(skill)
                                    : addSkill(skill)
                                }
                              >
                                {profileData.skills.includes(skill) && (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                )}
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {profileData.skills.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Your Skills
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {profileData.skills.map((skill) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                              >
                                <Badge className="group">
                                  {skill}
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => removeSkill(skill)}
                                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </motion.button>
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Education</CardTitle>
                      <Button
                        onClick={addEducation}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <AnimatePresence>
                        {profileData.education.map((edu, index) => (
                          <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 border rounded-lg space-y-4"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">
                                Education #{index + 1}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "institution",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="University Name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "degree",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Bachelor's, Master's, etc."
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "field",
                                    e.target.value,
                                  )
                                }
                                placeholder="Computer Science, Engineering, etc."
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={edu.startDate}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "startDate",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={edu.endDate}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "endDate",
                                      e.target.value,
                                    )
                                  }
                                  disabled={edu.current}
                                />
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-education-${edu.id}`}
                                checked={edu.current}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "current",
                                    e.target.checked,
                                  )
                                }
                                className="rounded"
                              />
                              <Label htmlFor={`current-education-${edu.id}`}>
                                Currently studying here
                              </Label>
                            </div>

                            <div className="space-y-2">
                              <Label>Description (Optional)</Label>
                              <Textarea
                                value={edu.description}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                placeholder="Describe your studies, achievements, relevant coursework..."
                                rows={3}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {profileData.education.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No education added yet</p>
                          <p className="text-sm">
                            Add your educational background to improve your
                            profile
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default CreateProfile;
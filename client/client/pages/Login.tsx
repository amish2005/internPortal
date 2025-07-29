import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Briefcase, Eye, EyeOff, Github, Mail, ArrowLeft } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      }, {
        withCredentials: true, // 🔴 required for cookie to be accepted
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      if (err.response && err.response.status === 401) {
        setErrorMessage("Incorrect email or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
        setIsLoggedIn(false);

      });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-6"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="text-center">
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

          {/* Login Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Sign in to your JobTrackr account to continue your job search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 group"
                      onClick={() => console.log("Google OAuth")}
                    >
                      <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Continue with Google
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 group"
                      onClick={() => console.log("GitHub OAuth")}
                    >
                      <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Continue with GitHub
                    </Button>
                  </motion.div>
                </div>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-sm text-muted-foreground">
                      or continue with email
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage("");
                      }
                      }
                      placeholder="Enter your email"
                      required
                      className="h-11"
                    />
                  </motion.div>

                  <motion.div className="space-y-2" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErrorMessage("");
                        }}
                        placeholder="Enter your password"
                        required
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
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full h-11 gradient-primary"
                      disabled={isLoading}
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
                        "Sign In"
                      )}
                    </Button>
                  </motion.div>
                </form>

                <motion.div
                  variants={itemVariants}
                  className="text-center text-sm"
                >
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-xs text-muted-foreground"
          >
            By signing in, you agree to our{" "}
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

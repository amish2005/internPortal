import React, { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  ArrowLeft,
  Mail,
  Shield,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(true);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  // Mock database check - replace with actual API call
  const checkEmailExists = async (email: string) => {
    setIsLoading(true);
    try{
    const res = await axios.post("http://localhost:5000/api/auth/email", {email}, {
        withCredentials: true,
    });
    setIsLoading(false);

    await axios.post("http://localhost:5000/api/auth/send-otp", {
      email,
    },{
      withCredentials: true,
    });
    return true;
    
    } catch (err) {
        console.log(err);
    return !email;
    }
  };

  // Mock OTP verification - replace with actual API call
  const verifyOTP = async (otp: string) => {
    try {
        const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
            email: email,
            otp: otp,
        },{
      withCredentials: true,
    });
    // console.log(res);
    if(res.status == 200) return true;
    } catch (err) {
        console.log(err);
        return false;
    }

    
  };

  // Mock password reset - replace with actual API call
  const resetPassword = async (email: string, newPassword: string) => {
    // Simulate API call delay
    try {
        const res = await axios.post("http://localhost:5000/api/auth/resetpassword", {
            email, newPassword,
        }, {
            withCredentials: true,
        });

        if(res.status == 200) return true;
    } catch (err) {
        console.log(err);
        return false;
    }

  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const exists = await checkEmailExists(email);

      if (!exists) {
        setUserExists(false);
        setIsLoading(false);
        return;
      }

      setUserExists(true);
      setStep(2);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const isValid = await verifyOTP(otp);

      if (!isValid) {
        setError("Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      setStep(3);
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await resetPassword(email, newPassword);
      setStep(4); // Success step
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherEmail = () => {
    setEmail("");
    setError("");
    setUserExists(true);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
        await axios.post("http://localhost:5000/api/auth/send-otp", {
      email,
    },{
      withCredentials: true,
    });
    setIsLoading(false);
    } catch (err) {
        console.log(err);
        setIsLoading(false);
    }
    
    setError("");
    // You could show a success message here
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

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

      {/* Back to Login */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Button>
      </motion.div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm sm:max-w-md space-y-4 md:space-y-6"
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
              <span className="text-xl sm:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                JobTrackr
              </span>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          {step <= 3 && (
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Step {step} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </motion.div>
          )}

          {/* Main Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
              <CardHeader className="text-center space-y-1 p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {step === 1 && "Reset Your Password"}
                  {step === 2 && "Verify Your Email"}
                  {step === 3 && "Create New Password"}
                  {step === 4 && "Password Reset Successful"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {step === 1 &&
                    "Enter your email address and we'll send you a verification code"}
                  {step === 2 && `We've sent a verification code to ${email}`}
                  {step === 3 && "Enter your new password"}
                  {step === 4 && "Your password has been successfully reset"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Email Input */}
                  {step === 1 && !userExists && (
                    <motion.div
                      key="user-not-found"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <Alert className="border-red-200 bg-red-50 text-red-800">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No account found with the email address{" "}
                          <strong>{email}</strong>. Please check your email or
                          sign up for a new account.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <Button
                          onClick={handleTryAnotherEmail}
                          className="w-full"
                          variant="outline"
                        >
                          Try Another Email
                        </Button>

                        <Button
                          onClick={() => navigate("/signup")}
                          className="w-full gradient-primary"
                        >
                          Create New Account
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && userExists && (
                    <motion.div
                      key="email-step"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="h-10 sm:h-11 pl-10"
                              required
                            />
                          </div>
                        </div>

                        {error && (
                          <Alert className="border-red-200 bg-red-50 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-10 sm:h-11 gradient-primary"
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
                            <>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Verification Code
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 2: OTP Verification */}
                  {step === 2 && (
                    <motion.div
                      key="otp-step"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form onSubmit={handleOTPSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp" className="text-sm">
                            Verification Code
                          </Label>
                          <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="otp"
                              type="text"
                              value={otp}
                              onChange={(e) =>
                                setOtp(
                                  e.target.value.replace(/\D/g, "").slice(0, 6),
                                )
                              }
                              placeholder="Enter 6-digit code"
                              className="h-10 sm:h-11 pl-10 text-center text-lg tracking-widest"
                              maxLength={6}
                              required
                            />
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Hint: Use <strong>123456</strong> for demo
                          </p>
                        </div>

                        {error && (
                          <Alert className="border-red-200 bg-red-50 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-10 sm:h-11 gradient-primary"
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
                            <>
                              <Shield className="h-4 w-4 mr-2" />
                              Verify Code
                            </>
                          )}
                        </Button>

                        <div className="text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleResendOTP}
                            disabled={isLoading}
                            className="text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Resend Code
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 3: New Password */}
                  {step === 3 && (
                    <motion.div
                      key="password-step"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="new-password" className="text-sm">
                            New Password
                          </Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="new-password"
                              type={showPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                              className="h-10 sm:h-11 pl-10 pr-10"
                              required
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

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-sm">
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="Confirm new password"
                              className="h-10 sm:h-11 pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Password must:</p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Be at least 8 characters long</li>
                            <li>Match the confirmation password</li>
                          </ul>
                        </div>

                        {error && (
                          <Alert className="border-red-200 bg-red-50 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-10 sm:h-11 gradient-primary"
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
                            <>
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && (
                    <motion.div
                      key="success-step"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-center space-y-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </motion.div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          Password Reset Successfully!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your password has been updated. <br /> You are now logged in.
                        </p>
                      </div>

                      <Button
                        onClick={() => navigate("/")}
                        className="w-full gradient-primary"
                      >
                        Continue to Homepage!
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Additional Links */}
                {step <= 3 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center text-sm space-y-2"
                  >
                    <div>
                      <span className="text-muted-foreground">
                        Remember your password?{" "}
                      </span>
                      <Link
                        to="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Don't have an account?{" "}
                      </span>
                      <Link
                        to="/signup"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-xs text-muted-foreground"
          >
            By resetting your password, you agree to our{" "}
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

export default ForgotPassword;

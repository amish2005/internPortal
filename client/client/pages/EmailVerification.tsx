import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  Briefcase,
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get email from signup flow state or use placeholder
  const email = location.state?.email || "user@example.com";

  // Start countdown when component mounts
  useEffect(() => {
    setResendCountdown(60);
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus last filled input or next empty
        const lastIndex = Math.min(digits.length - 1, 5);
        inputRefs.current[lastIndex]?.focus();

        // Auto-submit if all filled
        if (digits.length === 6) {
          handleVerify(newOtp.join(""));
        }
      });
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join("");

    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: email,
        otp: code,
      },{
      withCredentials: true,
    });
      if(response.status === 200){
        setSuccess(true);
        setTimeout(() => {
          navigate("/create-profile", {
            state: {
              email,
              verified: true,
            },
          });
        }, 1500);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;

    setIsResending(true);
    setError("");

    try {
      // Simulate API call to resend OTP
      await axios.post("http://localhost:5000/api/auth/send-otp", {
      email: email,
    });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset countdown
      setResendCountdown(60);

      // Clear current OTP
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-green-600">
              Verified Successfully!
            </h2>
            <p className="text-muted-foreground">
              Your email has been verified. Redirecting to profile setup...
            </p>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 mx-auto border-2 border-primary border-t-transparent rounded-full"
          />
        </motion.div>
      </div>
    );
  }

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

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/signup")}
          className="group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Signup
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

          {/* Verification Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
              <CardHeader className="text-center space-y-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Mail className="h-8 w-8 text-primary" />
                </motion.div>

                <CardTitle className="text-2xl font-bold">
                  Verify Your Email
                </CardTitle>
                <CardDescription className="text-center">
                  We've sent a 6-digit verification code to
                  <br />
                  <span className="font-medium text-foreground">{email}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* OTP Input */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <Label className="text-center block">
                    Enter verification code
                  </Label>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Input
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-12 h-14 text-center text-lg font-bold border-2 focus:border-primary"
                          disabled={isLoading}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Error Alert */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={() => handleVerify()}
                    disabled={isLoading || otp.some((digit) => !digit)}
                    className="w-full h-12 gradient-primary"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                </motion.div>

                {/* Resend Section */}
                <motion.div
                  variants={itemVariants}
                  className="text-center space-y-3"
                >
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?
                  </p>

                  <div className="flex items-center justify-center space-x-2">
                    {resendCountdown > 0 ? (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Resend in {formatTime(resendCountdown)}</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleResend}
                        disabled={isResending}
                        className="group"
                      >
                        {isResending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                        )}
                        Resend Code
                      </Button>
                    )}
                  </div>
                </motion.div>

                {/* Help Text */}
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Check your spam folder if you don't see the email.
                    <br />
                    For demo purposes, use code:{" "}
                    <span className="font-mono font-bold">123456</span>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;

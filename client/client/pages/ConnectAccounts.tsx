import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Star,
  GitBranch,
  Code,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Link as LinkIcon,
  Unlink,
  Settings,
  Shield,
  Zap,
  Moon,
  Sun,
} from "lucide-react";

const ConnectAccounts = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [connections, setConnections] = useState({
    github: {
      connected: true,
      username: "johndoe",
      lastSync: "2 hours ago",
      stats: {
        repositories: 45,
        followers: 234,
        following: 156,
        contributions: 1247,
      },
    },
    linkedin: {
      connected: false,
      username: "",
      lastSync: null,
      stats: null,
    },
    leetcode: {
      connected: true,
      username: "johndoe_codes",
      lastSync: "1 day ago",
      stats: {
        solved: 324,
        easy: 98,
        medium: 156,
        hard: 70,
        ranking: 12456,
      },
    },
    portfolio: {
      connected: true,
      url: "https://johndoe.dev",
      lastSync: "1 week ago",
      stats: null,
    },
  });

  const [syncingAccount, setSyncingAccount] = useState<string | null>(null);

  const accountProviders = [
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      color: "bg-gray-900",
      description:
        "Import your repositories, contributions, and coding activity",
      benefits: [
        "Showcase projects",
        "Coding activity",
        "Technical skills",
        "Open source contributions",
      ],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-600",
      description: "Import your professional network and experience",
      benefits: [
        "Professional network",
        "Work experience",
        "Endorsements",
        "Recommendations",
      ],
    },
    {
      id: "leetcode",
      name: "LeetCode",
      icon: Code,
      color: "bg-orange-500",
      description: "Show your coding problem-solving skills and rankings",
      benefits: [
        "Problem solving",
        "Algorithm skills",
        "Contest rankings",
        "Technical assessment",
      ],
    },
    {
      id: "portfolio",
      name: "Portfolio Website",
      icon: Globe,
      color: "bg-purple-600",
      description: "Link your personal website or portfolio",
      benefits: [
        "Personal branding",
        "Project showcase",
        "Contact information",
        "Professional presence",
      ],
    },
  ];

  const handleConnect = async (providerId: string) => {
    setSyncingAccount(providerId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setConnections((prev) => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        connected: true,
        lastSync: "Just now",
      },
    }));
    setSyncingAccount(null);
  };

  const handleDisconnect = (providerId: string) => {
    setConnections((prev) => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        connected: false,
        username: "",
        lastSync: null,
        stats: null,
      },
    }));
  };

  const handleSync = async (providerId: string) => {
    setSyncingAccount(providerId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setConnections((prev) => ({
      ...prev,
      [providerId]: {
        ...prev[providerId],
        lastSync: "Just now",
      },
    }));
    setSyncingAccount(null);
  };

  const connectedCount = Object.values(connections).filter(
    (conn) => conn.connected,
  ).length;
  const completionPercentage = (connectedCount / accountProviders.length) * 100;

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
              <h1 className="text-2xl font-bold">Connect Accounts</h1>
              <p className="text-sm text-muted-foreground">
                Link your professional accounts to enhance your profile
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
                {connectedCount}/{accountProviders.length} accounts connected
              </p>
              <Progress
                value={completionPercentage}
                className="w-32 h-2 mt-1"
              />
            </div>
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
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Connected</h3>
                </div>
                <p className="text-3xl font-bold mt-2">{connectedCount}</p>
                <p className="text-sm text-muted-foreground">
                  Active connections
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Profile Boost</h3>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {Math.round(completionPercentage)}%
                </p>
                <p className="text-sm text-muted-foreground">Completion rate</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Match Score</h3>
                </div>
                <p className="text-3xl font-bold mt-2">92%</p>
                <p className="text-sm text-muted-foreground">
                  Job matching accuracy
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Data Security</h3>
                </div>
                <p className="text-3xl font-bold mt-2">100%</p>
                <p className="text-sm text-muted-foreground">
                  Secure connections
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="connect" className="space-y-6">
          <TabsList>
            <TabsTrigger value="connect">Connect Accounts</TabsTrigger>
            <TabsTrigger value="manage">Manage Connections</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="space-y-6">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {accountProviders.map((provider, index) => {
                const connection = connections[provider.id];
                const isConnected = connection?.connected;
                const isLoading = syncingAccount === provider.id;

                return (
                  <motion.div key={provider.id} variants={itemVariants}>
                    <Card
                      className={`transition-all duration-300 ${
                        isConnected
                          ? "border-green-200 bg-green-50/50 dark:bg-green-950/20"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className={`w-12 h-12 rounded-lg ${provider.color} flex items-center justify-center`}
                              whileHover={{ scale: 1.05, rotate: 5 }}
                            >
                              <provider.icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <div>
                              <CardTitle className="flex items-center space-x-2">
                                {provider.name}
                                {isConnected && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {provider.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isConnected ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">
                                  @{connection.username || connection.url}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Last synced: {connection.lastSync}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSync(provider.id)}
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
                                      >
                                        <RefreshCw className="h-4 w-4" />
                                      </motion.div>
                                    ) : (
                                      <RefreshCw className="h-4 w-4" />
                                    )}
                                  </Button>
                                </motion.div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDisconnect(provider.id)}
                                >
                                  <Unlink className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Stats Display */}
                            {connection.stats && (
                              <div className="grid grid-cols-2 gap-3">
                                {provider.id === "github" && (
                                  <>
                                    <div className="text-center p-2 bg-muted rounded">
                                      <p className="text-2xl font-bold">
                                        {connection.stats.repositories}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Repositories
                                      </p>
                                    </div>
                                    <div className="text-center p-2 bg-muted rounded">
                                      <p className="text-2xl font-bold">
                                        {connection.stats.contributions}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Contributions
                                      </p>
                                    </div>
                                  </>
                                )}
                                {provider.id === "leetcode" && (
                                  <>
                                    <div className="text-center p-2 bg-muted rounded">
                                      <p className="text-2xl font-bold">
                                        {connection.stats.solved}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Problems Solved
                                      </p>
                                    </div>
                                    <div className="text-center p-2 bg-muted rounded">
                                      <p className="text-2xl font-bold">
                                        #{connection.stats.ranking}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Global Ranking
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Benefits:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {provider.benefits.map((benefit, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center space-x-2"
                                  >
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                className="w-full"
                                onClick={() => handleConnect(provider.id)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                      className="mr-2"
                                    >
                                      <RefreshCw className="h-4 w-4" />
                                    </motion.div>
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <provider.icon className="h-4 w-4 mr-2" />
                                    Connect {provider.name}
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connection Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(connections)
                    .filter(([_, conn]) => conn.connected)
                    .map(([id, connection]) => {
                      const provider = accountProviders.find(
                        (p) => p.id === id,
                      );
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <provider.icon className="h-5 w-5" />
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Last synced: {connection.lastSync}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSync(id)}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Sync Now
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>GitHub Activity</span>
                      <Badge className="bg-green-100 text-green-800">
                        Excellent
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Coding Skills</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Strong
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Professional Network</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Needs Work
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Connect LinkedIn</p>
                        <p className="text-xs text-muted-foreground">
                          Boost your professional presence
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          Strong GitHub presence
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Keep up the great work!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConnectAccounts;

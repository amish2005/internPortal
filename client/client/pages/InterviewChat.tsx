import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Search,
  Filter,
  Star,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Award,
  Building,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Plus,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
} from "lucide-react";
import { io } from "socket.io-client";

const InterviewChat = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [firstName, setFirstName] = useState("");

  const chatRooms = [
    {
      id: "general",
      name: "General Discussion",
      description: "Share general interview experiences and tips",
      members: 1247,
      messages: 3456,
      isActive: true,
    },
    {
      id: "faang",
      name: "FAANG Interviews",
      description:
        "Facebook, Apple, Amazon, Netflix, Google interview experiences",
      members: 892,
      messages: 2134,
      isActive: true,
    },
    {
      id: "startups",
      name: "Startup Interviews",
      description: "Early-stage company interview processes",
      members: 543,
      messages: 1267,
      isActive: true,
    },
    {
      id: "frontend",
      name: "Frontend Dev",
      description: "Frontend development interview discussions",
      members: 678,
      messages: 1543,
      isActive: true,
    },
    {
      id: "backend",
      name: "Backend Dev",
      description: "Backend engineering interview experiences",
      members: 534,
      messages: 987,
      isActive: true,
    },
    {
      id: "data-science",
      name: "Data Science",
      description: "ML/AI and data science interview prep",
      members: 423,
      messages: 756,
      isActive: true,
    },
  ];

  type Message = {
    id: number;
    user: { name: string; avatar?: string; verified?: boolean; role?: string };
    message: string;
    timestamp: string;
    likes: number;
    replies: number;
    isLiked: boolean;
    tags: string[];
    room: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const toggleLike = (id: number) => {
  setMessages((prev) =>
    prev.map((m) =>
      m.id === id ? { ...m, isLiked: !m.isLiked, likes: m.isLiked ? m.likes - 1 : m.likes + 1 } : m
    )
  );
};


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/${selectedRoom}`, {
        withCredentials: true,
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [selectedRoom]);
  // const messages = [
  //   {
  //     id: 1,
  //     user: {
  //       name: "Alex Chen",
  //       avatar: "AC",
  //       verified: true,
  //       role: "Senior Engineer @ Google",
  //     },
  //     message:
  //       "Just had my final round with Meta today! The system design round was intense but fair. They asked me to design a chat application with 100M+ users. Happy to share my approach if anyone's interested!",
  //     timestamp: "2 hours ago",
  //     likes: 23,
  //     replies: 5,
  //     isLiked: false,
  //     tags: ["Meta", "System Design", "Success"],
  //     room: "faang",
  //   },
  //   {
  //     id: 2,
  //     user: {
  //       name: "Sarah Kim",
  //       avatar: "SK",
  //       verified: false,
  //       role: "Full Stack Developer",
  //     },
  //     message:
  //       "Has anyone interviewed with Stripe recently? I have my technical round next week and would love to know what to expect. Particularly curious about their API design questions.",
  //     timestamp: "4 hours ago",
  //     likes: 12,
  //     replies: 8,
  //     isLiked: true,
  //     tags: ["Stripe", "Technical", "API Design"],
  //     room: "general",
  //   },
  //   {
  //     id: 3,
  //     user: {
  //       name: "Mike Johnson",
  //       avatar: "MJ",
  //       verified: true,
  //       role: "Data Scientist @ Netflix",
  //     },
  //     message:
  //       "Pro tip for ML interviews: Always ask about the business context first! Companies love when you think about the problem from a product perspective, not just the technical solution. This has helped me in every DS interview.",
  //     timestamp: "6 hours ago",
  //     likes: 45,
  //     replies: 12,
  //     isLiked: false,
  //     tags: ["Machine Learning", "Tips", "Business Context"],
  //     room: "data-science",
  //   },
  //   {
  //     id: 4,
  //     user: {
  //       name: "Jessica Wong",
  //       avatar: "JW",
  //       verified: false,
  //       role: "Frontend Developer",
  //     },
  //     message:
  //       "Failed my React interview at Airbnb today 😔 They asked me to build a complex component with custom hooks and I got stuck on the state management. Back to studying! Any good resources for advanced React patterns?",
  //     timestamp: "8 hours ago",
  //     likes: 8,
  //     replies: 15,
  //     isLiked: false,
  //     tags: ["React", "Airbnb", "Learning"],
  //     room: "frontend",
  //   },
  //   {
  //     id: 5,
  //     user: {
  //       name: "David Park",
  //       avatar: "DP",
  //       verified: true,
  //       role: "Engineering Manager @ Uber",
  //     },
  //     message:
  //       "For those interviewing for senior+ roles: Expect a lot of questions about technical leadership and mentoring. Practice explaining how you've handled technical debt, code reviews, and team conflicts. These soft skills matter just as much!",
  //     timestamp: "12 hours ago",
  //     likes: 67,
  //     replies: 23,
  //     isLiked: true,
  //     tags: ["Senior Roles", "Leadership", "Management"],
  //     room: "general",
  //   },
  // ];

  const filteredMessages = messages.filter(
    (msg) =>
      msg.room === selectedRoom &&
      (!searchQuery ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setFirstName(res.data.firstName);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
        setIsLoggedIn(false);

      });
  }, []);

  const sendMessage = async () => {
  if (!newMessage.trim()) return;

  const tempMessage: Message = {
    id: Date.now(),
    user: { name: firstName || "You", verified: false, role: "Member" },
    message: newMessage,
    timestamp: "Just now",
    likes: 0,
    replies: 0,
    isLiked: false,
    tags: [],
    room: selectedRoom,
  };

  // Send message in real-time
  socketRef.current.emit("new-message", tempMessage);

  setNewMessage("");

  // Save to database
  try {
    const res = await axios.post(
      "http://localhost:5000/api/chat",
      tempMessage,
      { withCredentials: true }
    );
    setMessages((prev) => [...prev, res.data]);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};


  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", { withCredentials: true });

    socketRef.current.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);




  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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
                <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                Interview Experiences
              </h1>
              <p className="text-sm text-muted-foreground">
                Connect with the community and share interview insights
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
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Rooms Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Discussion Rooms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chatRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRoom === room.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                        }`}
                      onClick={() => setSelectedRoom(room.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{room.name}</h4>
                        {room.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-xs opacity-75 mb-2">
                        {room.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs opacity-75">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {room.members}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {room.messages}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Members</span>
                  <Badge className="bg-green-100 text-green-800">2,847</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Discussions</span>
                  <Badge variant="outline">12,456</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Stories</span>
                  <Badge className="bg-blue-100 text-blue-800">1,234</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {chatRooms.find((r) => r.id === selectedRoom)?.name}
                      <Badge variant="outline" className="ml-2">
                        {filteredMessages.length} messages
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {
                        chatRooms.find((r) => r.id === selectedRoom)
                          ?.description
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {filteredMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                              {message.user?.name ? message.user.name[0].toUpperCase() : "U"}

                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">
                                {message.user.name}
                              </h4>
                              {message.user.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              )}
                              <Badge variant="outline" className="text-xs">
                                {message.user.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </span>
                            </div>

                            <p className="text-sm mb-3 leading-relaxed">
                              {message.message}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {message.tags?.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`flex items-center space-x-1 text-xs ${message.isLiked
                                  ? "text-red-500"
                                  : "text-muted-foreground hover:text-red-500"
                                  }`}
                              >
                                <Heart
                                  className={`h-4 w-4 ${message.isLiked ? "fill-current" : ""
                                    }`}
                                />
                                <span>{message.likes}</span>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary"
                              >
                                <Reply className="h-4 w-4" />
                                <span>{message.replies}</span>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-blue-500"
                              >
                                <Share className="h-4 w-4" />
                                <span>Share</span>
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-yellow-500"
                              >
                                <Bookmark className="h-4 w-4" />
                                <span>Save</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-4">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                      YU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder={`Share your experience in ${chatRooms.find((r) => r.id === selectedRoom)?.name}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Award className="h-4 w-4 mr-1" />
                          Add Tags
                        </Button>
                        <Button variant="outline" size="sm">
                          <Building className="h-4 w-4 mr-1" />
                          Mention Company
                        </Button>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="gradient-primary"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Trending Topics */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Topics This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Most Discussed Companies</h4>
                  <div className="space-y-1">
                    {["Google", "Meta", "Amazon", "Apple", "Microsoft"].map(
                      (company) => (
                        <div
                          key={company}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{company}</span>
                          <Badge variant="outline">
                            {Math.floor(Math.random() * 50) + 10}
                          </Badge>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Hot Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "System Design",
                      "LeetCode",
                      "Behavioral",
                      "Salary Negotiation",
                      "Remote Work",
                    ].map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Success Stories</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>🎉 "Just got an offer from Stripe!"</p>
                    <p>🚀 "Landed my dream job at SpaceX!"</p>
                    <p>💰 "Negotiated 40% salary increase!"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewChat;

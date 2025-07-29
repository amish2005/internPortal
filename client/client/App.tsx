import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import ExploreJobs from "./pages/ExploreJobs";
import ConnectAccounts from "./pages/ConnectAccounts";
import ApplicationTracker from "./pages/ApplicationTracker";
import ResumeBuilder from "./pages/ResumeBuilder";
import SkillMatcher from "./pages/SkillMatcher";
import DeadlineAlerts from "./pages/DeadlineAlerts";
import SavedJobs from "./pages/SavedJobs";
import InterviewChat from "./pages/InterviewChat";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/explore-jobs" element={<ExploreJobs />} />
          <Route path="/connect-accounts" element={<ConnectAccounts />} />
          <Route path="/application-tracker" element={<ApplicationTracker />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/skill-matcher" element={<SkillMatcher />} />
          <Route path="/deadline-alerts" element={<DeadlineAlerts />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/interview-chat" element={<InterviewChat />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

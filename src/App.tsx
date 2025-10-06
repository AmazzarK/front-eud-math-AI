import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HomePage from "./pages/HomeNew";
import Login from "./pages/Login";
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import ProfessorCourses from "./pages/professor/ProfessorCourses";
import ProfessorStudents from "./pages/professor/ProfessorStudents";
import ProfessorProfile from "./pages/professor/ProfessorProfile";
import ProfessorStatistics from "./pages/professor/ProfessorStatistics";
import ProfessorInterventions from "./pages/professor/ProfessorInterventions";
import StudentDashboard from "./pages/student/StudentDashboard";
import Chatbot from "./pages/student/Chatbot";
import Achievements from "./pages/student/Achievements";
import Exercises from "./pages/student/Exercises";
import Tests from "./pages/student/Tests";
import Profile from "./pages/student/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Professor Routes */}
            <Route
              path="/prof/dashboard"
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/prof/students" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prof/content" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prof/interventions" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorInterventions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prof/statistics" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorStatistics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prof/profile" 
              element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/exercises"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Exercises />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/tests"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Tests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/chatbot"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/achievements"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Achievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

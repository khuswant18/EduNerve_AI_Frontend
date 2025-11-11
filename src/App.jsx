import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LearnerProvider } from "./context/LearnerContext"
import PrivateRoute from "./components/PrivateRoute"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./pages/DashboardPage"
import LmsHubPage from "./pages/LmsHubPage"
import InterviewPage from "./pages/InterviewPage"
import ProjectsPage from "./pages/ProjectsPage" 
import NotFoundPage from "./pages/NotFoundPage"
import ContinueLearningPage from "./pages/ContinueLearningPage"

export default function App() {
  return (
    <LearnerProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning"
              element={
                <PrivateRoute>
                  <LmsHubPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning/continue"
              element={
                <PrivateRoute>
                  <ContinueLearningPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/lms"
              element={
                <PrivateRoute>
                  <LmsHubPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/interviews"
              element={
                <PrivateRoute>
                  <InterviewPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectsPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LearnerProvider>
  )
}
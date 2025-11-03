import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../lib/api"

const decodeGoogleCredential = (credential) => {
  try {
    const base64Url = credential.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Failed to decode Google credential", error)
    return null 
  }
} 

const LearnerContext = createContext(null)

export function LearnerProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [learnerProfile, setLearnerProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")
      const googleUser = localStorage.getItem("googleUser")
      
      console.log("🔐 Auth check on mount:", {
        hasToken: !!token,
        hasGoogleUser: !!googleUser
      })
      
      if (token) {
        try {
          const response = await authAPI.getProfile()
          const user = response.success ? response.user : response
          
          console.log("✅ Auth check successful:", {
            userId: user.id,
            email: user.email,
            hasGoogleUser: !!googleUser
          })
          
          if (googleUser) {
            const gUser = JSON.parse(googleUser)
            setAuthUser(gUser)
          } else {
            setAuthUser({
              provider: "credentials",
              email: user.email,
              name: user.name,
              picture: null,
            })
          }
          
          setIsAuthenticated(true)
          setLearnerProfile({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            experience: user.experience,
            skills: user.skills || [],
            quizAttempts: user.quizResults || [],
            interviewsPracticed: user.interviews || [],
          })
        } catch (error) {
          console.error("❌ Auth check failed:", error)
          console.error("Clearing authentication data")
          localStorage.removeItem("authToken")
          localStorage.removeItem("googleUser")
          setIsAuthenticated(false)
          setAuthUser(null)
          setLearnerProfile(null)
        }
      } else if (googleUser) {
        // If googleUser exists but no token, clear it and require re-login
        console.warn("⚠️ Google user found but no auth token - clearing session")
        localStorage.removeItem("googleUser")
        setIsAuthenticated(false)
        setAuthUser(null)
        setLearnerProfile(null)
      } else {
        console.log("ℹ️ No authentication found - user needs to log in")
      }
      setLoading(false)
      console.log("🏁 Auth check complete:", { isAuthenticated: !!token })
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      localStorage.setItem("authToken", response.token)
      
      setIsAuthenticated(true)
      setAuthUser({
        provider: "credentials",
        email: response.user.email,
        name: response.user.name,
        picture: null,
      })
      setLearnerProfile({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        experience: response.user.experience,
        skills: response.user.skills || [],
        quizAttempts: [],
        interviewsPracticed: [],
      })
      
      return { success: true }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, error: error.message }
    }
  }

  const signup = async (name, email, password, role, experience, skills) => {
    try {
      const response = await authAPI.register(name, email, password, role, experience, skills)
      console.log("Signup response:", response)
      console.log("Saving token:", response.token)
      localStorage.setItem("authToken", response.token)
      

      const savedToken = localStorage.getItem("authToken")
      console.log("Token saved successfully:", !!savedToken)
      
      setIsAuthenticated(true)
      setAuthUser({
        provider: "credentials",
        email: response.user.email,
        name: response.user.name,
        picture: null,
      })
      setLearnerProfile({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        experience: response.user.experience,
        skills: response.user.skills || [],
        quizAttempts: [],
        interviewsPracticed: [],
      })
      
      return { success: true }
    } catch (error) {
      console.error("Signup failed:", error)
      return { success: false, error: error.message }
    }
  }

  const loginWithGoogle = async (credential) => {
    const profile = credential ? decodeGoogleCredential(credential) : null

    if (!profile) {
      return { success: false, error: "Unable to verify your Google account. Please try again." }
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name || profile.given_name,
          googleId: profile.sub,
          picture: profile.picture
        })
      })

      const data = await response.json()

      if (!data.success) {
        return { success: false, error: data.error || "Google authentication failed" }
      }

      console.log("✅ Google login successful, saving token:", {
        hasToken: !!data.token,
        tokenPreview: data.token?.substring(0, 20) + "..."
      })

      // Save token from backend
      localStorage.setItem("authToken", data.token)

      const googleUser = {
        provider: "google",
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        picture: data.user.avatar,
      }


      localStorage.setItem("googleUser", JSON.stringify(googleUser))

      console.log("💾 Saved to localStorage:", {
        authToken: !!localStorage.getItem("authToken"),
        googleUser: !!localStorage.getItem("googleUser")
      })

      setIsAuthenticated(true)
      setAuthUser(googleUser)
      
      setLearnerProfile({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        role: data.user.role,
        experience: data.user.experience,
        skills: data.user.skills || [],
        quizAttempts: [],
        interviewsPracticed: [],
      })

      return { 
        success: true, 
        isGoogleAuth: true
      }
    } catch (error) {
      console.error("Google auth failed:", error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("googleUser")
    setIsAuthenticated(false)
    setAuthUser(null)
    setLearnerProfile(null)
  }

  const setProfile = (profileData) => {
    setLearnerProfile((prev) => {
      const updatedProfile = {
        ...prev,
        ...profileData,
        name: profileData?.name || prev?.name || authUser?.name || "",
        email: profileData?.email || prev?.email || authUser?.email || "",
        avatar: profileData?.avatar || prev?.avatar || authUser?.picture || null,
        role: profileData?.role || prev?.role || "",
        experience: profileData?.experience || prev?.experience || "",
        skills: profileData?.skills || prev?.skills || [],
      }

      if (authUser?.provider === "google") {
        const googleUser = JSON.parse(localStorage.getItem("googleUser") || "{}")
        localStorage.setItem("googleUser", JSON.stringify({
          ...googleUser,
          role: updatedProfile.role,
          experience: updatedProfile.experience,
          skills: updatedProfile.skills,
        }))
      }

      return updatedProfile
    })
  }

  const completeQuiz = async (quizData) => {
    const result = {
      category: quizData.topic,
      subtopics: quizData.subtopics || [],
      score: quizData.correctAnswers,
      total: quizData.totalQuestions,
      percentage: quizData.percentage,
      level: quizData.level
    }
    
    setLearnerProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        quizAttempts: [
          ...(prev.quizAttempts || []),
          {
            ...result,
            date: new Date().toISOString(),
          },
        ],
      }
    })
    
    return result
  }

  const saveInterviewResult = async (interviewData) => {
    setLearnerProfile((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        interviewsPracticed: [
          ...(prev.interviewsPracticed || []),
          {
            ...interviewData,
            date: new Date().toISOString(),
          },
        ],
      }
    })
  }

  const value = {
    isAuthenticated,
    authUser,
    learnerProfile,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    setProfile,
    completeQuiz,
    saveInterviewResult,
  }

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>
}

export function useLearner() {
  const context = useContext(LearnerContext)
  if (!context) {
    throw new Error("useLearner must be used within LearnerProvider")
  }
  return context
}

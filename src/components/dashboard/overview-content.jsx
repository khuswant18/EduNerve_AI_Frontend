import { useEffect, useState } from "react"
import { useLearner } from "../../context/LearnerContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Button from "../common/Button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Award, BookOpen, MessageSquare } from "lucide-react"

export function OverviewContent() {
  const { learnerProfile } = useLearner()
  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
  })
  const [expandedFeedback, setExpandedFeedback] = useState({})

  const toggleFeedback = (interviewId) => {
    setExpandedFeedback(prev => ({
      ...prev,
      [interviewId]: !prev[interviewId]
    }))
  }

  useEffect(() => {
    if (learnerProfile) {
      const interviews = learnerProfile.interviewsPracticed || []
      
      const totalInterviews = interviews.length
      const completedInterviews = interviews.filter(i => i.status === "completed").length

      setStats({
        totalInterviews,
        completedInterviews,
      })
    }
  }, [learnerProfile])

  // Prepare skills chart data
  const skillsChartData = (learnerProfile?.skills || [])
    .slice(0, 5)
    .map((skill) => ({
      skill,
      progress: 75,
    }))

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {learnerProfile?.name || "Learner"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {learnerProfile?.role || "Complete your profile to get started"}
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{learnerProfile?.skills?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Technical skills tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Success</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalInterviews > 0 ? `${Math.round((stats.completedInterviews / stats.totalInterviews) * 100)}%` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalInterviews > 0 ? "Completion rate" : "Start practicing interviews"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Tracked</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {learnerProfile?.skills?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {learnerProfile?.experience || "Set your experience level"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Sessions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalInterviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-accent font-medium">{stats.completedInterviews}</span> completed
            </p>
          </CardContent>
        </Card>
      </div>


      {(learnerProfile?.skills?.length || 0) > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">

          {(learnerProfile?.skills?.length || 0) > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Tech Stack</CardTitle>
                <CardDescription>Skills you're tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillsChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" domain={[0, 100]} className="text-xs" />
                    <YAxis dataKey="skill" type="category" width={100} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}


      {stats.completedInterviews > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Interview Feedback</CardTitle>
            <CardDescription>Summary of your latest interview sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(learnerProfile?.interviewsPracticed || [])
                .filter((interview) => interview.status === "completed")
                .slice(0, 5)
                .map((interview, index) => (
                  <div
                    key={interview.id || index}
                    className="flex flex-col gap-2 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">
                          {interview.role} - {interview.interviewType}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(interview.startedAt || interview.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {interview.overallScore && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {interview.overallScore}%
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {interview.feedback ? (
                        <>
                          <p className={`text-sm text-muted-foreground ${expandedFeedback[interview.id] ? '' : 'line-clamp-2'}`}>
                            {interview.feedback}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeedback(interview.id)}
                            className="text-xs cursor-pointer"
                          >
                            {expandedFeedback[interview.id] ? 'Show Less' : 'Show Full Feedback'}
                          </Button>
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground italic">
                          No feedback available for this interview
                        </div>
                      )}
                    </div>
                    {interview.strengths && interview.strengths.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {interview.strengths.slice(0, 3).map((strength, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-green-500/10 px-2 py-0.5 text-xs text-green-700 dark:text-green-400"
                          >
                            {strength}
                          </span>
                        ))} 
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}


      {stats.totalInterviews === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to start your learning journey?
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Practice an interview to get personalized feedback and track your progress.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

import { useMemo } from "react"
import { useLearner } from "@/context/LearnerContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Clock, CheckCircle2, TrendingUp, Award } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export function FeedbackContent() {
  const { learnerProfile } = useLearner()

  const stats = useMemo(() => {
    const interviews = learnerProfile?.interviewsPracticed || []
    const quizzes = learnerProfile?.quizAttempts || []
    
    const totalInterviews = interviews.length
    const completedInterviews = interviews.filter(i => i.status === "completed").length
    const pendingInterviews = interviews.filter(i => i.status === "in-progress" || i.status === "pending").length
    
    const interviewsWithScores = interviews.filter(i => i.overallScore)
    const avgInterviewScore = interviewsWithScores.length > 0
      ? Math.round(interviewsWithScores.reduce((sum, i) => sum + (i.overallScore || 0), 0) / interviewsWithScores.length)
      : 0

    const avgQuizScore = quizzes.length > 0
      ? Math.round(quizzes.reduce((sum, q) => sum + (q.percentage || 0), 0) / quizzes.length)
      : 0

    return {
      totalInterviews,
      completedInterviews,
      pendingInterviews,
      avgInterviewScore,
      avgQuizScore,
      totalQuizzes: quizzes.length,
    }
  }, [learnerProfile])

  // Performance over time data
  const performanceData = useMemo(() => {
    const interviews = learnerProfile?.interviewsPracticed || []
    return interviews
      .filter(i => i.status === "completed" && i.overallScore)
      .sort((a, b) => new Date(a.completedAt || a.startedAt) - new Date(b.completedAt || b.startedAt))
      .slice(-10)
      .map((interview, index) => ({
        name: `Session ${index + 1}`,
        score: interview.overallScore,
        date: new Date(interview.completedAt || interview.startedAt).toLocaleDateString(),
      }))
  }, [learnerProfile])

  // Skills breakdown radar
  const skillsRadarData = useMemo(() => {
    const interviews = learnerProfile?.interviewsPracticed || []
    const completedWithScores = interviews.filter(i => 
      i.status === 'completed' && (i.technicalScore || i.communicationScore || i.problemSolvingScore)
    )

    if (completedWithScores.length === 0) return []

    const avgTechnical = completedWithScores.reduce((sum, i) => sum + (i.technicalScore || 0), 0) / completedWithScores.length
    const avgCommunication = completedWithScores.reduce((sum, i) => sum + (i.communicationScore || 0), 0) / completedWithScores.length
    const avgProblemSolving = completedWithScores.reduce((sum, i) => sum + (i.problemSolvingScore || 0), 0) / completedWithScores.length

    return [
      { skill: 'Technical', score: Math.round(avgTechnical) },
      { skill: 'Communication', score: Math.round(avgCommunication) },
      { skill: 'Problem Solving', score: Math.round(avgProblemSolving) },
    ]
  }, [learnerProfile])

  // Quiz vs Interview comparison
  const comparisonData = useMemo(() => {
    const quizzes = learnerProfile?.quizAttempts || []
    const interviews = learnerProfile?.interviewsPracticed || []

    const quizzesByWeek = {}
    const interviewsByWeek = {}

    quizzes.forEach(quiz => {
      const week = new Date(quiz.createdAt || Date.now()).toISOString().split('T')[0].slice(0, 7)
      if (!quizzesByWeek[week]) quizzesByWeek[week] = []
      quizzesByWeek[week].push(quiz.percentage || 0)
    })

    interviews.filter(i => i.overallScore).forEach(interview => {
      const week = new Date(interview.completedAt || interview.startedAt || Date.now()).toISOString().split('T')[0].slice(0, 7)
      if (!interviewsByWeek[week]) interviewsByWeek[week] = []
      interviewsByWeek[week].push(interview.overallScore)
    })

    const allWeeks = new Set([...Object.keys(quizzesByWeek), ...Object.keys(interviewsByWeek)])
    
    return Array.from(allWeeks).sort().slice(-6).map(week => ({
      month: new Date(week + '-01').toLocaleDateString('en-US', { month: 'short' }),
      quizAvg: quizzesByWeek[week] ? Math.round(quizzesByWeek[week].reduce((a, b) => a + b, 0) / quizzesByWeek[week].length) : null,
      interviewAvg: interviewsByWeek[week] ? Math.round(interviewsByWeek[week].reduce((a, b) => a + b, 0) / interviewsByWeek[week].length) : null,
    }))
  }, [learnerProfile])
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Performance Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your learning progress and achievements</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalInterviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedInterviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quiz Attempts</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <ThumbsUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.avgInterviewScore > 0 ? `${stats.avgInterviewScore}%` : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      {stats.completedInterviews > 0 || stats.totalQuizzes > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Interview Performance Trend */}
          {performanceData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Interview Performance Trend
                </CardTitle>
                <CardDescription>Your progress over recent interview sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis domain={[0, 100]} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Score %"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Skills Radar */}
          {skillsRadarData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills Assessment
                </CardTitle>
                <CardDescription>Average scores across key competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" className="text-xs" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                    <Radar
                      name="Skills"
                      dataKey="score"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Quiz vs Interview Comparison */}
          {comparisonData.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Quiz vs Interview Performance
                </CardTitle>
                <CardDescription>Comparative analysis of your performance across different assessment types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis domain={[0, 100]} className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="quizAvg" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Quiz Avg %" />
                    <Bar dataKey="interviewAvg" fill="#10b981" radius={[8, 8, 0, 0]} name="Interview Avg %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Performance Data Yet
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Complete some quizzes or interviews to see your detailed performance analytics and insights.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

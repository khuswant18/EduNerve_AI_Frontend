import { useLearner } from "../context/LearnerContext"
import { content } from "../data/mockData"
import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"

export default function QuizzesPage() {
  const { learnerProfile } = useLearner()
  const weakTopics = learnerProfile?.weakTopics || []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Hub</h1>
          <p className="text-muted-foreground">Test your knowledge and track your progress</p>
        </div>

        {weakTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {weakTopics.map((topic) => {
              const topicContent = content[topic]
              if (!topicContent) return null

              const attempts = learnerProfile?.quizAttempts?.filter((qa) => qa.topic === topic) || []
              const lastScore = attempts.length > 0 ? attempts[attempts.length - 1].score : null

              return (
                <Link
                  key={topic}
                  to={`/quiz/${topic}`}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{topicContent.quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{topicContent.quiz.questions.length} questions</p>
                    </div>
                    <span className="text-2xl">📝</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>⏱️</span>
                      <span>~{topicContent.quiz.questions.length * 2} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>🎯</span>
                      <span>Attempts: {attempts.length}</span>
                    </div>
                    {lastScore !== null && (
                      <div className="flex items-center gap-2 text-sm">
                        <span>📊</span>
                        <span className="font-medium text-foreground">Last Score: {lastScore}%</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No quizzes available</p>
          </div>
        )}
      </div>
    </div>
  )
}

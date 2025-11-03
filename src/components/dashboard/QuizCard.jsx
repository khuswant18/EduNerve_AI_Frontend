import { Link } from "react-router-dom"
import Button from "../common/Button"

export default function QuizCard({ topic, data }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.questions.length} questions</p>
        </div>
        <span className="text-2xl">📝</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>⏱️</span>
          <span>~{data.questions.length * 2} minutes</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>🎯</span>
          <span>Test your knowledge</span>
        </div>
      </div>

      <Link to={`/quiz/${topic}`}>
        <Button variant="primary" className="w-full">
          Start Quiz
        </Button>
      </Link>
    </div>
  )
}

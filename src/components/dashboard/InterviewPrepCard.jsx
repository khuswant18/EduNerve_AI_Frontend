import { Link } from "react-router-dom"
import Button from "../common/Button"

export default function InterviewPrepCard({ topic, data }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.questions.length} practice questions</p>
        </div>
        <span className="text-2xl">🎤</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>💡</span>
          <span>Practice common interview questions</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>🎯</span>
          <span>Build confidence</span>
        </div>
      </div>

      <Link to={`/interview/${topic}`}>
        <Button variant="primary" className="w-full">
          Practice Interview
        </Button>
      </Link>
    </div>
  )
}

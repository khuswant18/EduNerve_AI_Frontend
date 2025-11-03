import { Link } from "react-router-dom"
import Button from "../common/Button"

export default function LmsCard({ topic, data }) {
  const completedModules = data.modules.filter((m) => m.completed).length
  const totalModules = data.modules.length
  const progress = (completedModules / totalModules) * 100

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
        <span className="text-2xl">📚</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {completedModules}/{totalModules} modules
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {data.modules.slice(0, 2).map((module) => (
          <div key={module.id} className="flex items-center gap-2 text-sm">
            <span className={module.completed ? "text-primary" : "text-muted-foreground"}>
              {module.completed ? "✓" : "○"}
            </span>
            <span className="text-foreground">{module.title}</span>
            <span className="text-muted-foreground ml-auto">{module.duration}</span>
          </div>
        ))}
      </div>

      <Link to={`/learning/${topic}`}>
        <Button variant="primary" className="w-full">
          Continue Learning
        </Button>
      </Link>
    </div>
  )
}

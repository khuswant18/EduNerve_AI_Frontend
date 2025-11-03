import { useMemo, useState } from "react"
import { BookOpen, Clock, Trophy, Filter, Menu } from "lucide-react"

import LearningSidebar from "../components/layout/LearningSidebar"
import Button from "../components/common/Button"
import Badge from "../components/common/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"

const quizzes = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts including variables, functions, and scope.",
    subject: "Programming",
    difficulty: "Beginner",
    questions: 20,
    duration: "30 min",
    completions: 1234,
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    description: "Deep dive into advanced React patterns, hooks, and performance optimization techniques.",
    subject: "Programming",
    difficulty: "Advanced",
    questions: 25,
    duration: "45 min",
    completions: 567,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Master essential data structures and algorithmic problem-solving techniques.",
    subject: "Computer Science",
    difficulty: "Intermediate",
    questions: 30,
    duration: "60 min",
    completions: 890,
  },
  {
    id: 4,
    title: "System Design Basics",
    description: "Learn fundamental concepts of distributed systems and scalable architecture.",
    subject: "System Design",
    difficulty: "Intermediate",
    questions: 15,
    duration: "40 min",
    completions: 456,
  },
  {
    id: 5,
    title: "TypeScript Essentials",
    description: "Understand TypeScript type system, interfaces, and advanced type features.",
    subject: "Programming",
    difficulty: "Beginner",
    questions: 18,
    duration: "35 min",
    completions: 789,
  },
  {
    id: 6,
    title: "Database Design Principles",
    description: "Explore relational database design, normalization, and query optimization.",
    subject: "Database",
    difficulty: "Intermediate",
    questions: 22,
    duration: "50 min",
    completions: 345,
  },
]

const subjects = ["All", "Programming", "Computer Science", "System Design", "Database"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

const difficultyStyles = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
}

export default function QuizHubPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const subjectMatch = selectedSubject === "All" || quiz.subject === selectedSubject
      const difficultyMatch = selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty
      return subjectMatch && difficultyMatch
    })
  }, [selectedSubject, selectedDifficulty])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LearningSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-col lg:pl-72">
  <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-backdrop-filter:bg-background/80 lg:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Assess</p>
            <p className="text-base font-semibold">Interactive Quizzes</p>
          </div>
        </header>

        <main className="flex-1 px-4 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-12 hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Assess</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Interactive Quizzes</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Challenge yourself with our comprehensive quiz library. Filter by subject and difficulty to find the
                perfect quiz for your skill level.
              </p>
            </div>

            <section className="mb-10 rounded-2xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filters
              </div>

              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Subject</p>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <Button
                        key={subject}
                        variant={selectedSubject === subject ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSubject(subject)}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="group border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {quiz.subject}
                        </Badge>
                        <Badge className={difficultyStyles[quiz.difficulty] || ""}>{quiz.difficulty}</Badge>
                      </div>
                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {quiz.questions} questions
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {quiz.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        {quiz.completions.toLocaleString()} completions
                      </div>
                      <Button className="w-full" variant="primary">
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredQuizzes.length === 0 && (
                <div className="mt-10 rounded-xl border border-dashed border-border bg-card/40 py-12 text-center">
                  <p className="text-muted-foreground">No quizzes found matching your filters.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

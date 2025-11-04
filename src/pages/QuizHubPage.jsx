import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, Clock, Trophy, Filter } from "lucide-react"

import Navbar from "../components/layout/Navbar"
import Button from "../components/common/Button"
import Badge from "../components/common/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { content } from "../data/mockData"

const topicMetadata = {
  "Data Structures": { subject: "Computer Science", difficulty: "Intermediate" },
  Algorithms: { subject: "Computer Science", difficulty: "Advanced" },
  "System Design": { subject: "System Design", difficulty: "Intermediate" },
  "Machine Learning": { subject: "Artificial Intelligence", difficulty: "Advanced" },
}

const buildQuizzes = () => {
  return Object.entries(content).map(([topicKey, topicData]) => {
    const meta = topicMetadata[topicKey] || { subject: "General", difficulty: "Intermediate" }
    const questionCount = topicData?.quiz?.questions?.length || 0

    return {
      id: topicKey,
      topicKey,
      title: topicData?.quiz?.title || `${topicKey} Quiz`,
      description: topicData?.lms?.description || `Test your understanding of ${topicKey}.`,
      subject: meta.subject,
      difficulty: meta.difficulty,
      questions: questionCount,
      duration: `${Math.max(questionCount * 2, 5)} min`,
      completions: 250 + questionCount * 42,
    }
  })
}

const difficultyStyles = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
}

const quizzes = buildQuizzes()

export default function QuizHubPage() {
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const subjects = useMemo(() => {
    const uniqueSubjects = new Set(quizzes.map((quiz) => quiz.subject))
    return ["All", ...uniqueSubjects]
  }, [])

  const difficulties = useMemo(() => {
    const uniqueDifficulties = new Set(quizzes.map((quiz) => quiz.difficulty))
    return ["All", ...uniqueDifficulties]
  }, [])

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const subjectMatch = selectedSubject === "All" || quiz.subject === selectedSubject
      const difficultyMatch = selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty
      return subjectMatch && difficultyMatch
    })
  }, [selectedDifficulty, selectedSubject])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex min-h-screen flex-col">
        <main className="flex-1 px-4 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-12">
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
                      <Link to={`/quiz/${encodeURIComponent(quiz.topicKey)}`} className="w-full">
                        <Button className="w-full" variant="primary">
                          Start Quiz
                        </Button>
                      </Link>
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
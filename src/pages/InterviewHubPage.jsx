import { useState } from "react"
import { MessageSquare, Calendar, CheckCircle2, ArrowRight, Menu } from "lucide-react"

import LearningSidebar from "../components/layout/LearningSidebar"
import Button from "../components/common/Button"
import Badge from "../components/common/Badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"

const technicalQuestions = [
  {
    id: 1, 
    question: "Explain the difference between var, let, and const in JavaScript",
    difficulty: "Beginner",
    category: "JavaScript",
  },
  {
    id: 2,
    question: "What is the time complexity of common sorting algorithms?",
    difficulty: "Intermediate",
    category: "Algorithms",
  },
  {
    id: 3,
    question: "How does React's virtual DOM work?",
    difficulty: "Intermediate",
    category: "React",
  },
  {
    id: 4,
    question: "Explain database indexing and when to use it",
    difficulty: "Advanced",
    category: "Database",
  },
]

const behavioralQuestions = [
  {
    id: 1,
    question: "Tell me about a time you faced a challenging project deadline",
    category: "Time Management",
  },
  {
    id: 2,
    question: "Describe a situation where you had to work with a difficult team member",
    category: "Teamwork",
  },
  {
    id: 3,
    question: "How do you handle constructive criticism?",
    category: "Growth Mindset",
  },
  {
    id: 4,
    question: "Share an example of when you took initiative on a project",
    category: "Leadership",
  },
]

const hrQuestions = [
  {
    id: 1,
    question: "Why do you want to work for our company?",
    category: "Motivation",
  },
  {
    id: 2,
    question: "Where do you see yourself in 5 years?",
    category: "Career Goals",
  },
  {
    id: 3,
    question: "What are your salary expectations?",
    category: "Compensation",
  },
  {
    id: 4,
    question: "Why are you leaving your current position?",
    category: "Career Change",
  },
]

export default function InterviewHubPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("technical")

  const renderQuestions = (questions, options = {}) => (
    <div className="grid grid-cols-1 gap-4">
      {questions.map((question) => (
        <Card
          key={question.id}
          className="border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {question.category}
                </Badge>
                {question.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    {question.difficulty}
                  </Badge>
                )}
                <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
              </div>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant={options.buttonVariant || "ghost"}
              size="sm"
              className="transition-colors"
            >
              {options.buttonLabel || "View Answer & Tips"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

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
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Prepare</p>
            <p className="text-base font-semibold">Interview Preparation</p>
          </div>
        </header>

        <main className="flex-1 px-4 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-12 hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Prepare</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Interview Preparation</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Prepare for your next interview with our comprehensive question bank and mock interview sessions. Practice makes perfect.
              </p>
            </div>

            <Card className="mb-12 border border-primary/30 bg-primary/5">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">Book a Mock Interview</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Practice with experienced interviewers and get personalized feedback on your performance.
                    </CardDescription>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {["1-on-1 sessions", "Expert feedback", "Flexible scheduling"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  Schedule Mock Interview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Question Bank</h2>
                <p className="text-muted-foreground">Switch between technical, behavioral, and HR prompts.</p>
              </div>
              <div className="inline-flex rounded-lg border border-border bg-card p-1">
                {[{ value: "technical", label: "Technical" }, { value: "behavioral", label: "Behavioral" }, { value: "hr", label: "HR" }].map(
                  (tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveTab(tab.value)}
                      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ),
                )}
              </div>
            </section>

            {activeTab === "technical" && renderQuestions(technicalQuestions)}

            {activeTab === "behavioral" &&
              renderQuestions(behavioralQuestions, { buttonLabel: "View Answer Framework", buttonVariant: "ghost" })}

            {activeTab === "hr" &&
              renderQuestions(hrQuestions, { buttonLabel: "View Best Practices", buttonVariant: "ghost" })}
          </div>
        </main>
      </div>
    </div>
  )
}

import { useState } from "react"
import { Menu } from "lucide-react"
import LearningSidebar from "../components/layout/LearningSidebar"
import Button from "../components/common/Button"
import { OverviewContent } from "../components/dashboard/overview-content"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <LearningSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-72 flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden inline-flex items-center gap-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
              Menu
            </Button>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Overview</p>
              <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-10 lg:py-10">
          <OverviewContent />
        </main>
      </div>
    </div>
  )
}

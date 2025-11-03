import Navbar from "../components/layout/Navbar"
import { FolderGit2 } from "lucide-react"

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-black px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 border border-yellow-600 rounded-xl mb-4">
            <FolderGit2 className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Showcase</h1>
          <p className="text-slate-400 mb-8">Explore and like community projects (coming soon).</p>
          <p className="text-slate-500">We are curating the best community builds. Stay tuned!</p>
        </div>
      </div>
    </>
  )
}

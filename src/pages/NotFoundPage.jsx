import { Link } from "react-router-dom"
import Button from "../components/common/Button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    </div>
  )
}

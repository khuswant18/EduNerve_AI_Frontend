export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>}
      <input
        className={`w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${error ? "border-destructive" : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}

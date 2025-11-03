export default function Badge({ children, variant = "default", className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors"

  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-muted text-muted-foreground border-border",
    outline: "bg-transparent text-foreground border-border",
  }

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </span>
  )
}

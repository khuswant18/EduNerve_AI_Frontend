export default function Progress({ value = 0, className = "" }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={`w-full overflow-hidden rounded-full bg-muted ${className}`} aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100} role="progressbar">
      <div
        className="h-2 rounded-full bg-primary transition-all duration-300"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}

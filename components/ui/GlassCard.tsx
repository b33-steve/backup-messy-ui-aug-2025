'use client'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`
      rounded-xl p-4 transition-all duration-300
      bg-white/70 dark:bg-gray-800/50 
      border border-gray-200 dark:border-gray-700
      backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1
      ${className}
    `}>
      {children}
    </div>
  )
}

// Keep default export for backward compatibility
export default GlassCard
'use client'

interface StrategyCardProps {
  title: string
  subtitle: string
  description: string
  color: 'blue' | 'green' | 'orange' | 'purple'
}

export default function StrategyCard({ title, subtitle, description, color }: StrategyCardProps) {
  const colors = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    purple: 'from-purple-400 to-purple-600',
  }

  return (
    <div className="p-4 rounded-lg transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700">
      <div className={`text-xs font-semibold mb-2 bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
        {title}
      </div>
      <div className="font-medium text-sm mb-1">{subtitle}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
    </div>
  )
}
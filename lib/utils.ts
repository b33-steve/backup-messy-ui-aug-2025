import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatConfidence(confidence: number): { text: string; className: string } {
  const rounded = Math.round(confidence)
  let className = "bg-gray-100 text-gray-800"
  
  if (rounded >= 90) {
    className = "bg-green-100 text-green-800"
  } else if (rounded >= 75) {
    className = "bg-blue-100 text-blue-800"
  } else if (rounded >= 60) {
    className = "bg-yellow-100 text-yellow-800"
  } else {
    className = "bg-red-100 text-red-800"
  }
  
  return {
    text: `${rounded}%`,
    className
  }
}

export function frameworkColors(framework: string): string {
  const colors: Record<string, string> = {
    'ICE': 'bg-blue-100 text-blue-800 border-blue-200',
    'RICE': 'bg-green-100 text-green-800 border-green-200',
    'Porter': 'bg-purple-100 text-purple-800 border-purple-200',
    'OKR': 'bg-orange-100 text-orange-800 border-orange-200',
    'MoSCoW': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Kano': 'bg-pink-100 text-pink-800 border-pink-200',
    'default': 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return colors[framework] || colors.default
}

export function statusIndicators(status: string): string {
  const indicators: Record<string, string> = {
    'online': 'bg-green-100 text-green-800 border-green-200',
    'offline': 'bg-red-100 text-red-800 border-red-200',
    'warning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'processing': 'bg-blue-100 text-blue-800 border-blue-200',
    'success': 'bg-green-100 text-green-800 border-green-200',
    'error': 'bg-red-100 text-red-800 border-red-200',
    'default': 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return indicators[status] || indicators.default
}

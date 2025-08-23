'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/providers/theme-provider'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '🎯' },
    { href: '/chat', label: 'Strategic Chat', icon: '🧠' },
    { href: '/tasks', label: 'Tasks', icon: '📋' },
    { href: '/data', label: 'Data', icon: '📊' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PM33
          </span>
          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
            Beta
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                pathname === item.href
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {(['light', 'dark', 'gray'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                theme === t
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '⚫'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
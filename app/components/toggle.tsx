'use client'

import { useTheme } from 'next-themes'


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()


  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="lg:p-2 p-1 text-sm rounded border border-gray-300 dark:border-gray-600"
    >
      {theme === 'dark' ? ' ☀️ ' : ' 🌙'}
    </button>
  )
}

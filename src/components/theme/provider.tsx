/**
 * AGENT INSTRUCTION: Theme Provider
 * 
 * This component provides theme context (light/dark mode) to the entire application.
 * When adapting for other industries:
 * 
 * 1. Keep the ThemeProvider wrapper in your main App component
 * 2. Maintain the theme persistence with localStorage
 * 3. Preserve the system theme detection
 * 4. Customize the storageKey for your app (e.g., "photography-theme")
 * 
 * Key features:
 * - System theme detection (follows user's OS preference)
 * - Manual theme switching (light/dark toggle)
 * - localStorage persistence across sessions
 * - Proper TypeScript context typing
 * 
 * Usage pattern:
 * <ThemeProvider defaultTheme="system" storageKey="your-app-theme">
 *   <App />
 * </ThemeProvider>
 */

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

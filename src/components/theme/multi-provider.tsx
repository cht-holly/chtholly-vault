/**
 * AGENT INSTRUCTION: Multi-Theme System
 * 
 * This system extends the base theme provider to support multiple industry-specific
 * color schemes. It demonstrates how to create cohesive brand experiences that
 * adapt to different use cases while maintaining design consistency.
 * 
 * ADAPTATION GUIDE:
 * 1. Add new theme variants by extending the ThemeVariant type
 * 2. Define color schemes in the CSS variables
 * 3. Update components to respond to theme changes
 * 4. Maintain accessibility standards across all themes
 * 
 * INDUSTRY EXAMPLES:
 * - Photography: Warm, elegant tones with dark backgrounds
 * - E-commerce: Trust-building blues with high contrast
 * - Healthcare: Calming greens with professional whites
 * - Finance: Sophisticated grays with accent colors
 * - Education: Energetic oranges with clear hierarchy
 */

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"
type ThemeVariant = "default" | "photography" | "ecommerce" | "healthcare" | "finance" | "education"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultVariant?: ThemeVariant
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  variant: ThemeVariant
  setTheme: (theme: Theme) => void
  setVariant: (variant: ThemeVariant) => void
  setThemeAndVariant: (theme: Theme, variant: ThemeVariant) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  variant: "default",
  setTheme: () => null,
  setVariant: () => null,
  setThemeAndVariant: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function MultiThemeProvider({
  children,
  defaultTheme = "light",
  defaultVariant = "default",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  
  const [variant, setVariant] = useState<ThemeVariant>(
    () => (localStorage.getItem(`${storageKey}-variant`) as ThemeVariant) || defaultVariant
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark")
    root.classList.remove("theme-default", "theme-photography", "theme-ecommerce", "theme-healthcare", "theme-finance", "theme-education")

    // Add current theme classes
    root.classList.add(theme)
    root.classList.add(`theme-${variant}`)
  }, [theme, variant])

  const value = {
    theme,
    variant,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    setVariant: (variant: ThemeVariant) => {
      localStorage.setItem(`${storageKey}-variant`, variant)
      setVariant(variant)
    },
    setThemeAndVariant: (theme: Theme, variant: ThemeVariant) => {
      localStorage.setItem(storageKey, theme)
      localStorage.setItem(`${storageKey}-variant`, variant)
      setTheme(theme)
      setVariant(variant)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useMultiTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useMultiTheme must be used within a MultiThemeProvider")

  return context
}

// Legacy compatibility - keep the original useTheme for existing components
export const useTheme = () => {
  const { theme, setTheme } = useMultiTheme()
  return { theme, setTheme }
}

/**
 * USAGE EXAMPLES:
 * 
 * Basic theme switching:
 * const { theme, setTheme } = useTheme()
 * 
 * Multi-theme with variants:
 * const { theme, variant, setThemeAndVariant } = useMultiTheme()
 * setThemeAndVariant('dark', 'photography')
 * 
 * Industry-specific themes:
 * - Photography: setThemeAndVariant('dark', 'photography')
 * - E-commerce: setThemeAndVariant('light', 'ecommerce')
 * - Healthcare: setThemeAndVariant('light', 'healthcare')
 * - Finance: setThemeAndVariant('dark', 'finance')
 * - Education: setThemeAndVariant('light', 'education')
 */

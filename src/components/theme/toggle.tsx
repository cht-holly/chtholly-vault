/**
 * AGENT INSTRUCTION: Theme Toggle Component
 * 
 * This component provides a button to toggle between light and dark themes.
 * When adapting for other industries:
 * 
 * 1. Keep the theme toggle functionality as-is
 * 2. Customize the button styling if needed
 * 3. You can replace the icons with your preferred icon library
 * 4. Maintain accessibility features (aria-label, keyboard navigation)
 * 
 * Key features:
 * - Cycles through light -> dark -> system themes
 * - Shows appropriate icon for current theme
 * - Accessible keyboard navigation
 * - Mobile-friendly touch targets
 * 
 * Usage: <ThemeToggle />
 */

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 touch-manipulation"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}

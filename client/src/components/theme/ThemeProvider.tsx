import { createContext, useContext, useEffect, useState, useMemo } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
  isLoading: boolean
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  isLoading: false
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Function to get system theme
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "app-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize with a non-loading state
  const [isLoading, setIsLoading] = useState(false)
  
  // Load saved theme (use useState with callback to only run once on mount)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })
  
  // Store the resolved theme (actual light/dark value)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    theme === "system" ? getSystemTheme() : theme as "light" | "dark"
  )

  // Apply theme to document without waiting for effects
  const applyTheme = (newTheme: Theme) => {
    setIsLoading(true)
    
    // Short timeout to allow the loading state to render
    setTimeout(() => {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")

      const resolvedValue = newTheme === "system" 
        ? getSystemTheme() 
        : newTheme as "light" | "dark"
      
      root.classList.add(resolvedValue)
      setResolvedTheme(resolvedValue)
      
      // Allow a short time for transition effects
      setTimeout(() => {
        setIsLoading(false)
      }, 150)
    }, 0)
  }

  // Custom theme setter
  const setThemeWithTransition = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  // Memoize the context value
  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isLoading,
      setTheme: setThemeWithTransition,
    }),
    [theme, resolvedTheme, isLoading]
  )

  // Initialize theme on mount
  useEffect(() => {
    const root = window.document.documentElement
    
    // Set initial theme class
    const initialTheme = theme === "system" ? getSystemTheme() : theme as "light" | "dark"
    root.classList.add(initialTheme)
    setResolvedTheme(initialTheme)
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, []) // Only run once on mount

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
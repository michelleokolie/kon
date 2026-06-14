import { createContext, useContext, useState } from "react";
import { darkColours, lightColours } from "./colours";

// TS needs to know the shape of my colours object, so I need to make a type for that
// This will update if the lightColours object changes
export type ColourScheme = typeof lightColours;

// We also need our context
type ThemeContextType = {
  colours: ColourScheme;
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const colours = isDark ? darkColours : lightColours;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ colours, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

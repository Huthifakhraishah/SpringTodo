import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

interface ThemeContextType {
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleThemeMode: () => {},
});

export const useThemeMode = (): ThemeContextType => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleThemeMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

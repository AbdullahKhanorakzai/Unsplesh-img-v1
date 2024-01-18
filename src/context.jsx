import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const getInitailDarkMode = () => {
    const prefrenceDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    const storedSarkMode = localStorage.getItem("darkTheme") === "true";
    return storedSarkMode || prefrenceDarkMode;
  };

  const [isDarkTheme, setIsDarkTheme] = useState(getInitailDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("darkTheme", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

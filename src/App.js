import { ThemeProvider } from "styled-components";
import { lazy, Suspense, useState, useEffect } from "react";
import { darkTheme, lightTheme, portfolioDarkTheme, portfolioLightTheme } from "./utils/Themes.js";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import ProjectDetails from "./components/ProjectDetails";
import GlobalStyles from "./styles/GlobalStyles";
import Terminal from "./components/Terminal";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { app } from "./services/firebase";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function App() {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [showTerminal, setShowTerminal] = useState(false);

  /* Konami code: ↑↑↓↓←→←→BA */
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          setShowTerminal(true);
          idx = 0;
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Dark mode from user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // Log page view to analytics
  useEffect(() => {
    if (process.env.REACT_APP_APP_ID) {
      isSupported()
        .then((supported) => {
          if (supported) logEvent(getAnalytics(app), "page_view");
        })
        .catch(() => {});
    }
  }, []);

  // Admin is available only via the admin subdomain.
  const isAdmin = (() => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname || '';
    const adminPrefix = (process.env.REACT_APP_ADMIN_SUBDOMAIN || 'admin') + '.';
    return host.toLowerCase().startsWith(adminPrefix.toLowerCase());
  })();

  const [dark, light] = isAdmin ? [darkTheme, lightTheme] : [portfolioDarkTheme, portfolioLightTheme];

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <GlobalStyles />
      <Router>
        {isAdmin ? (
          <Suspense fallback={<p role="status">Loading admin…</p>}>
            <AdminApp />
          </Suspense>
        ) : (
          <>
            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
            <Portfolio
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onProject={(project) => setOpenModal({ state: true, project })}
              onEasterEgg={() => setShowTerminal(true)}
            />
            {openModal.state && <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />}
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;

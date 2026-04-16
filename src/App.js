// Update your App.js to include the Certificates component

import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./utils/Themes.js";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import ProjectDetails from "./components/ProjectDetails";
import ScrollToTop from "./components/ScrollToTop";
import AdminApp from "./admin/AdminApp";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import SectionDivider from "./components/SectionDivider";
import CursorSpotlight from "./components/CursorSpotlight";
import IntroSplash, { shouldShowSplash } from "./components/IntroSplash";
import NoiseTexture from "./components/NoiseTexture";
import Terminal from "./components/Terminal";
import { AnimatePresence } from "framer-motion";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./services/firebase";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: clip;
  transition: background-color 0.3s ease-in-out;
`;


const analytics = getAnalytics(app);

function App() {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const [showTerminal, setShowTerminal] = useState(false);
  useSmoothScroll();

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
    logEvent(analytics, "page_view");
  }, []);

  // Admin is available only via the admin subdomain.
  const isAdmin = (() => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname || '';
    const adminPrefix = (process.env.REACT_APP_ADMIN_SUBDOMAIN || 'admin') + '.';
    return host.toLowerCase().startsWith(adminPrefix.toLowerCase());
  })();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        {isAdmin ? (
          <AdminApp />
        ) : (
          <>
            {showSplash && <IntroSplash onDone={() => setShowSplash(false)} />}
            {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
            <NoiseTexture />
            <CursorSpotlight darkMode={darkMode} />
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Body>
              <ScrollToTop />
              <HeroSection />
              <SectionDivider from="card_light" to="bg" />
              <Skills />
              <SectionDivider from="bg" to="card_light" flip />
              <Experience />
              <SectionDivider from="card_light" to="bg" />
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Education />
              <SectionDivider from="bg" to="card_light" flip />
              <Certificates />
              <Contact />
              <Footer onEasterEgg={() => setShowTerminal(true)} />
              <AnimatePresence>
                {openModal.state && (
                  <ProjectDetails
                    openModal={openModal}
                    setOpenModal={(newModalState) => {
                      setOpenModal(newModalState);
                      if (!newModalState.state) {
                        setTimeout(() => { document.body.style.overflow = ''; }, 100);
                      }
                    }}
                  />
                )}
              </AnimatePresence>
            </Body>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;

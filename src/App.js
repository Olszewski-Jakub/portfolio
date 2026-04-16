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
import { AnimatePresence } from "framer-motion";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./services/firebase";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  transition: background-color 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      ${({ theme }) => theme.gradients.wrapper.pinkLight} 0%,
      ${({ theme }) => theme.gradients.wrapper.pinkZero} 50%
  ),
  linear-gradient(
      141.27deg,
      ${({ theme }) => theme.gradients.wrapper.blueZero} 50%,
      ${({ theme }) => theme.gradients.wrapper.blueLight} 100%
  );
  width: 100%;
`;

const analytics = getAnalytics(app);

function App() {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

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
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Body>
              <ScrollToTop />
              <HeroSection />
              <Wrapper>
                <Skills />
                <Experience />
              </Wrapper>
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Wrapper>
                <Education />
                <Certificates />
                <Contact />
              </Wrapper>
              <Footer />
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

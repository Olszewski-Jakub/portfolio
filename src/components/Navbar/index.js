import React, { useState, useEffect } from 'react';
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
  ThemeToggleButton,
  ProgressBar,
  InitialsBadge
} from './NavbarStyledComponent';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (offset / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certificates", href: "#certificates" }, // Add the new Certificates link
    { name: "Contact", href: "#contact" },
  ];

  return (
      <>
        <ProgressBar progress={scrollProgress} />
        <Nav scrolled={scrolled}>
        <NavbarContainer>
          <NavLogo to="/">
            <a style={{
              display: "flex",
              alignItems: "center",
              color: theme.text_primary,
              cursor: 'pointer',
              textDecoration: 'none',
              gap: '10px'
            }}>
              <InitialsBadge>J.O.</InitialsBadge>
              <Span>Portfolio</Span>
            </a>
          </NavLogo>

          <MobileIcon onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <NavItems>
            {navItems.map((item) => (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
            ))}
          </NavItems>

          <ButtonContainer>
            <ThemeToggleButton onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggleButton>
            <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
              <FaGithub style={{ marginRight: '8px' }} />
              GitHub
            </GitHubButton>
          </ButtonContainer>

          {/* Always mounted so the CSS transform animation plays on open/close */}
          <MobileMenu isOpen={isOpen}>
            {navItems.map((item) => (
                <MobileLink
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                >
                  {item.name}
                </MobileLink>
            ))}
            <GitHubButton
                style={{
                  padding: '10px 16px',
                  background: `${theme.primary}`,
                  color: 'white',
                  width: 'max-content',
                  margin: '16px auto 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                href={Bio.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
            >
              <FaGithub />
              GitHub Profile
            </GitHubButton>
          </MobileMenu>
        </NavbarContainer>
      </Nav>
      </>
  );
};

export default Navbar;

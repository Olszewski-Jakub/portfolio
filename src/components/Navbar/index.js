// Update your Navbar component to include the Certificates link

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
  ThemeToggleButton
} from './NavbarStyledComponent';
import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      <Nav scrolled={scrolled}>
        <NavbarContainer>
          <NavLogo to="/">
            <a style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              cursor: 'pointer',
              textDecoration: 'none'
            }}>
              <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
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

          {isOpen && (
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
          )}
        </NavbarContainer>
      </Nav>
  );
};

export default Navbar;
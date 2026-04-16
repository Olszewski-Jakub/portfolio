import React from "react";
import styled, { useTheme } from "styled-components";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { Bio } from "../../data/constants";

// WaveWrapper background matches the Contact section (card_light),
// so the wave looks like a bite taken out of that section.
// The SVG fill must match the footer background (bg).
const WaveWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background: ${({ theme }) => theme.card_light};

  svg {
    display: block;
    width: 100%;
    height: 60px;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  position: relative;
  z-index: 1;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  color: ${({ theme }) => theme.primary};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease-in-out;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease-in-out;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => `${theme.primary}15`};

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const EasterEggHint = styled.p`
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.18;
  margin-top: 10px;
  letter-spacing: 1px;
  user-select: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    opacity: 0.28;
    font-size: 12px;
  }
`;

const ScrollToTop = styled.div`
  position: absolute;
  top: -25px;
  right: 40px;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 1px;
  background: ${({ theme }) => `${theme.text_primary}20`};
  margin: 10px 0;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FooterSections = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterSectionTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(3px);
  }
`;

const Footer = ({ onEasterEgg }) => {
  const theme = useTheme();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
      <>
      <WaveWrapper>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill={theme.bg}
          />
        </svg>
      </WaveWrapper>
      <FooterContainer>
        <FooterWrapper>
          <ScrollToTop onClick={scrollToTop}>
            <FiArrowUp />
          </ScrollToTop>

          <Logo>Jakub Olszewski</Logo>

          <Nav>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#certificates">Certificates</NavLink> {/* Add the new Certificates link */}
            <NavLink href="#contact">Contact</NavLink>
          </Nav>

          <Divider />

          <FooterInfo>
            <FooterSections>
              <FooterSection>
                <FooterSectionTitle>Contact</FooterSectionTitle>
                <FooterLink href={`mailto:${Bio.email || 'j.olszewski05@gmail.com'}`}>
                  Email Me
                </FooterLink>
                <FooterLink href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </FooterLink>
                <FooterLink href={Bio.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </FooterLink>
              </FooterSection>

              <FooterSection>
                <FooterSectionTitle>Resume</FooterSectionTitle>
                <FooterLink href={Bio.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </FooterLink>
                <FooterLink href="#projects">
                  Recent Projects
                </FooterLink>
                <FooterLink href="#certificates">
                  Certificates
                </FooterLink> {/* Add link to Certificates in the footer section too */}
              </FooterSection>
            </FooterSections>

            <SocialMediaIcons>
              <SocialMediaIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialMediaIcon>
              <SocialMediaIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </SocialMediaIcon>
              <SocialMediaIcon href={`mailto:${Bio.email || 'olszewski.jakub@outlook.com'}`} aria-label="Email">
                <FaEnvelope />
              </SocialMediaIcon>
            </SocialMediaIcons>
          </FooterInfo>

          <Divider />

          <Copyright>
            &copy; {new Date().getFullYear()} Jakub Olszewski. All rights reserved.
          </Copyright>
          <EasterEggHint onClick={onEasterEgg}>// ↑ ↑ ↓ ↓ ← → ← → B A</EasterEggHint>
        </FooterWrapper>
      </FooterContainer>
      </>
  );
};

export default Footer;
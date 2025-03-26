import { Link as LinkR } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Nav = styled.div`
    background-color: ${({ theme, scrolled }) => scrolled ? `${theme.card_light}ee` : 'transparent'};
    backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    box-shadow: ${({ scrolled }) => scrolled ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
    width: 80%;
    padding: 0 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const Span = styled.div`
    padding: 0 8px;
    font-weight: bold;
    font-size: 20px;
    color: ${({ theme }) => theme.text_primary};
    transition: all 0.3s ease-in-out;
`;

export const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 0;
    list-style: none;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const navLinkStyles = css`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    padding: 0 4px;
    transition: all 0.3s ease-in-out;

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

    &.active {
        color: ${({ theme }) => theme.primary};

        &:after {
            width: 100%;
        }
    }
`;

export const NavLink = styled.a`
    ${navLinkStyles}
`;

export const MobileLink = styled.a`
    ${navLinkStyles}
    font-size: 18px;
    margin: 12px 0;
    width: fit-content;
`;

export const GitHubButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.8px solid ${({ theme }) => theme.primary};
    border-radius: 20px;
    color: ${({ theme }) => theme.primary};
    padding: 10px 20px;
    font-weight: 500;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.4s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
        transform: scale(1.05);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

export const ThemeToggleButton = styled.button`
    background: transparent;
    border: 1.8px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.primary};
    margin-right: 16px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
        transform: rotate(360deg);
    }
`;

export const ButtonContainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 6px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.text_primary};
        transition: all 0.3s ease-in-out;

        &:hover {
            color: ${({ theme }) => theme.primary};
        }
    }
`;

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    padding: 32px 40px 64px;
    background: ${({ theme }) => `${theme.card_light}f5`};
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100vh)')};
    border-radius: 0 0 20px 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};
    max-height: 85vh;
    overflow-y: auto;
`;
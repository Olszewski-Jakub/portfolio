import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  animation: ${fadeIn} 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    background-color: ${({ theme }) => `${theme.primary}dd`};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
`;

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    // Check scroll position to show/hide button
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {visible && (
                <Button
                    visible={visible}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </Button>
            )}
        </>
    );
};

export default ScrollToTop;
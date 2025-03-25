import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const float = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
`;

export const HeroSectionWrapper = styled.div`
    position: relative;
    padding-top: 80px; // Account for the fixed navbar
`;

export const HeroContainer = styled.div`
    background: ${({ theme }) => theme.card_light};
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 120px 30px 80px;
    z-index: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
    transition: all 0.5s ease-in-out;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

    @media (max-width: 960px) {
        padding: 66px 16px;
    }
    @media (max-width: 640px) {
        padding: 32px 16px;
    }
`;

export const HeroBg = styled.div`
    position: absolute;
    display: flex;
    justify-content: end;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 1360px;
    overflow: hidden;
    padding: 0 30px;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);

    @media (max-width: 960px) {
        justify-content: center;
        padding: 0 0px;
    }
`;

export const HeroInnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;

    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const HeroLeftContainer = styled.div`
    width: 50%;
    order: 1;
    animation: ${fadeIn} 1s ease-in-out;

    @media (max-width: 960px) {
        width: 100%;
        order: 2;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

export const HeroRightContainer = styled.div`
    width: 50%;
    display: flex;
    order: 2;
    justify-content: flex-end;
    animation: ${fadeIn} 1s ease-in-out 0.5s;
    animation-fill-mode: both;

    @media (max-width: 960px) {
        width: 80%;
        order: 1;
        justify-content: center;
        align-items: center;
        margin-bottom: 80px;
    }

    @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 30px;
    }
`;

export const Img = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 500px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.primary};
    animation: ${float} 6s ease-in-out infinite;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.5s ease-in-out;

    &:hover {
        transform: scale(1.03);
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        max-width: 320px;
        max-height: 320px;
    }

    @media (max-width: 640px) {
        max-width: 280px;
        max-height: 280px;
    }
`;

export const Title = styled.h1`
    font-weight: 700;
    font-size: 50px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.3;
    margin-bottom: 16px;

    @media (max-width: 960px) {
        text-align: center;
    }

    @media (max-width: 640px) {
        font-size: 40px;
        line-height: 1.2;
        margin-bottom: 8px;
    }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;
  margin-bottom: 16px;
  
  @media (max-width: 960px) {
    text-align: center;
  }
  
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => `${theme.primary}CC`}; // Adding transparency for hover effect
  }
`;

export const SubTitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 'CC'};
  max-width: 650px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 30px;
  }
`;

export const ResumeButton = styled.a`
    appearance: button;
    text-decoration: none;
    width: 95%;
    max-width: 250px;
    text-align: center;
    padding: 16px 0;
    color: ${({ theme }) => theme.white};
    border-radius: 50px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.3s ease-in-out !important;
    background: ${({ theme }) => theme.primary};
    background: linear-gradient(225deg, 
      ${({ theme }) => theme.primary} 0%, 
      ${({ theme }) => `${theme.primary}CC`} 100%);
    box-shadow: 0 6px 20px rgba(133, 76, 230, 0.25);
    
    &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 25px rgba(133, 76, 230, 0.4);
    }
    
    &:active {
        transform: translateY(1px) scale(0.98);
    }
    
    @media (max-width: 640px) {
        padding: 12px 0;
        font-size: 16px;
    }
`;

export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
  
  @media (max-width: 640px) {
    justify-content: center;
  }
`;

export const SocialMediaIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  padding: 8px;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
  }
`;

export const ScrollDownIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  animation: ${bounce} 2s infinite;
  font-size: 24px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
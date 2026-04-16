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

export const SectionLabel = styled.div`
  display: inline-block;
  background: ${({ theme }) => `${theme.primary}18`};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 14px;
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 4px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, transparent);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const SectionDesc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-top: 24px;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 0.2s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
    padding: 0 16px;
  }
`;

export const SectionHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
`;

import styled from "styled-components";

// No CSS keyframe animations here — all sections use Framer Motion
// whileInView on the parent motion.div wrapper, so CSS animations on children
// would double-animate and cause jitter.

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
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 4px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  /* block + text-align: center is correct for centering; inline-block caused misalignment */
  display: block;
  width: 100%;

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
  width: 100%;
`;

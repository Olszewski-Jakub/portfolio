import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";
import { motion } from "framer-motion";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  padding: 0 20px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.5s ease-in-out 0.2s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const Skill = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 24px 36px;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    border: 1px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 18px 24px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 20px;
  }
`;

const SkillTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 'cc'};
  border: 1px solid ${({ theme }) => theme.text_primary + '60'};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

// Animation variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Skills = () => {
  return (
      <Container id="skills">
        <Wrapper>
          <Title>Skills</Title>
          <Desc>
            Here are the technologies and tools I've been working with over the past few years.
            I'm always excited to learn and adapt to new technologies.
          </Desc>

          <SkillsContainer
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            {skills.map((skill, index) => (
                <Skill
                    key={index}
                    variants={itemVariants}
                >
                  <SkillTitle>{skill.title}</SkillTitle>
                  <SkillList>
                    {skill.skills.map((item, itemIndex) => (
                        <SkillItem key={itemIndex}>
                          <SkillImage src={item.image} alt={item.name} />
                          {item.name}
                        </SkillItem>
                    ))}
                  </SkillList>
                </Skill>
            ))}
          </SkillsContainer>
        </Wrapper>
      </Container>
  );
};

export default Skills;
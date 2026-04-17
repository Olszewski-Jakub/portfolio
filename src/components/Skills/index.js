import React, { useState } from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from "../SectionTitle";
import { FaCode, FaServer, FaMobileAlt, FaTools } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  background: ${({ theme }) => theme.bg};
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
`;

const TabsRow = styled.div`
  display: flex;
  gap: 0;
  border: 1.5px solid ${({ theme }) => `${theme.primary}40`};
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 36px;
  flex-shrink: 0;
  max-width: 100%;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  cursor: pointer;
  border: none;
  flex-shrink: 0;
  white-space: nowrap;
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.white : theme.text_secondary};
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
  border-right: 1px solid ${({ theme }) => `${theme.primary}30`};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ active, theme }) => active ? theme.primary : `${theme.primary}18`};
    color: ${({ active, theme }) => active ? theme.white : theme.primary};
  }

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 13px;
    gap: 6px;
  }
`;

const SkillsGrid = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const SkillItem = styled(motion.div)`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + 'cc'};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_primary + '25'};
  border-radius: 12px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  cursor: default;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}10`};
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(47, 129, 247, 0.15);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 14px;
  }
`;

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const CATEGORY_ICONS = {
  "Frontend": <FaCode size={16} />,
  "Backend": <FaServer size={16} />,
  "Android": <FaMobileAlt size={16} />,
  "Others": <FaTools size={16} />,
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentSkill = skills[activeTab];

  return (
    <Container id="skills">
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
        >
          <SectionHeadingWrapper>
            <SectionLabel>What I Know</SectionLabel>
            <SectionTitle>Skills</SectionTitle>
          </SectionHeadingWrapper>
          <SectionDesc>
            Here are the technologies and tools I've been working with over the past few years.
            I'm always excited to learn and adapt to new technologies.
          </SectionDesc>
        </motion.div>

        <TabsRow>
          {skills.map((skill, index) => (
            <Tab
              key={index}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {CATEGORY_ICONS[skill.title] || <FaCode size={16} />}
              {skill.title}
            </Tab>
          ))}
        </TabsRow>

        <AnimatePresence mode="wait">
          <SkillsGrid
            key={activeTab}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentSkill?.skills.map((item, idx) => (
              <SkillItem key={idx} variants={itemVariants}>
                <SkillImage src={item.image} alt={item.name} />
                {item.name}
              </SkillItem>
            ))}
          </SkillsGrid>
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
};

export default Skills;

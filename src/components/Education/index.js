import React, { useState } from 'react';
import styled from 'styled-components';
import useContent from '../../hooks/useContent';
import { motion } from 'framer-motion';
import EducationCard from '../Cards/EducationCard';
import { FaGraduationCap, FaAngleRight, FaSchool } from 'react-icons/fa';
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from '../SectionTitle';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0;
    background: ${({ theme }) => theme.bg};

    @media (max-width: 960px) {
        padding: 60px 0;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    padding: 40px 0;
    gap: 12px;

    @media (max-width: 960px) {
        flex-direction: column;
    }
`;


const EducationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    align-items: flex-start;
    padding: 0 16px;

    @media (max-width: 960px) {
        flex-direction: column;
        align-items: center;
    }
`;

const TabsContainer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => `${theme.text_primary}20`};

    @media (max-width: 960px) {
        width: 100%;
        max-width: 600px;
        border-right: none;
        border-bottom: 1px solid ${({ theme }) => `${theme.text_primary}20`};
        margin-bottom: 20px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
        }
    }
`;

const Tab = styled.div`
    padding: 16px 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 16px;
    color: ${({ active, theme }) => active ? theme.primary : theme.text_secondary};
    border-left: 3px solid ${({ active, theme }) => active ? theme.primary : 'transparent'};
    background-color: ${({ active, theme }) => active ? `${theme.primary}10` : 'transparent'};
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out, border-color 0.25s ease-in-out;

    &:hover {
        color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => `${theme.primary}10`};
    }

    @media (max-width: 960px) {
        padding: 10px 12px;
        font-size: 14px;
        border-left: none;
        border-bottom: 3px solid ${({ active, theme }) => active ? theme.primary : 'transparent'};
        text-align: center;
        justify-content: center;
    }
`;

const TabIcon = styled.div`
    display: flex;
    align-items: center;
    margin-right: 12px;

    @media (max-width: 960px) {
        margin-right: 6px;
    }
`;

const TabContent = styled(motion.div)`
    flex: 1;
    max-width: 700px;

    @media (max-width: 960px) {
        width: 100%;
        max-width: 600px;
    }
`;

const CardContainer = styled(motion.div)`
    padding: 10px;
`;

// Animation variants for tab content
const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.3
        }
    }
};

const Education = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { data: education = [], loading } = useContent('education');

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <Container id="education">
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                <SectionHeadingWrapper>
                    <SectionLabel>Academic Background</SectionLabel>
                    <SectionTitle>Education</SectionTitle>
                </SectionHeadingWrapper>
                <SectionDesc>
                    My academic journey has been a foundation for my career in technology.
                    Here are the educational experiences that have shaped my knowledge and skills.
                </SectionDesc>
                </motion.div>

                <EducationContainer>
                    <TabsContainer numTabs={education.length}>
                        {education.map((edu, index) => (
                            <Tab
                                key={index}
                                active={activeTab === index}
                                onClick={() => handleTabClick(index)}
                            >
                                <TabIcon>
                                    {edu.degree?.toLowerCase().includes('bachelor') ||
                                    edu.degree?.toLowerCase().includes('master') ?
                                        <FaGraduationCap /> : <FaSchool />}
                                </TabIcon>
                                {(edu.school || '').split(',')[0]}
                                {activeTab === index && <FaAngleRight style={{ marginLeft: 'auto' }} />}
                            </Tab>
                        ))}
                    </TabsContainer>

                    <TabContent
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                    >
                        <CardContainer>
                            {!loading && education[activeTab] && (
                              <EducationCard education={education[activeTab]} />
                            )}
                        </CardContainer>
                    </TabContent>
                </EducationContainer>
            </Wrapper>
        </Container>
    );
};

export default Education;

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { education } from '../../data/constants';
import { motion } from 'framer-motion';
import EducationCard from '../Cards/EducationCard';
import { FaGraduationCap, FaAngleRight, FaSchool } from 'react-icons/fa';

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

const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    animation: ${fadeIn} 0.5s ease-in-out;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 36px;
    }
`;

const Desc = styled.p`
    font-size: 18px;
    text-align: center;
    max-width: 700px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.5;
    margin-bottom: 40px;
    animation: ${fadeIn} 0.5s ease-in-out 0.2s;
    animation-fill-mode: both;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 30px;
        padding: 0 16px;
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
    transition: all 0.3s ease-in-out;

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

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <Container id="education">
            <Wrapper>
                <Title>Education</Title>
                <Desc>
                    My academic journey has been a foundation for my career in technology.
                    Here are the educational experiences that have shaped my knowledge and skills.
                </Desc>

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
                                {edu.school.split(',')[0]} {/* Display only the school name without city */}
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
                            <EducationCard education={education[activeTab]} />
                        </CardContainer>
                    </TabContent>
                </EducationContainer>
            </Wrapper>
        </Container>
    );
};

export default Education;
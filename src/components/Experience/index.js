import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import ExperienceCard from '../Cards/ExperienceCard';
import {experiences} from '../../data/constants';
import {motion} from 'framer-motion';
import {FaAngleRight, FaAppStore, FaBriefcase, FaCog, FaGithub, FaGlobe, FaGooglePlay} from 'react-icons/fa';

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
    color: ${({theme}) => theme.text_secondary};
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

const ExperienceContainer = styled.div`
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
    border-right: 1px solid ${({theme}) => `${theme.text_primary}20`};

    @media (max-width: 960px) {
    width: 100%;
        max-width: 600px;
        border-right: none;
        border-bottom: 1px solid ${({theme}) => `${theme.text_primary}20`};
        margin-bottom: 20px;
        overflow-x: auto;
        padding-bottom: 10px;
        display: grid;
        grid-template-columns: repeat(${({numTabs}) => numTabs}, 1fr);
        gap: 8px;
    }
`;

const Tab = styled.div`
    padding: 16px 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 16px;
    color: ${({active, theme}) => active ? theme.primary : theme.text_secondary};
    border-left: 3px solid ${({active, theme}) => active ? theme.primary : 'transparent'};
    background-color: ${({active, theme}) => active ? `${theme.primary}10` : 'transparent'};
    transition: all 0.3s ease-in-out;

    &:hover {
        color: ${({theme}) => theme.primary};
        background-color: ${({theme}) => `${theme.primary}10`};
    }

    @media (max-width: 960px) {
        padding: 10px 12px;
        font-size: 14px;
        border-left: none;
        border-bottom: 3px solid ${({active, theme}) => active ? theme.primary : 'transparent'};
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
    hidden: {opacity: 0, x: 20},
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


const Experience = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentExperience, setCurrentExperience] = useState(experiences[0]);


    // For managing additional resources
    const [resources, setResources] = useState([]);

    // Load resources when tab changes
    React.useEffect(() => {
        if (experiences[activeTab]?.additionalResources) {
            setResources(
                experiences[activeTab].additionalResources.map(resource => ({
                    type: getResourceType(resource),
                    title: resource.title,
                    url: resource.url
                }))
            );
        } else {
            setResources([]);
        }
    }, [activeTab]);

    // Helper to determine resource type from icon
    const getResourceType = (resource) => {
        const icon = resource.icon?.type?.name;
        if (icon === "FaGooglePlay") return "playstore";
        if (icon === "FaAppStore") return "appstore";
        if (icon === "FaGithub") return "github";
        return "website";
    };

    // Get icon component based on resource type
    const getIconForType = (type) => {
        switch (type) {
            case "playstore":
                return <FaGooglePlay size={14}/>;
            case "appstore":
                return <FaAppStore size={14}/>;
            case "github":
                return <FaGithub size={14}/>;
            default:
                return <FaGlobe size={14}/>;
        }
    };


    const handleTabClick = (index) => {
        setActiveTab(index);
        setCurrentExperience(experiences[index]);
    };

    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <Desc>
                    My professional journey as a software engineer, working with different companies and on various
                    projects.
                    These experiences have helped me grow and develop my skills in different technologies and
                    environments.
                </Desc>

                <ExperienceContainer>
                    <TabsContainer numTabs={experiences.length}>
                        {experiences.map((experience, index) => (
                            <Tab
                                key={index}
                                active={activeTab === index}
                                onClick={() => handleTabClick(index)}
                            >
                                <TabIcon>
                                    <FaBriefcase/>
                                </TabIcon>
                                {experience.company}
                                {activeTab === index && <FaAngleRight style={{marginLeft: 'auto'}}/>}
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
                            <ExperienceCard experience={currentExperience}/>
                        </CardContainer>
                    </TabContent>
                </ExperienceContainer>
            </Wrapper>
        </Container>
    );
};

export default Experience;
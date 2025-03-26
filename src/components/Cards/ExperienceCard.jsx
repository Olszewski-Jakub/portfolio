import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaGooglePlay, FaAppStore, FaGithub, FaGlobe } from 'react-icons/fa';

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

const Card = styled(motion.div)`
    width: 100%;
    border-radius: 16px;
    padding: 20px 30px;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => `${theme.primary}30`};
    animation: ${fadeIn} 0.5s ease-in-out;

    &:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        transform: translateY(-5px);
        border: 1px solid ${({ theme }) => theme.primary};
    }

    @media (max-width: 768px) {
        padding: 16px;
        gap: 8px;
    }
`;

const Top = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 16px;
    }
`;

const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
`;

const ImageContainer = styled.div`
    height: 80px;
    width: 80px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`;

const Image = styled.img`
    height: 80%;
    width: 80%;
    object-fit: contain;
`;

const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Role = styled.h3`
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Company = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const CompanyLink = styled.a`
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;

    &:hover {
        text-decoration: underline;
        transform: translateY(-2px);
    }
`;

const Duration = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 4px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Description = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 'dd'};
    margin: 8px 0;
    line-height: 1.6;

    @media (max-width: 768px) {
        font-size: 14px;
        margin: 6px 0;
    }
`;

const Skills = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
`;

const SkillsTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const Skill = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}20`};
    padding: 6px 14px;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => `${theme.primary}40`};
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 4px 10px;
    }
`;

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    gap: 12px;
`;

const ResourcesTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ResourcesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ResourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => `${theme.primary}15`};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => `${theme.primary}30`};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 10px;
  }
`;

const ExperienceCard = ({ experience }) => {
    return (
        <Card>
            <Top>
                <ImageContainer>
                    <Image src={experience.img} alt={experience.company} />
                </ImageContainer>

                <Body>
                    <Role>{experience.role}</Role>
                    <Company>
                        {experience.companyUrl ? (
                            <CompanyLink
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {experience.company}
                                <FaExternalLinkAlt size={12} />
                            </CompanyLink>
                        ) : (
                            experience.company
                        )}
                    </Company>

                    <CompanyInfo>
                        <Duration>
                            <FaCalendarAlt size={14} />
                            {experience.date}
                        </Duration>

                        {experience.location && (
                            <Duration style={{ marginLeft: '12px' }}>
                                <FaMapMarkerAlt size={14} />
                                {experience.location}
                            </Duration>
                        )}
                    </CompanyInfo>
                </Body>
            </Top>

            <Description>
                {experience?.desc
                    ? <div dangerouslySetInnerHTML={{ __html: experience?.desc.replace(/\n/g, '<br />') }} />
                    : <div>No description available</div>
                }
            </Description>

            {experience?.skills && (
                <Skills>
                    <SkillsTitle>Technologies & Skills:</SkillsTitle>
                    <SkillsList>
                        {experience?.skills?.map((skill, index) => (
                            <Skill key={index}>{skill}</Skill>
                        ))}
                    </SkillsList>
                </Skills>
            )}

            {experience?.additionalResources && experience.additionalResources.length > 0 && (
                <ResourcesContainer>
                    <ResourcesTitle>Additional Resources:</ResourcesTitle>
                    <ResourcesList>
                        {experience.additionalResources.map((resource, index) => (
                            <ResourceLink
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {resource.icon && resource.icon}
                                {resource.title}
                            </ResourceLink>
                        ))}
                    </ResourcesList>
                </ResourcesContainer>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
                {experience.doc && (
                    <ResourceLink href={experience.doc} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={12} />
                        View Certificate
                    </ResourceLink>
                )}

                {experience.pdf && (
                    <ResourceLink href={experience.pdf} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={12} />
                        View PDF
                    </ResourceLink>
                )}

                {experience.additionalImage && (
                    <ResourceLink
                        href={experience.additionalImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(experience.additionalImage, '_blank', 'width=800,height=600');
                        }}
                    >
                        <FaExternalLinkAlt size={12} />
                        View Project Image
                    </ResourceLink>
                )}
            </div>
        </Card>
    );
};

export default ExperienceCard;
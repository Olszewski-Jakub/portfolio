import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaGraduationCap, FaAward, FaMapMarkerAlt, FaLink } from 'react-icons/fa';

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

const LogoContainer = styled.div`
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

const Logo = styled.img`
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

const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Degree = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 4px;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const DateInfo = styled(InfoItem)``;
const LocationInfo = styled(InfoItem)``;

const GradeContainer = styled.div`
    margin-top: 8px;
    padding: 10px 16px;
    background-color: ${({ theme }) => `${theme.primary}10`};
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
`;

const GradeLabel = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

const GradeValue = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};

    @media (max-width: 768px) {
        font-size: 13px;
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

const WebsiteLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    margin-top: 8px;

    &:hover {
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

const EducationCard = ({ education }) => {
    // Extract city from the school name if it contains a comma
    const schoolParts = education.school.split(',');
    const schoolName = schoolParts[0];
    const schoolLocation = schoolParts.length > 1 ? schoolParts.slice(1).join(',').trim() : '';

    return (
        <Card>
            <Top>
                <LogoContainer>
                    <Logo src={education.img} alt={education.school} />
                </LogoContainer>

                <Body>
                    <Title>{schoolName}</Title>
                    <Degree>
                        <FaGraduationCap size={16} />
                        {education.degree}
                    </Degree>

                    <InfoContainer>
                        <DateInfo>
                            <FaCalendarAlt size={14} />
                            {education.date}
                        </DateInfo>

                        {schoolLocation && (
                            <LocationInfo>
                                <FaMapMarkerAlt size={14} />
                                {schoolLocation}
                            </LocationInfo>
                        )}
                    </InfoContainer>
                </Body>
            </Top>

            {education.grade && (
                <GradeContainer>
                    <FaAward size={16} color="#854CE6" />
                    <GradeLabel>Achievement:</GradeLabel>
                    <GradeValue>{education.grade}</GradeValue>
                </GradeContainer>
            )}

            <Description>{education.desc}</Description>

            {education.website && (
                <WebsiteLink href={education.website} target="_blank" rel="noopener noreferrer">
                    <FaLink size={14} />
                    Visit School Website
                </WebsiteLink>
            )}
        </Card>
    );
};

export default EducationCard;
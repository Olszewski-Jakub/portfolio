import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { certificates } from '../../data/constants';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaFilter, FaTimes } from 'react-icons/fa';

const CertificateDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: ${({ hasScore }) => hasScore ? '4px' : '8px'};
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

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
    max-width: 1350px;
    padding: 0px 0px 80px 0;
    gap: 12px;

    @media (max-width: 960px) {
        flex-direction: column;
        padding: 0px 0px 60px 0;
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

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    margin-bottom: 40px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin-bottom: 30px;
    }
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: ${({ active, theme }) => active ? theme.primary : `${theme.card_light}`};
    color: ${({ active, theme }) => active ? theme.white : theme.text_primary};
    border: 1px solid ${({ active, theme }) => active ? theme.primary : `${theme.text_primary}30`};
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ active, theme }) => active ? theme.primary : `${theme.primary}20`};
        transform: translateY(-3px);
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 8px 12px;
    }
`;

const ClearFilterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    background: transparent;
    color: ${({ theme }) => theme.text_secondary};
    border: 1px solid ${({ theme }) => `${theme.text_secondary}50`};
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.text_primary};
        border-color: ${({ theme }) => theme.text_primary};
        transform: translateY(-3px);
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 8px 12px;
    }
`;

const CertificatesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
    padding: 0 16px;

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
    }
`;

const CertificateCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    border: 1px solid ${({ theme }) => `${theme.primary}20`};
    height: 100%;

    &:hover {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
        border: 1px solid ${({ theme }) => theme.primary};
    }
`;

const CertificateImageContainer = styled.div`
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
`;

const CertificateImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    ${CertificateCard}:hover & {
        transform: scale(1.05);
    }
`;

const CertificateImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
    display: flex;
    align-items: flex-end;
    padding: 16px;
`;

const CertificateIssuer = styled.div`
    color: white;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 10px;
    border-radius: 20px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const CertificateDetails = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
`;

const CertificateTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 4px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const CertificateScore = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    margin-top: 4px;

    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

const CertificateCategory = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    background: ${({ theme }) => theme.primary};
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    z-index: 2;

    @media (max-width: 768px) {
        font-size: 11px;
        padding: 3px 8px;
    }
`;

const ViewCertificateButton = styled.a`
    background: ${({ theme }) => theme.card_light};
    color: ${({ theme }) => theme.text_primary};
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: auto;

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
    }

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 8px 14px;
    }
`;

const EmptyStateContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    gap: 16px;
`;

const EmptyStateIcon = styled.div`
    font-size: 60px;
    color: ${({ theme }) => `${theme.text_secondary}50`};
`;

const EmptyStateText = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    max-width: 500px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

// Animation variants for cards
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Certificates = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Extract unique categories from certificates
    const categories = ['all', ...new Set(certificates.map(cert => cert.category))];

    // Filter certificates based on selected category
    const filteredCertificates = activeFilter === 'all'
        ? certificates
        : certificates.filter(cert => cert.category === activeFilter);

    return (
        <Container id="certificates">
            <Wrapper>
                <Title>Certificates</Title>
                <Desc>
                    Professional certifications and achievements that showcase my expertise and continuous learning.
                </Desc>

                <FilterContainer>
                    <FaFilter size={16} style={{ color: '#777', marginRight: '8px' }} />

                    {categories.map((category, index) => (
                        <FilterButton
                            key={index}
                            active={activeFilter === category}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </FilterButton>
                    ))}

                    {activeFilter !== 'all' && (
                        <ClearFilterButton onClick={() => setActiveFilter('all')}>
                            <FaTimes size={12} />
                            Clear Filter
                        </ClearFilterButton>
                    )}
                </FilterContainer>

                {filteredCertificates.length > 0 ? (
                    <CertificatesGrid
                        as={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredCertificates.map((certificate, index) => (
                            <CertificateCard
                                key={index}
                                variants={cardVariants}
                            >
                                <CertificateCategory>
                                    {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
                                </CertificateCategory>

                                <CertificateImageContainer>
                                    <CertificateImage src={certificate.image} alt={certificate.title} />
                                    <CertificateImageOverlay>
                                        <CertificateIssuer>
                                            <FaCertificate size={14} />
                                            {certificate.issuer}
                                        </CertificateIssuer>
                                    </CertificateImageOverlay>
                                </CertificateImageContainer>

                                <CertificateDetails>
                                    <div>
                                        <CertificateTitle>{certificate.title}</CertificateTitle>
                                        <CertificateDate hasScore={certificate.score}>{certificate.date}</CertificateDate>
                                        {certificate.score && (
                                            <CertificateScore>{certificate.score}</CertificateScore>
                                        )}
                                    </div>
                                    {certificate.url && (
                                        <ViewCertificateButton
                                            href={certificate.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Certificate
                                            <FaExternalLinkAlt size={14} />
                                        </ViewCertificateButton>
                                    )}

                                </CertificateDetails>
                            </CertificateCard>
                        ))}
                    </CertificatesGrid>
                ) : (
                    <EmptyStateContainer>
                        <EmptyStateIcon>
                            <FaCertificate />
                        </EmptyStateIcon>
                        <EmptyStateText>
                            No certificates found in this category. Try selecting a different category.
                        </EmptyStateText>
                    </EmptyStateContainer>
                )}
            </Wrapper>
        </Container>
    );
};

export default Certificates;
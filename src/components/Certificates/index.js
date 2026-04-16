import React, { useState } from 'react';
import styled from 'styled-components';
import useContent from '../../hooks/useContent';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from '../SectionTitle';

const CertificateDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: ${({ hasScore }) => hasScore ? '4px' : '8px'};
  
  @media (max-width: 768px) {
    font-size: 13px;
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
    background: ${({ theme }) => theme.card_light};

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


const FilterRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin: 32px 0 40px;
`;

const FilterChip = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 0.4px;
    cursor: pointer;
    border: 1.5px solid ${({ active, theme }) => active ? theme.primary : `${theme.text_primary}25`};
    background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
    color: ${({ active, theme }) => active ? '#fff' : theme.text_secondary};
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        border-color: ${({ theme }) => theme.primary};
        color: ${({ active, theme }) => active ? '#fff' : theme.primary};
        transform: translateY(-2px);
        box-shadow: ${({ active }) => active
            ? '0 6px 18px rgba(47,129,247,0.35)'
            : '0 4px 12px rgba(47,129,247,0.12)'};
    }

    @media (max-width: 480px) {
        padding: 7px 14px;
        font-size: 12px;
    }
`;

const FilterCount = styled.span`
    background: ${({ active, theme }) => active ? 'rgba(255,255,255,0.25)' : `${theme.primary}18`};
    color: ${({ active, theme }) => active ? '#fff' : theme.primary};
    border-radius: 50px;
    padding: 0 7px;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.6;
    min-width: 20px;
    text-align: center;
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
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, border-color 0.25s ease-in-out;
    position: relative;
    border: 1px solid ${({ theme }) => `${theme.primary}20`};
    height: 100%;

    &:hover {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
        border-color: ${({ theme }) => theme.primary};
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
    border-radius: 50px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
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

const humanLabel = (cat) => cat === 'all' ? 'All' : (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : cat);

const Certificates = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { data: certificates = [], loading } = useContent('certificates');

    const allCerts = certificates || [];
    const categories = ['all', ...new Set(allCerts.map(cert => cert.category).filter(Boolean))];

    const countFor = (cat) => cat === 'all' ? allCerts.length : allCerts.filter(c => c.category === cat).length;

    const filteredCertificates = activeFilter === 'all'
        ? allCerts
        : allCerts.filter(cert => cert.category === activeFilter);

    return (
        <Container id="certificates">
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                <SectionHeadingWrapper>
                    <SectionLabel>Achievements</SectionLabel>
                    <SectionTitle>Certificates</SectionTitle>
                </SectionHeadingWrapper>
                <SectionDesc>
                    Professional certifications and achievements that showcase my expertise and continuous learning.
                </SectionDesc>
                </motion.div>

                <FilterRow>
                    {categories.map((category) => (
                        <FilterChip
                            key={category}
                            active={activeFilter === category}
                            onClick={() => setActiveFilter(category)}
                        >
                            {humanLabel(category)}
                            <FilterCount active={activeFilter === category}>{countFor(category)}</FilterCount>
                        </FilterChip>
                    ))}
                </FilterRow>

                {!loading && filteredCertificates.length > 0 ? (
                    <CertificatesGrid>
                        <AnimatePresence mode="popLayout">
                        {filteredCertificates.map((certificate, index) => (
                            <CertificateCard
                                key={`${activeFilter}-${certificate.title || index}`}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.25, delay: index * 0.04 }}
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
                        </AnimatePresence>
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

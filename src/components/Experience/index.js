import React from 'react';
import styled from 'styled-components';
import ExperienceCard from '../Cards/ExperienceCard';
import useContent from '../../hooks/useContent';
import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, SectionDesc, SectionHeadingWrapper } from '../SectionTitle';

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
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    padding: 0 20px;
    gap: 0;
`;

/* ── Timeline ── */

const Timeline = styled.div`
    position: relative;
    width: 100%;
    padding: 48px 0 0;

    /* Vertical centre line */
    &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        background: linear-gradient(
            to bottom,
            transparent,
            ${({ theme }) => theme.primary}70 6%,
            ${({ theme }) => theme.primary}70 94%,
            transparent
        );
    }

    @media (max-width: 768px) {
        padding-left: 40px;
        &::before {
            left: 16px;
            transform: none;
        }
    }
`;

const TimelineEntry = styled.div`
    display: flex;
    justify-content: ${({ $isLeft }) => ($isLeft ? 'flex-end' : 'flex-start')};
    padding-bottom: 60px;
    position: relative;

    @media (max-width: 768px) {
        justify-content: flex-start;
        padding-bottom: 40px;
    }
`;

const EntryCard = styled(motion.div)`
    width: calc(50% - 52px);

    @media (max-width: 768px) {
        width: 100%;
    }
`;

/* Glowing dot on the timeline */
const Dot = styled.div`
    position: absolute;
    left: 50%;
    top: 30px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    border: 3px solid ${({ theme }) => theme.card_light};
    box-shadow:
        0 0 0 4px ${({ theme }) => `${theme.primary}35`},
        0 0 20px ${({ theme }) => `${theme.primary}50`};
    transform: translateX(-50%);
    z-index: 2;

    @media (max-width: 768px) {
        left: 16px;
    }
`;

/* Horizontal connector line from dot to card */
const Connector = styled.div`
    position: absolute;
    top: 37px;
    height: 2px;
    width: 36px;
    background: ${({ theme }) => `${theme.primary}50`};
    ${({ $isLeft }) => $isLeft ? 'left: calc(50% + 16px);' : 'right: calc(50% + 16px);'}

    @media (max-width: 768px) {
        display: none;
    }
`;

const Experience = () => {
    const { data: experiences = [], loading } = useContent('experience');

    return (
        <Container id="experience">
            <Wrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                    <SectionHeadingWrapper>
                        <SectionLabel>My Journey</SectionLabel>
                        <SectionTitle>Experience</SectionTitle>
                    </SectionHeadingWrapper>
                    <SectionDesc>
                        The roles and projects that have shaped my skills and perspective as a developer.
                    </SectionDesc>
                </motion.div>

                {!loading && experiences.length > 0 && (
                    <Timeline>
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <TimelineEntry key={index} $isLeft={isLeft}>
                                    <Dot />
                                    <Connector $isLeft={isLeft} />
                                    <EntryCard
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{
                                            duration: 0.55,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        <ExperienceCard experience={exp} />
                                    </EntryCard>
                                </TimelineEntry>
                            );
                        })}
                    </Timeline>
                )}
            </Wrapper>
        </Container>
    );
};

export default Experience;

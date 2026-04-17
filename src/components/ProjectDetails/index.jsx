import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaCalendarAlt,
    FaTag,
} from 'react-icons/fa';
import { Modal } from '@mui/material';
import useGithubContributors from '../../hooks/useGithubContributors';

/* ─── Backdrop ─── */

const Container = styled(motion.div)`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
`;

/* ─── Modal shell ─── */

const Wrapper = styled(motion.div)`
    max-width: 860px;
    width: 100%;
    margin: 40px auto 60px;
    background: ${({ theme }) => theme.card};
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(148, 163, 184, 0.1);
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.45);

    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.scrollbar.thumb};
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.scrollbar.thumbHover};
    }

    @media (max-width: 768px) {
        margin: 20px auto 40px;
        border-radius: 16px;
    }
`;

/* ─── Hero banner ─── */

const HeroBanner = styled.div`
    position: relative;
    width: 100%;
    height: 260px;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 768px) {
        height: 200px;
    }
`;

const HeroImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const HeroOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0,0,0,0.85) 0%,
        rgba(0,0,0,0.3) 55%,
        rgba(0,0,0,0.1) 100%
    );
`;

const HeroContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HeroTitle = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    margin: 0;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const HeroMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(0,0,0,0.45);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
    z-index: 10;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

    &:hover {
        background: rgba(0,0,0,0.7);
        transform: scale(1.08);
    }
`;

/* ─── Status & category badges ─── */

const StatusPill = styled.span`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 50px;
    color: ${({ status }) => {
        if (status === 'Deployed') return '#3dd391';
        if (status === 'Work in progress') return '#f39c12';
        return '#fff';
    }};
    background: ${({ status }) => {
        if (status === 'Deployed') return 'rgba(61,211,145,0.2)';
        if (status === 'Work in progress') return 'rgba(243,156,18,0.2)';
        return 'rgba(255,255,255,0.15)';
    }};
    border: 1px solid ${({ status }) => {
        if (status === 'Deployed') return 'rgba(61,211,145,0.4)';
        if (status === 'Work in progress') return 'rgba(243,156,18,0.4)';
        return 'rgba(255,255,255,0.25)';
    }};
    backdrop-filter: blur(4px);
`;

const CategoryPill = styled.span`
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 50px;
    color: rgba(255,255,255,0.9);
    background: rgba(47,129,247,0.3);
    border: 1px solid rgba(47,129,247,0.4);
    backdrop-filter: blur(4px);
    text-transform: capitalize;
`;

/* ─── Body ─── */

const Body = styled.div`
    padding: 24px 28px 100px;

    @media (max-width: 768px) {
        padding: 20px 18px 80px;
    }
`;

const BodyGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 24px;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
`;

/* ─── Tags ─── */

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
`;

const Tag = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}18`};
    border: 1px solid ${({ theme }) => `${theme.primary}30`};
    padding: 4px 12px;
    border-radius: 50px;
`;

/* ─── Description ─── */

const Description = styled.p`
    font-size: 15px;
    line-height: 1.75;
    color: ${({ theme }) => theme.text_primary + 'DD'};
    margin: 0 0 28px;
`;

/* ─── Section label ─── */

const SectionLabel = styled.h3`
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text_secondary};
    margin: 0 0 12px;
`;

/* ─── Team members ─── */

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    background: ${({ theme }) => theme.card_light};
    padding: 10px 14px;
    border-radius: 12px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
`;

const MemberAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => `${theme.primary}60`};
`;

const MemberName = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    flex: 1;
`;

const MemberLinks = styled.div`
    display: flex;
    gap: 8px;
`;

const MemberLink = styled.a`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }
`;

/* ─── Contributors ─── */

const ContributorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 8px;
    margin-bottom: 28px;
`;

const Contributor = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    background: ${({ theme }) => theme.card_light};
    border: 1px solid rgba(148, 163, 184, 0.1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 12px rgba(0,0,0,0.12);
        border-color: ${({ theme }) => `${theme.primary}40`};
    }
`;

const ContributorAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
`;

const ContributorName = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

/* ─── Aside / meta panel ─── */

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const MetaPanel = styled.div`
    background: ${({ theme }) => theme.card_light};
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
`;

const MetaLabel = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const MetaValue = styled.span`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 600;
    text-align: right;
`;

const MetaDivider = styled.div`
    height: 1px;
    background: ${({ theme }) => `${theme.text_primary}10`};
`;

/* ─── Buttons ─── */

const ButtonGroup = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 28px;
    display: flex;
    gap: 12px;
    background: ${({ theme }) => `${theme.card}F0`};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-top: 1px solid rgba(148, 163, 184, 0.1);

    @media (max-width: 768px) {
        padding: 12px 18px;
        flex-direction: column;
    }
`;

const Btn = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    flex: 1;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    @media (max-width: 768px) {
        flex: unset;
        width: 100%;
    }
`;

const GithubButton = styled(Btn)`
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 1.5px solid ${({ theme }) => `${theme.primary}60`};

    &:hover {
        background: ${({ theme }) => `${theme.primary}15`};
        border-color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        box-shadow: 0 6px 16px ${({ theme }) => `${theme.primary}25`};
    }
`;

const LiveButton = styled(Btn)`
    background: linear-gradient(135deg, #2F81F7, #0EA5E9);
    color: #fff;
    border: none;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(47,129,247,0.4);
    }
`;

/* ─── Component ─── */

const getLiveLabel = (category) => {
    if (category === 'android app') return 'Google Play';
    if (category === 'ios app') return 'App Store';
    if (category === 'web app') return 'Live Demo';
    return 'View Project';
};

const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;
    const { contributors } = useGithubContributors(project?.github, { limit: 12 });
    const imageSrc = project?.imageUrl || project?.image || '';
    const categoryStr = Array.isArray(project?.category) ? project.category.join(', ') : project?.category;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setOpenModal({ state: false, project: null });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setOpenModal]);

    const close = () => setOpenModal({ state: false, project: null });

    return (
        <Modal
            open={true}
            onClose={() => { setTimeout(() => { document.body.style.overflow = ''; }, 0); close(); }}
            aria-labelledby="project-details-modal"
            BackdropProps={{ timeout: 250 }}
            hideBackdrop
            disableScrollLock={true}
        >
            <Container
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={close}
            >
                <Wrapper
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 48 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Hero banner */}
                    <HeroBanner>
                        {imageSrc && <HeroImg src={imageSrc} alt={project?.title} />}
                        <HeroOverlay />
                        <CloseButton onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close">
                            <FaTimes size={16} />
                        </CloseButton>
                        <HeroContent>
                            <HeroMeta>
                                {project?.status && <StatusPill status={project.status}>{project.status}</StatusPill>}
                                {categoryStr && <CategoryPill>{categoryStr}</CategoryPill>}
                            </HeroMeta>
                            <HeroTitle>{project?.title}</HeroTitle>
                        </HeroContent>
                    </HeroBanner>

                    {/* Body */}
                    <Body>
                        <BodyGrid>
                            <Main>
                                {project?.tags?.length > 0 && (
                                    <TagRow>
                                        {project.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                                    </TagRow>
                                )}

                                {project?.description && (
                                    <Description>{project.description}</Description>
                                )}

                                {project?.member?.length > 0 && (
                                    <>
                                        <SectionLabel>Team Members</SectionLabel>
                                        <Members>
                                            {project.member.map((m, i) => (
                                                <Member key={i}>
                                                    <MemberAvatar src={m.img} alt={m.name} />
                                                    <MemberName>{m.name}</MemberName>
                                                    <MemberLinks>
                                                        {m.github && (
                                                            <MemberLink href={m.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                                <FaGithub />
                                                            </MemberLink>
                                                        )}
                                                        {m.linkedin && (
                                                            <MemberLink href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                                <FaExternalLinkAlt size={14} />
                                                            </MemberLink>
                                                        )}
                                                    </MemberLinks>
                                                </Member>
                                            ))}
                                        </Members>
                                    </>
                                )}

                                {contributors?.length > 0 && (
                                    <>
                                        <SectionLabel>Contributors</SectionLabel>
                                        <ContributorsGrid>
                                            {contributors.map((c) => (
                                                <Contributor key={c.id || c.login} href={c.html_url} target="_blank" rel="noopener noreferrer">
                                                    <ContributorAvatar src={c.avatar_url} alt={c.login} loading="lazy" />
                                                    <ContributorName>@{c.login}</ContributorName>
                                                </Contributor>
                                            ))}
                                        </ContributorsGrid>
                                    </>
                                )}
                            </Main>

                            <Aside>
                                <MetaPanel>
                                    {project?.date && (
                                        <>
                                            <MetaRow>
                                                <MetaLabel><FaCalendarAlt size={13} /> Date</MetaLabel>
                                                <MetaValue>{project.date}</MetaValue>
                                            </MetaRow>
                                            <MetaDivider />
                                        </>
                                    )}
                                    {categoryStr && (
                                        <>
                                            <MetaRow>
                                                <MetaLabel><FaTag size={13} /> Type</MetaLabel>
                                                <MetaValue style={{ textTransform: 'capitalize' }}>{categoryStr}</MetaValue>
                                            </MetaRow>
                                            <MetaDivider />
                                        </>
                                    )}
                                    {project?.status && (
                                        <MetaRow>
                                            <MetaLabel>Status</MetaLabel>
                                            <MetaValue>{project.status}</MetaValue>
                                        </MetaRow>
                                    )}
                                </MetaPanel>
                            </Aside>
                        </BodyGrid>
                    </Body>

                    {/* Sticky action buttons */}
                    <ButtonGroup>
                        {project?.github && (
                            <GithubButton href={project.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub size={17} />
                                View Code
                            </GithubButton>
                        )}
                        {project?.webapp !== undefined && (
                            <LiveButton
                                href={project.webapp || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    opacity: !project.webapp ? 0.45 : 1,
                                    pointerEvents: !project.webapp ? 'none' : 'all',
                                }}
                            >
                                <FaExternalLinkAlt size={15} />
                                {!project.webapp ? 'Not available' : getLiveLabel(project.category)}
                            </LiveButton>
                        )}
                    </ButtonGroup>
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default ProjectDetails;

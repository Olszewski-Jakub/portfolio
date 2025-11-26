import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaTimes,
    FaCalendarAlt,
    FaTag,
    FaUsers
} from 'react-icons/fa';
import { Modal } from '@mui/material';
import useGithubContributors from '../../hooks/useGithubContributors';

// Animations
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

// Styled Components
const Container = styled.div`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto; /* Modal content scrolls when taller than viewport */
    z-index: 1000;
    animation: ${fadeIn} 0.25s ease-in-out;
    background: radial-gradient(1200px 600px at 10% -10%, rgba(2, 6, 23, 0.35), transparent),
                radial-gradient(1200px 600px at 110% 110%, rgba(2, 6, 23, 0.35), transparent),
                rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
`;

const Wrapper = styled.div`
    max-width: 880px;
    width: 100%;
    max-height: 90vh; /* Keep header/footer visible */
    overflow-y: auto; /* Scroll inside the dialog */
    border-radius: 16px;
    margin: 40px auto;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 28px 28px 96px; /* extra bottom space for sticky actions */
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid rgba(148, 163, 184, 0.12);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    animation: ${slideUp} 0.35s ease-in-out;

    @media (max-width: 768px) {
        padding: 18px 18px 22px;
        margin: 20px auto;
        max-height: calc(100vh - 60px);
    }

    /* Smooth scrolling feel inside the dialog */
    scroll-behavior: smooth;

    /* Optional: subtle inner scrollbar style that uses theme tokens */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.scrollbar.thumb};
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.scrollbar.thumbHover};
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: ${({ theme }) => `${theme.white}12`};
    color: ${({ theme }) => theme.text_primary};
    border: 1px solid ${({ theme }) => `${theme.white}1F`};
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    z-index: 15;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);

    &:hover {
        background: ${({ theme }) => `${theme.primary}26`};
        color: ${({ theme }) => theme.white};
        transform: scale(1.06);
        border-color: ${({ theme }) => `${theme.primary}40`};
    }
`;

// New layout pieces
const Header = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px 16px;
    padding: 6px 0 12px;
    padding-right: 72px; /* reserve space for close button */
    margin-bottom: 16px;
    background: ${({ theme }) => `${theme.card}CC`};
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
    z-index: 3;
    flex-wrap: wrap;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    padding-bottom: 140px; /* reserve space so sticky actions never overlap content */

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding-bottom: 160px;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
`;

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PreviewCard = styled.div`
    background: ${({ theme }) => theme.card_light};
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0,0,0,0.25);
`;

const PreviewImage = styled.img`
    width: 100%;
    display: block;
    aspect-ratio: 16/9;
    object-fit: cover;
`;

const MetaPanel = styled.div`
    background: ${({ theme }) => theme.card_light};
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 0;

    @media only screen and (max-width: 768px) {
        font-size: 28px;
        margin: 6px 0;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
`;

const Date = styled(InfoItem)`
    color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
`;

const Tag = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}20`};
    padding: 6px 14px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => `${theme.primary}40`};
    }
`;

const StatusBadge = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme, status }) => {
        if (status === "Deployed") return "#3dd391";
        if (status === "Work in progress") return "#f39c12";
        return theme.primary;
    }};
    background-color: ${({ theme, status }) => {
        if (status === "Deployed") return "rgba(61, 211, 145, 0.15)";
        if (status === "Work in progress") return "rgba(243, 156, 18, 0.15)";
        return `${theme.primary}20`;
    }};
    padding: 6px 14px;
    border-radius: 8px;
    display: inline-block;
    margin-bottom: 16px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.7;
    margin: 16px 0 24px;

    @media only screen and (max-width: 768px) {
        font-size: 15px;
        margin: 12px 0 20px;
    }
`;

const Label = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 24px 0 12px;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
        margin: 20px 0 10px;
    }
`;

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 16px 0 24px;
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: ${({ theme }) => theme.card_light};
    padding: 12px 16px;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }
`;

const MemberImage = styled.img`
    width: 46px;
    height: 46px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    @media only screen and (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const MemberName = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};

    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

const MemberLinks = styled.div`
    display: flex;
    gap: 8px;
    margin-left: auto;
`;

const MemberLink = styled.a`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 18px;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }
`;

// Contributors styles
const Contributors = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 16px 0 24px;
`;

const ContributorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px;
`;

const Contributor = styled.a`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    color: inherit;
    background: ${({ theme }) => theme.card_light};
    border: 1px solid rgba(148, 163, 184, 0.12);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.12);
        border-color: ${({ theme }) => theme.primary};
    }
`;

const ContributorAvatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
`;

const ContributorName = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`;

const ButtonGroup = styled.div`
    position: sticky;
    bottom: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    width: fit-content;
    margin-left: auto;
    z-index: 5;

    @media only screen and (max-width: 768px) {
        position: static;
        width: 100%;
        margin-top: 16px;
        gap: 10px;
        flex-direction: column;
    }
`;

const Button = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 18px;
    height: 46px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);

    @media only screen and (max-width: 768px) {
        height: 44px;
        padding: 10px 16px;
        font-size: 14px;
        width: 100%;
    }
`;

const GithubButton = styled(Button)`
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 1.5px solid ${({ theme }) => theme.primary};

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
        transform: translateY(-2px);
        box-shadow: 0 10px 20px ${({ theme }) => `${theme.primary}40`};
    }
`;

const LiveButton = styled(Button)`
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    border: 1.5px solid ${({ theme }) => `${theme.primary}CC`};

    &:hover {
        background: ${({ theme }) => `${theme.primary}E6`};
        transform: translateY(-2px);
        box-shadow: 0 12px 24px ${({ theme }) => `${theme.primary}40`};
    }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;
    const { contributors } = useGithubContributors(project?.github, { limit: 12 });

    // Close modal with ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpenModal({ state: false, project: null });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setOpenModal]);

    // We will not manipulate body scroll in the component
    // This prevents conflicts with MUI's own scroll handling

    return (
        <Modal
            open={true}
            onClose={() => {
                // Explicitly reset body overflow when modal closes
                setTimeout(() => {
                    document.body.style.overflow = '';
                }, 0);
                setOpenModal({ state: false, project: null });
            }}
            aria-labelledby="project-details-modal"
            BackdropProps={{ timeout: 250 }}
            hideBackdrop
            disableScrollLock={true}
        >
            <Container onClick={() => setOpenModal({ state: false, project: null })}>
                <Wrapper onClick={(e) => e.stopPropagation()}>
                    <CloseButton
                        onClick={(e) => { e.stopPropagation(); setOpenModal({ state: false, project: null }); }}
                        aria-label="Close modal"
                    >
                        <FaTimes />
                    </CloseButton>

                    <Header>
                        <Title>{project?.title}</Title>
                        <InfoContainer>
                            <Date>
                                <FaCalendarAlt size={18} />
                                {project?.date}
                            </Date>
                            <StatusBadge status={project?.status}>
                                <FaTag size={14} style={{ marginRight: '6px' }} />
                                {project?.status}
                            </StatusBadge>
                        </InfoContainer>
                    </Header>

                    <Content>
                        <Main>
                            <Tags>
                                {project?.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </Tags>

                            <Description>{project?.description}</Description>

                            {project?.member && (
                                <>
                                    <Label>Team Members</Label>
                                    <Members>
                                        {project?.member.map((member, index) => (
                                            <Member key={index}>
                                                <MemberImage src={member.img} alt={member.name} />
                                                <MemberInfo>
                                                    <MemberName>{member.name}</MemberName>
                                                </MemberInfo>
                                                <MemberLinks>
                                                    <MemberLink
                                                        href={member.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="GitHub"
                                                    >
                                                        <FaGithub />
                                                    </MemberLink>
                                                    <MemberLink
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label="LinkedIn"
                                                    >
                                                        <FaExternalLinkAlt size={16} />
                                                    </MemberLink>
                                                </MemberLinks>
                                            </Member>
                                        ))}
                                    </Members>
                                </>
                            )}

                            {project?.github && contributors && contributors.length > 0 && (
                                <>
                                    <Label>Contributors</Label>
                                    <Contributors>
                                        <ContributorsGrid>
                                            {contributors.map((c) => (
                                                <Contributor
                                                    key={c.id || c.login}
                                                    href={c.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`@${c.login}`}
                                                >
                                                    <ContributorAvatar src={c.avatar_url} alt={c.login} loading="lazy" />
                                                    <ContributorName>@{c.login}</ContributorName>
                                                </Contributor>
                                            ))}
                                        </ContributorsGrid>
                                    </Contributors>
                                </>
                            )}
                        </Main>

                        <Aside>
                            {(() => {
                                const previewSrc = project?.imageUrl || project?.image || '';
                                return previewSrc ? (
                                    <PreviewCard>
                                        <PreviewImage src={previewSrc} alt={project?.title} loading="lazy" />
                                    </PreviewCard>
                                ) : null;
                            })()}
                            <MetaPanel>
                                <MetaRow>
                                    <span>Category</span>
                                    <span style={{ color: 'inherit' }}>
                                        {Array.isArray(project?.category) ? project?.category?.join(', ') : project?.category}
                                    </span>
                                </MetaRow>
                                {project?.date && (
                                    <MetaRow>
                                        <span>Date</span>
                                        <span style={{ color: 'inherit' }}>{project?.date}</span>
                                    </MetaRow>
                                )}
                                {project?.status && (
                                    <MetaRow>
                                        <span>Status</span>
                                        <span style={{ color: 'inherit' }}>{project?.status}</span>
                                    </MetaRow>
                                )}
                            </MetaPanel>
                        </Aside>
                    </Content>

                    <ButtonGroup>
                        <GithubButton href={project?.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} />
                            View Code
                        </GithubButton>

                        <LiveButton
                            href={project?.webapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                opacity: project?.webapp === "" ? 0.5 : 1,
                                pointerEvents: project?.webapp === "" ? "none" : "all",
                            }}
                        >
                            <FaExternalLinkAlt size={18} />
                            {
                                project?.webapp === ""
                                    ? 'Project not available'
                                    : project?.category === "android app"
                                        ? 'Google Play'
                                        : project?.category === "ios app"
                                            ? 'App Store'
                                            : project?.category === "web app"
                                                ? 'Live Demo'
                                                : 'View Project'
                            }
                        </LiveButton>
                    </ButtonGroup>
                </Wrapper>
            </Container>
        </Modal>
    );
};

export default ProjectDetails;

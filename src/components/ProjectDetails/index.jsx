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
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    transition: all 0.5s ease;
    padding: 20px;
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease-in-out;

    /* This helps prevent scrollbars getting stuck */
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
`;

const Wrapper = styled.div`
    max-width: 800px;
    width: 100%;
    border-radius: 16px;
    margin: 30px auto;
    height: min-content;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
    animation: ${slideUp} 0.5s ease-in-out;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: ${({ theme }) => theme.card_light};
    color: ${({ theme }) => theme.text_secondary};
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    z-index: 10;

    &:hover {
        color: ${({ theme }) => theme.text_primary};
        background: ${({ theme }) => theme.bgLight};
        transform: scale(1.1);
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 30px;
    max-height: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 24px 0 0;
    gap: 16px;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
`;

const Button = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;

    @media only screen and (max-width: 768px) {
        padding: 12px 20px;
        font-size: 14px;
    }
`;

const GithubButton = styled(Button)`
    background-color: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};

    &:hover {
        background-color: ${({ theme }) => `${theme.bgLight}CC`};
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
`;

const LiveButton = styled(Button)`
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};

    &:hover {
        background-color: ${({ theme }) => `${theme.primary}E6`};
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(133, 76, 230, 0.25);
    }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;

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
            BackdropProps={{
                timeout: 500,
            }}
            disableScrollLock={true}
        >
            <Container>
                <Wrapper>
                    <CloseButton
                        onClick={() => setOpenModal({ state: false, project: null })}
                        aria-label="Close modal"
                    >
                        <FaTimes />
                    </CloseButton>

                    <Image src={project?.image} alt={project?.title} />

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
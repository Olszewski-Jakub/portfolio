import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import ExperienceCard from '../Cards/ExperienceCard';
import useContent from '../../hooks/useContent';
import { SectionLabel, SectionTitle, SectionHeadingWrapper } from '../SectionTitle';
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

/* ── Mobile detection ── */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 860px)');
        setIsMobile(mq.matches);
        const handler = e => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return isMobile;
};

/* ── Shared wrapper ── */
const Outer = styled.div`
    background: ${({ theme }) => theme.card_light};
    position: relative;
`;

/* ── Desktop horizontal scroll ── */

const ScrollSpace = styled.div`
    height: ${({ $count }) => $count * 100}vh;
    position: relative;
`;

const NAVBAR_H = 80;

const StickyWrap = styled.div`
    position: sticky;
    top: ${NAVBAR_H}px;
    height: calc(100vh - ${NAVBAR_H}px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ProgressTrack = styled.div`
    height: 3px;
    background: ${({ theme }) => `${theme.primary}18`};
    flex-shrink: 0;
`;

const ProgressFill = styled(motion.div)`
    height: 100%;
    background: linear-gradient(90deg, #2F81F7, #0EA5E9);
    transform-origin: left;
`;

const HeaderArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 20px 6px;
    flex-shrink: 0;
`;

const Track = styled(motion.div)`
    display: flex;
    flex: 1;
    min-height: 0;
    width: ${({ $count }) => $count * 100}vw;
    will-change: transform;
`;

const Panel = styled.div`
    flex: 0 0 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    box-sizing: border-box;
`;

const PanelInner = styled.div`
    max-width: 1100px;
    width: 100%;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 64px;
    align-items: start;
    max-height: calc(100vh - 180px);
`;

const Left = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 8px;
`;

const IndexWatermark = styled.div`
    position: absolute;
    top: -24px;
    left: -16px;
    font-size: 120px;
    font-weight: 900;
    line-height: 1;
    color: ${({ theme }) => theme.primary};
    opacity: 0.06;
    pointer-events: none;
    user-select: none;
    letter-spacing: -6px;
`;

const LogoBox = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 16px;
    background: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    overflow: hidden;
    flex-shrink: 0;
    margin-bottom: 4px;
`;

const Logo = styled.img`
    width: 76%;
    height: 76%;
    object-fit: contain;
`;

const Role = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.3;
`;

const CompanyName = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const CompanyLink = styled.a`
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: opacity 0.2s ease;

    &:hover { opacity: 0.75; }
`;

const MetaRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.text_secondary};
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 200px);
    padding-right: 4px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => `${theme.primary}30`};
        border-radius: 4px;
    }
`;

const Description = styled.div`
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.text_primary + 'dd'};
`;

const SkillsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SkillsLabel = styled.div`
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const SkillPill = styled.div`
    font-size: 13px;
    font-weight: 500;
    padding: 5px 13px;
    border-radius: 20px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}18`};
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
        background: ${({ theme }) => `${theme.primary}30`};
        transform: translateY(-1px);
    }
`;

const LinksRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const LinkBtn = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    padding: 7px 14px;
    border-radius: 8px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}15`};
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
        background: ${({ theme }) => `${theme.primary}28`};
        transform: translateY(-2px);
    }
`;

const NavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px 20px;
    flex-shrink: 0;
`;

const Dots = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const NavDot = styled.div`
    width: ${({ $active }) => ($active ? '24px' : '8px')};
    height: 8px;
    border-radius: 4px;
    background: ${({ theme, $active }) => $active ? theme.primary : `${theme.primary}30`};
    transition: width 0.3s ease, background-color 0.3s ease;
`;

const SlideCount = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    letter-spacing: 0.5px;
`;

const ScrollHint = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.7;
`;

const HintLine = styled.div`
    width: 32px;
    height: 2px;
    background: ${({ theme }) => `${theme.primary}50`};
    border-radius: 1px;
`;

/* ── Mobile fallback ── */
const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 16px 60px;
    gap: 0;
`;

const MobileWrapper = styled.div`
    width: 100%;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MobileTimeline = styled.div`
    position: relative;
    width: 100%;
    padding: 40px 0 0 40px;

    &::before {
        content: '';
        position: absolute;
        left: 16px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(
            to bottom,
            transparent,
            ${({ theme }) => theme.primary}70 6%,
            ${({ theme }) => theme.primary}70 94%,
            transparent
        );
    }
`;

const MobileEntry = styled.div`
    position: relative;
    padding-bottom: 40px;
`;

const MobileDot = styled.div`
    position: absolute;
    left: -32px;
    top: 30px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    border: 3px solid ${({ theme }) => theme.card_light};
    box-shadow:
        0 0 0 3px ${({ theme }) => `${theme.primary}35`},
        0 0 16px ${({ theme }) => `${theme.primary}50`};
    z-index: 2;
`;

/* ── Component ── */

const Experience = () => {
    const { data: experiences = [], loading } = useContent('experience');
    const isMobile = useIsMobile();
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [vw, setVw] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const { scrollY } = useScroll();
    const [scrollRange, setScrollRange] = useState([0, 1]);

    const count = experiences.length || 1;

    useEffect(() => {
        const el = containerRef.current;
        if (!el || !experiences.length) return;
        const measure = () => {
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const top = window.scrollY + rect.top;
                setScrollRange([top, top + el.offsetHeight - window.innerHeight]);
            });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [experiences.length]);

    const scrollYProgress = useTransform(scrollY, scrollRange, [0, 1], { clamp: true });
    const x = useTransform(scrollYProgress, [0, 1], [0, -(count - 1) * vw]);

    useMotionValueEvent(scrollYProgress, 'change', v => {
        const idx = Math.floor(v * count);
        setActiveIndex(Math.min(count - 1, Math.max(0, idx)));
    });

    if (loading) return null;

    /* Mobile layout */
    if (isMobile) {
        return (
            <Outer id="experience">
                <MobileContainer>
                    <MobileWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '32px' }}
                        >
                            <SectionHeadingWrapper>
                                <SectionLabel>My Journey</SectionLabel>
                                <SectionTitle>Experience</SectionTitle>
                            </SectionHeadingWrapper>
                        </motion.div>

                        {experiences.length > 0 && (
                            <MobileTimeline>
                                {experiences.map((exp, i) => (
                                    <MobileEntry key={i}>
                                        <MobileDot />
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <ExperienceCard experience={exp} />
                                        </motion.div>
                                    </MobileEntry>
                                ))}
                            </MobileTimeline>
                        )}
                    </MobileWrapper>
                </MobileContainer>
            </Outer>
        );
    }

    /* Desktop horizontal scroll */
    return (
        <Outer id="experience">
            <ScrollSpace ref={containerRef} $count={count}>
                <StickyWrap>
                    <ProgressTrack>
                        <ProgressFill style={{ scaleX: scrollYProgress }} />
                    </ProgressTrack>

                    <HeaderArea>
                        <SectionHeadingWrapper style={{ marginBottom: 0, gap: 0 }}>
                            <SectionLabel style={{ marginBottom: 8 }}>My Journey</SectionLabel>
                            <SectionTitle style={{ marginTop: 0, fontSize: '32px' }}>Experience</SectionTitle>
                        </SectionHeadingWrapper>
                    </HeaderArea>

                    <Track style={{ x }} $count={count}>
                        {experiences.map((exp, i) => (
                            <Panel key={i}>
                                <PanelInner>
                                    <Left>
                                        <IndexWatermark>
                                            {String(i + 1).padStart(2, '0')}
                                        </IndexWatermark>
                                        <LogoBox>
                                            <Logo src={exp.img} alt={exp.company} />
                                        </LogoBox>
                                        <Role>{exp.role}</Role>
                                        <CompanyName>
                                            {exp.companyUrl ? (
                                                <CompanyLink href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                                                    {exp.company}
                                                    <FaExternalLinkAlt size={11} />
                                                </CompanyLink>
                                            ) : exp.company}
                                        </CompanyName>
                                        <MetaRow>
                                            <MetaItem>
                                                <FaCalendarAlt size={12} />
                                                {exp.date}
                                            </MetaItem>
                                            {exp.location && (
                                                <MetaItem>
                                                    <FaMapMarkerAlt size={12} />
                                                    {exp.location}
                                                </MetaItem>
                                            )}
                                        </MetaRow>
                                    </Left>

                                    <Right>
                                        {exp.desc && (
                                            <Description
                                                dangerouslySetInnerHTML={{
                                                    __html: exp.desc.replace(/\n/g, '<br />')
                                                }}
                                            />
                                        )}

                                        {exp.skills?.length > 0 && (
                                            <SkillsWrap>
                                                <SkillsLabel>Technologies</SkillsLabel>
                                                <SkillList>
                                                    {exp.skills.map((s, j) => (
                                                        <SkillPill key={j}>{s}</SkillPill>
                                                    ))}
                                                </SkillList>
                                            </SkillsWrap>
                                        )}

                                        {(exp.doc || exp.pdf || exp.additionalResources?.length > 0) && (
                                            <LinksRow>
                                                {exp.doc && (
                                                    <LinkBtn href={exp.doc} target="_blank" rel="noopener noreferrer">
                                                        <FaExternalLinkAlt size={11} /> View Certificate
                                                    </LinkBtn>
                                                )}
                                                {exp.pdf && (
                                                    <LinkBtn href={exp.pdf} target="_blank" rel="noopener noreferrer">
                                                        <FaExternalLinkAlt size={11} /> View PDF
                                                    </LinkBtn>
                                                )}
                                                {exp.additionalResources?.map((r, j) => (
                                                    <LinkBtn key={j} href={r.url} target="_blank" rel="noopener noreferrer">
                                                        {r.icon} {r.title}
                                                    </LinkBtn>
                                                ))}
                                            </LinksRow>
                                        )}
                                    </Right>
                                </PanelInner>
                            </Panel>
                        ))}
                    </Track>

                    <NavBar>
                        <Dots>
                            {experiences.map((_, i) => (
                                <NavDot key={i} $active={i === activeIndex} />
                            ))}
                        </Dots>
                        <ScrollHint
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeIndex === count - 1 ? 0 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            Scroll to continue
                            <HintLine />
                        </ScrollHint>
                        <SlideCount>
                            {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                        </SlideCount>
                    </NavBar>
                </StickyWrap>
            </ScrollSpace>
        </Outer>
    );
};

export default Experience;

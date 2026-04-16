import React, { useEffect, useState, useRef, useCallback } from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import {
    HeroContainer,
    HeroBg,
    HeroLeftContainer,
    Img,
    HeroRightContainer,
    HeroInnerContainer,
    TextLoop,
    Title,
    Span,
    SubTitle,
    ResumeButton,
    ContactButton,
    ButtonRow,
    SocialMediaIcons,
    SocialMediaIcon,
    ScrollDownIcon,
    HeroSectionWrapper,
    AuroraBg,
    StatsRow,
    StatItem,
    StatNumber,
    StatLabel,
    AvailableBadge,
    PulseDot,
} from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

/* Animated count-up number */
const Counter = ({ value, suffix = '' }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            animate(count, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
        }
    }, [inView, count, value]);

    return (
        <StatNumber>
            <span ref={ref}>
                <motion.span>{rounded}</motion.span>{suffix}
            </span>
        </StatNumber>
    );
};

/* Magnetic wrapper — pulls element toward cursor on hover */
const Magnetic = ({ children, strength = 0.3 }) => {
    const ref = useRef(null);

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    }, [strength]);

    const onMouseLeave = useCallback(() => {
        if (ref.current) {
            ref.current.style.transform = 'translate(0px, 0px)';
        }
    }, []);

    return (
        <span
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ display: 'inline-block', transition: 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)' }}
        >
            {children}
        </span>
    );
};

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToNextSection = () => {
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <HeroSectionWrapper id="about">
            <AuroraBg />
            <HeroContainer isVisible={isVisible}>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer style={{ position: 'relative', zIndex: 1 }}>
                    <HeroLeftContainer>
                        <AvailableBadge>
                            <PulseDot />
                            Available for opportunities
                        </AvailableBadge>

                        <Title>Hi, I'm <br /> <Span>{Bio.name}</Span></Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                        delay: 70,
                                        deleteSpeed: 50,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{Bio.description}</SubTitle>

                        <ButtonRow>
                            <Magnetic strength={0.25}>
                                <ResumeButton href={Bio.resume} target='_blank' rel="noopener noreferrer">
                                    View Resume
                                </ResumeButton>
                            </Magnetic>
                            <Magnetic strength={0.25}>
                                <ContactButton
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Contact Me
                                </ContactButton>
                            </Magnetic>
                        </ButtonRow>

                        {Bio.stats?.length > 0 && (
                            <StatsRow>
                                {Bio.stats.map((stat, i) => (
                                    <StatItem key={i}>
                                        <Counter value={stat.value} suffix={stat.suffix} />
                                        <StatLabel>{stat.label}</StatLabel>
                                    </StatItem>
                                ))}
                            </StatsRow>
                        )}

                        <SocialMediaIcons>
                            <SocialMediaIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={24} />
                            </SocialMediaIcon>
                            <SocialMediaIcon href={Bio.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub size={24} />
                            </SocialMediaIcon>
                        </SocialMediaIcons>
                    </HeroLeftContainer>

                    <HeroRightContainer>
                        <Img src={HeroImg} alt="Jakub Olszewski" />
                    </HeroRightContainer>
                </HeroInnerContainer>

                <ScrollDownIcon onClick={scrollToNextSection} style={{ position: 'relative', zIndex: 1 }}>
                    <FiArrowDown />
                </ScrollDownIcon>
            </HeroContainer>
        </HeroSectionWrapper>
    )
}

export default HeroSection

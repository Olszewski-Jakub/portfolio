import React, { useEffect, useState } from 'react'
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
    SocialMediaIcons,
    SocialMediaIcon,
    ScrollDownIcon,
    HeroSectionWrapper
} from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiArrowDown } from 'react-icons/fi';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in effect when component mounts
        setIsVisible(true);
    }, []);

    const scrollToNextSection = () => {
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <HeroSectionWrapper id="about">
            <HeroContainer isVisible={isVisible}>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer>
                    <HeroLeftContainer>
                        <Title>Hi, I am <br /> <Span>{Bio.name}</Span></Title>
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
                        <ResumeButton href={Bio.resume} target='_blank' rel="noopener noreferrer">
                            View Resume
                        </ResumeButton>

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

                <ScrollDownIcon onClick={scrollToNextSection}>
                    <FiArrowDown />
                </ScrollDownIcon>
            </HeroContainer>
        </HeroSectionWrapper>
    )
}

export default HeroSection
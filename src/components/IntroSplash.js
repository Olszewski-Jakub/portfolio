import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Overlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.bg};
    overflow: hidden;
`;

const Initials = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0;
    user-select: none;
`;

const GradientChar = styled(motion.span)`
    font-size: clamp(80px, 14vw, 140px);
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #2F81F7, #0EA5E9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
`;

/* Characters that make up "J.O." and their burst direction */
const CHARS = [
    { char: 'J', burstY: -120, burstX: -80,  delay: 0 },
    { char: '.', burstY:  40,  burstX: -60,  delay: 0.08 },
    { char: 'O', burstY:  120, burstX:  80,  delay: 0.16 },
    { char: '.', burstY: -40,  burstX:  60,  delay: 0.24 },
];

const enterVariant = (delay) => ({
    hidden:  { opacity: 0, y: 50, scale: 0.85 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
});

const burstVariant = ({ burstY, burstX, delay }) => ({
    opacity: 0,
    scale: 3.5,
    x: burstX,
    y: burstY,
    filter: 'blur(18px)',
    transition: { delay, duration: 0.38, ease: [0.4, 0, 1, 1] },
});

const IntroSplash = ({ onDone }) => {
    const [phase, setPhase] = useState('enter');

    const done = useCallback(() => onDone?.(), [onDone]);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('burst'), 950);
        const t2 = setTimeout(() => setPhase('fade'),  1260);
        const t3 = setTimeout(done,                    1700);
        return () => [t1, t2, t3].forEach(clearTimeout);
    }, [done]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <Overlay
                    key="splash"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === 'fade' ? 0 : 1 }}
                    transition={{ duration: 0.44, ease: 'easeInOut' }}
                >
                    <Initials>
                        {CHARS.map(({ char, burstY, burstX, delay }, i) => {
                            const v = enterVariant(delay);
                            return (
                                <GradientChar
                                    key={i}
                                    variants={v}
                                    initial="hidden"
                                    animate={
                                        phase === 'burst' || phase === 'fade'
                                            ? burstVariant({ burstY, burstX, delay: delay * 0.5 })
                                            : 'visible'
                                    }
                                    style={{ letterSpacing: char === '.' ? '-4px' : '-2px' }}
                                >
                                    {char}
                                </GradientChar>
                            );
                        })}
                    </Initials>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

/* Gate: only show once per browser session */
export const shouldShowSplash = () => {
    if (typeof window === 'undefined') return false;
    if (sessionStorage.getItem('intro_shown')) return false;
    sessionStorage.setItem('intro_shown', '1');
    return true;
};

export default IntroSplash;

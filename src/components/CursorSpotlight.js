import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.4s ease;
`;

const CursorSpotlight = ({ darkMode }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!darkMode) return;

        const el = ref.current;
        if (!el) return;

        const onMove = (e) => {
            el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(47,129,247,0.07), transparent 80%)`;
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [darkMode]);

    if (!darkMode) return null;

    return <Overlay ref={ref} />;
};

export default CursorSpotlight;

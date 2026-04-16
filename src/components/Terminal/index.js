import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Bio } from '../../data/constants';

const blink = keyframes`
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 99998;
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px);
`;

const Window = styled.div`
    width: min(880px, 94vw);
    height: min(580px, 86vh);
    background: #0d120d;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow:
        0 0 0 1px rgba(0, 255, 65, 0.12),
        0 30px 90px rgba(0, 0, 0, 0.85),
        0 0 80px rgba(0, 255, 65, 0.04);
    position: relative;

    /* CRT scanlines */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.06) 2px,
            rgba(0, 0, 0, 0.06) 4px
        );
        pointer-events: none;
        z-index: 10;
        border-radius: 12px;
    }
`;

const TitleBar = styled.div`
    height: 38px;
    background: #0a0f0a;
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 8px;
    border-bottom: 1px solid rgba(0, 255, 65, 0.08);
    flex-shrink: 0;
`;

const TrafficDot = styled.button`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    border: none;
    cursor: pointer;
    padding: 0;
    opacity: 0.85;
    transition: opacity 0.15s ease;
    &:hover { opacity: 1; }
`;

const TitleText = styled.div`
    flex: 1;
    text-align: center;
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
    font-size: 12px;
    color: rgba(0, 255, 65, 0.35);
    letter-spacing: 0.5px;
    user-select: none;
`;

const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px 8px;
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.65;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 255, 65, 0.15);
        border-radius: 2px;
    }
`;

const Line = styled.div`
    color: ${({ $color }) => $color || '#00ff41'};
    white-space: pre-wrap;
    word-break: break-word;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    padding: 2px 0;
    color: #00ff41;
`;

const Prompt = styled.span`
    white-space: nowrap;
    flex-shrink: 0;
    user-select: none;
`;

const TermInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #00ff41;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: transparent;

    &::selection { background: rgba(0, 255, 65, 0.2); }
`;

const Cursor = styled.span`
    display: inline-block;
    width: 7px;
    height: 14px;
    background: #00ff41;
    animation: ${blink} 1.1s step-end infinite;
    vertical-align: text-bottom;
    flex-shrink: 0;
`;

/* ─── Data ─── */

const PROMPT_STR = 'jakub@portfolio:~$ ';

const BOOT = [
    { text: 'Initialising secure connection...', color: '#4a4a4a' },
    { text: 'Verifying credentials...', color: '#4a4a4a' },
    { text: '✓ Access granted.', color: '#00ff41' },
    { text: '' },
    { text: '  jakub@portfolio — Interactive Terminal v1.0', color: '#00ff41' },
    { text: "  Type 'help' for available commands.", color: '#555' },
    { text: '' },
];

const HELP = [
    { text: 'Commands:', color: '#00ff41' },
    { text: '' },
    { text: '  whoami           Who is Jakub?', color: '#666' },
    { text: '  skills           Full tech stack', color: '#666' },
    { text: '  git log          Work history', color: '#666' },
    { text: '  ls projects/     Recent projects', color: '#666' },
    { text: '  neofetch         System info', color: '#666' },
    { text: '  open github      Open GitHub profile', color: '#666' },
    { text: '  open linkedin    Open LinkedIn', color: '#666' },
    { text: '  open resume      Open resume PDF', color: '#666' },
    { text: '  contact          Jump to contact form', color: '#666' },
    { text: '  clear            Clear terminal', color: '#666' },
    { text: '  exit             Close terminal', color: '#666' },
    { text: '' },
];

const NEOFETCH = [
    { text: '' },
    { text: '        ██╗ ██████╗ ', color: '#00ff41' },
    { text: '        ██║██╔═══██╗         jakub@portfolio', color: '#00ff41' },
    { text: '        ██║██║   ██║         ───────────────', color: '#00ff41' },
    { text: '   ██   ██║██║   ██║         Role:  Full-Stack & Mobile Developer', color: '#00ff41' },
    { text: '   ╚█████╔╝╚██████╔╝         Stack: Kotlin · Swift · JS · Node.js', color: '#00ff41' },
    { text: '    ╚════╝  ╚═════╝          Time:  3+ years shipping real products', color: '#00ff41' },
    { text: '                             Apps:  Android · iOS · Web', color: '#00ff41' },
    { text: `                             Hub:   github.com/Olszewski-Jakub`, color: '#4fc3f7' },
    { text: '' },
    { text: '   ████ ████ ████ ████ ████ ████ ████', color: '#00ff41' },
    { text: '' },
];

const buildCommands = (addLines, setLines, onClose) => ({
    help: () => addLines(HELP),

    whoami: () => addLines([
        { text: `  Name      Jakub Olszewski`, color: '#00ff41' },
        { text: `  Roles     ${Bio.roles.join(' · ')}`, color: '#00ff41' },
        { text: `  GitHub    ${Bio.github}`, color: '#4fc3f7' },
        { text: `  LinkedIn  ${Bio.linkedin}`, color: '#4fc3f7' },
        { text: '' },
        { text: `  ${Bio.description}`, color: '#555' },
        { text: '' },
    ]),

    skills: () => addLines([
        { text: '  ┌─ Mobile ──────────────────────────────────────────┐', color: '#333' },
        { text: '  │  Kotlin (Jetpack Compose)   Swift (SwiftUI)       │', color: '#00ff41' },
        { text: '  ├─ Backend ─────────────────────────────────────────┤', color: '#333' },
        { text: '  │  Node.js · REST APIs · Firebase · PostgreSQL      │', color: '#00ff41' },
        { text: '  ├─ Frontend ────────────────────────────────────────┤', color: '#333' },
        { text: '  │  React · Styled Components · Framer Motion        │', color: '#00ff41' },
        { text: '  ├─ Tools ───────────────────────────────────────────┤', color: '#333' },
        { text: '  │  Git · Docker · CI/CD · Figma                     │', color: '#00ff41' },
        { text: '  └────────────────────────────────────────────────────┘', color: '#333' },
        { text: '' },
    ]),

    'git log': () => addLines([
        { text: '  commit a3f91c2  (HEAD -> main, origin/main)', color: '#f9a825' },
        { text: '  Author: Jakub Olszewski', color: '#00ff41' },
        { text: '  Date:   2024 — Present', color: '#555' },
        { text: '  » Mobile Developer — production apps, real users', color: '#00ff41' },
        { text: '' },
        { text: '  commit b22e1d0', color: '#f9a825' },
        { text: '  Date:   2023 — 2024', color: '#555' },
        { text: '  » Android Developer — Kotlin, MVVM, Firebase', color: '#00ff41' },
        { text: '' },
        { text: '  commit c11f4a9', color: '#f9a825' },
        { text: '  Date:   2022 — 2023', color: '#555' },
        { text: '  » Backend Developer — APIs, databases, CI/CD', color: '#00ff41' },
        { text: '' },
        { text: '  → Full history at #experience on the portfolio', color: '#4fc3f7' },
        { text: '' },
    ]),

    'ls projects/': () => addLines([
        { text: '  drwxr-xr-x  Fitness Tracking App      Kotlin · Firebase · ML Kit', color: '#00ff41' },
        { text: '  drwxr-xr-x  iOS Wallet App            Swift · SwiftUI · Core Data', color: '#00ff41' },
        { text: '  drwxr-xr-x  E-Commerce Platform       Node.js · React · PostgreSQL', color: '#00ff41' },
        { text: '  drwxr-xr-x  REST API Gateway          Node.js · Docker · Redis', color: '#00ff41' },
        { text: '' },
        { text: `  12+ projects total — scroll to #projects for details`, color: '#4fc3f7' },
        { text: '' },
    ]),

    neofetch: () => addLines(NEOFETCH),

    'open github': () => {
        window.open(Bio.github, '_blank', 'noopener');
        addLines([{ text: `  Opening ${Bio.github}`, color: '#4fc3f7' }, { text: '' }]);
    },

    'open linkedin': () => {
        window.open(Bio.linkedin, '_blank', 'noopener');
        addLines([{ text: `  Opening ${Bio.linkedin}`, color: '#4fc3f7' }, { text: '' }]);
    },

    'open resume': () => {
        window.open(Bio.resume, '_blank', 'noopener');
        addLines([{ text: '  Opening resume PDF...', color: '#4fc3f7' }, { text: '' }]);
    },

    contact: () => {
        onClose();
        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 350);
        addLines([{ text: '  Redirecting to contact form...', color: '#4fc3f7' }, { text: '' }]);
    },

    clear: () => setLines([]),

    exit:  () => onClose(),
    quit:  () => onClose(),
});

/* ─── Component ─── */

const Terminal = ({ onClose }) => {
    const [lines, setLines]       = useState([]);
    const [input, setInput]       = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [histIdx, setHistIdx]   = useState(-1);
    const [booting, setBooting]   = useState(true);
    const bodyRef  = useRef(null);
    const inputRef = useRef(null);

    const scrollBottom = useCallback(() => {
        requestAnimationFrame(() => {
            if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        });
    }, []);

    const addLines = useCallback((newLines) => {
        setLines(prev => [...prev, ...newLines]);
        scrollBottom();
    }, [scrollBottom]);

    /* Boot sequence */
    useEffect(() => {
        let alive = true;
        (async () => {
            for (let i = 0; i < BOOT.length; i++) {
                await new Promise(r => setTimeout(r, i === 0 ? 60 : 160));
                if (!alive) return;
                setLines(prev => [...prev, BOOT[i]]);
                scrollBottom();
            }
            setBooting(false);
            setTimeout(() => inputRef.current?.focus(), 60);
        })();
        return () => { alive = false; };
    }, [scrollBottom]);

    /* Command execution */
    const execute = useCallback((raw) => {
        const cmd = raw.trim().toLowerCase();
        addLines([{ text: `${PROMPT_STR}${raw}`, color: '#00ff41' }]);
        if (!cmd) return;

        const commands = buildCommands(addLines, setLines, onClose);
        const handler = commands[cmd];

        if (handler) {
            handler();
        } else {
            addLines([
                { text: `  command not found: ${raw}`, color: '#ff5252' },
                { text: "  Type 'help' for available commands.", color: '#555' },
                { text: '' },
            ]);
        }
    }, [addLines, onClose]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const val = input;
            if (val.trim()) setCmdHistory(h => [val, ...h]);
            setHistIdx(-1);
            setInput('');
            execute(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHistIdx(i => {
                const next = Math.min(i + 1, cmdHistory.length - 1);
                setInput(cmdHistory[next] ?? '');
                return next;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHistIdx(i => {
                const next = Math.max(i - 1, -1);
                setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
                return next;
            });
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <Overlay onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <Window onClick={() => inputRef.current?.focus()}>
                <TitleBar>
                    <TrafficDot $color="#ff5f57" onClick={onClose} title="Close" />
                    <TrafficDot $color="#ffbd2e" title="Minimise" />
                    <TrafficDot $color="#28c840" title="Maximise" />
                    <TitleText>jakub@portfolio — bash — 80×24</TitleText>
                </TitleBar>

                <Body ref={bodyRef}>
                    {lines.map((l, i) => (
                        <Line key={i} $color={l.color}>{l.text}</Line>
                    ))}

                    {!booting && (
                        <InputRow>
                            <Prompt>{PROMPT_STR}</Prompt>
                            <TermInput
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                            />
                            <Cursor />
                        </InputRow>
                    )}
                </Body>
            </Window>
        </Overlay>
    );
};

export default Terminal;

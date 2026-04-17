import React from 'react';
import styled, { useTheme } from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background: ${({ $bg }) => $bg};
  position: relative;
  z-index: 2;
`;

const SectionDivider = ({ from, to, flip = false }) => {
  const theme = useTheme();
  const fromColor = theme[from] || from;
  const toColor = theme[to] || to;

  return (
    <Wrap $bg={fromColor}>
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: '60px',
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill={toColor} />
      </svg>
    </Wrap>
  );
};

export default SectionDivider;

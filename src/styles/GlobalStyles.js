import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Fonts and base resets remain in App.css */

  body {
    margin: 0 !important;
    padding: 0;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
  }

  /* Scrollbar themed via styled-components */
  ::-webkit-scrollbar {
    width: 4px;
    height: 80px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbar.track};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.thumb};
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbar.thumbHover};
  }
`;

export default GlobalStyles;

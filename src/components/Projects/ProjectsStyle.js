import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0 100px;
    background: ${({ theme }) => theme.bg};
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 24px;
    gap: 0;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

/* ── Filter chips ── */

export const FilterRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin: 32px 0 40px;
`;

export const FilterChip = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 0.4px;
    cursor: pointer;
    border: 1.5px solid ${({ active, theme }) => active ? theme.primary : `${theme.text_primary}25`};
    background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
    color: ${({ active, theme }) => active ? '#fff' : theme.text_secondary};
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;

    &:hover {
        border-color: ${({ theme }) => theme.primary};
        color: ${({ active, theme }) => active ? '#fff' : theme.primary};
        transform: translateY(-2px);
        box-shadow: ${({ active, theme }) => active
            ? '0 6px 18px rgba(47,129,247,0.35)'
            : '0 4px 12px rgba(47,129,247,0.12)'};
    }

    @media (max-width: 480px) {
        padding: 7px 14px;
        font-size: 12px;
    }
`;

export const FilterCount = styled.span`
    background: ${({ active, theme }) => active ? 'rgba(255,255,255,0.25)' : `${theme.primary}18`};
    color: ${({ active, theme }) => active ? '#fff' : theme.primary};
    border-radius: 50px;
    padding: 0 7px;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.6;
    min-width: 20px;
    text-align: center;
`;

/* ── Cards grid ── */

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    width: 100%;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        gap: 18px;
    }
`;

export const EmptyMessage = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    padding: 60px 20px;
    border: 1.5px dashed ${({ theme }) => `${theme.text_primary}20`};
    border-radius: 16px;
    width: 100%;
`;

/* ── Show more ── */

export const ShowMoreButton = styled.button`
    margin-top: 40px;
    padding: 12px 36px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: 1.5px solid ${({ theme }) => theme.primary};
    background: transparent;
    color: ${({ theme }) => theme.primary};
    transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(47,129,247,0.3);
    }
`;

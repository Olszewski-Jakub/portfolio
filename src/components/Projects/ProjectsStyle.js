import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Container = styled.div`
    background: linear-gradient(
            343.07deg,
            rgba(132, 59, 206, 0.06) 5.71%,
            rgba(132, 59, 206, 0) 64.83%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 80px 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
    animation: ${fadeIn} 0.5s ease-in-out;

    @media (max-width: 960px) {
        padding: 0px 0px 80px 0;
    }
`;

export const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text_primary};

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 36px;
    }
`;

export const Desc = styled.p`
    font-size: 18px;
    text-align: center;
    max-width: 800px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.5;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin: 12px 0 30px;
        font-size: 16px;
        padding: 0 16px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px 40px 0px;
    overflow: hidden;

    @media (max-width: 768px) {
        font-size: 12px;
        margin-bottom: 30px;
        border-radius: 10px;
    }

    &.show-more {
        margin: 40px auto 0;
        width: auto;
        border-radius: 20px;
    }
`;

export const ToggleButton = styled.div`
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-align: center;
    display: flex;
    align-items: center;
    
    ${({ active, theme }) =>
    active && `
            background: ${theme.primary};
            color: ${theme.white};
        `
}
    
    &:hover {
        background: ${({ theme, active }) => active ? theme.primary : `${theme.primary}22`};
        color: ${({ theme, active }) => active ? theme.white : theme.primary};
    }
    
    @media (max-width: 768px) {
        padding: 6px 12px;
        border-radius: 4px;
    }
    
    &.show-more {
        background: transparent;
        color: ${({ theme }) => theme.primary};
        border: 1.5px solid ${({ theme }) => theme.primary};
        border-radius: 20px;
        padding: 10px 24px;
        transition: all 0.3s ease-in-out;
        margin: 0 auto;
        
        &:hover {
            background: ${({ theme }) => theme.primary};
            color: ${({ theme }) => theme.white};
            transform: translateY(-3px);
        }
    }
`;

export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`;

export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 28px;
    
    @media (max-width: 768px) {
        gap: 20px;
    }
`;

export const EmptyProjectsMessage = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 18px;
    margin: 50px 0;
    max-width: 500px;
    padding: 20px;
    border-radius: 12px;
    border: 1px dashed ${({ theme }) => theme.text_secondary};
    animation: ${fadeIn} 0.5s ease-in-out;
`;
import styled, { css, keyframes } from "styled-components";

export const ani = keyframes` 
    to {
        background-position: -6560px, 0;
    }
`;

const styles = css`
    width: 328px;
    height: 225px;
    background: url("/css_sprites.png") no-repeat 0 0 / auto;
    animation: ${ani} 3s infinite steps(20);
    animation-fill-mode: forwards;
`;

export const LoadingImg = styled.div`
    ${styles}
`;

export const Div = styled.div`
    width: 328px;
    height: 225px;
    background-size: cover;
    margin: 0 auto;
`;

import styled, { css, keyframes } from "styled-components";

export const focusIn = keyframes`
        0% {
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
        }
        50% {
        -webkit-transform: scale(1.3);
                transform: scale(1.3);
        }

        100% {
        -webkit-transform: scale(1);
                transform: scale(1);
        }
`;

export const Player = styled.div`
    width: 327px;
    height: 223px;
    /* margin: 30px; */
    position: relative;
    ${".btn_play"} {
        position: absolute;
        top: 92.42px;
        left: 119.5px;

        &:hover {
            cursor: pointer;
        }
        &:active {
            fill: #ef6363;
        }
    }
    ${".btn_replay"} {
        position: absolute;
        top: 92px;
        left: 191px;
        &:hover {
            cursor: pointer;
        }
        &:active {
            stroke: #ef6363;
        }
    }
`;

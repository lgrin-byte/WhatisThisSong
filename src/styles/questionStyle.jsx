import styled, { css, keyframes } from "styled-components";
import Image from "next/image";

export const focusIn = keyframes`
        0% {
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
                
        }
        22% {
        -webkit-transform: scale(1);
                transform: scale(1);
        }
        80% {
        -webkit-transform: scale(1);
                transform: scale(1);
                opacity:100%;
        
            }

        100% {
        -webkit-transform: scale(0.3);
                transform: scale(0.3);
                opacity:50%;
        }
`;

export const focusOut = keyframes`
        0% {
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
                
        }
        22% {
        -webkit-transform: scale(1);
                transform: scale(1);
        }
        70% {
        -webkit-transform: scale(1);
                transform: scale(1);
                opacity:100%;
        
            }

        100% {
        -webkit-transform: scale(0);
                transform: scale(0);
                opacity:50%;
        }
`;

export const vibration = keyframes` 
        from {
            transform: rotate(10deg);
        }
        to {
            transform: rotate(-10deg);
        }
    `;
export const vibration2 = keyframes` 
    from {
        transform: rotate(15deg);
    }
    to {
        transform: rotate(-15deg);
    }
`;
const styles = css`
    animation: ${vibration} 0.2s infinite;
`;

const stylesFast = css`
    animation: ${vibration2} 0.2s infinite;
`;

const stylesAnswer = css`
    animation: ${focusIn} 2s cubic-bezier(1, 1, 1, 1);
`;

const stylesFalse = css`
    animation: ${focusOut} 1.5s cubic-bezier(1, 1, 1, 1);
`;

const setType = (type) => {
    switch (type) {
        case "answer":
            return stylesAnswer;
        case "false":
            return stylesFalse;
    }
};

const setAttr = (time) => {
    if (time <= 20) {
        return styles;
    } else if (time <= 10) {
        return stylesFast;
    }
};

export const Wrap = styled.div`
    width: 329px;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: 25px;
`;

export const Div = styled.div`
    display: flex;
    margin-bottom: 36px;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        color: #5d5b61;
        margin-right: -22px;
    }
    span {
        margin-left: 22px;
        color: ${(props) => (props.time < 11 ? "#EF6363" : "black")};
    }
`;

export const MyProgress = styled.div`
    margin: 26px 0 13px;
    width: 328px;
    height: 3px;
    background-color: white;
`;

export const StateBar = styled.div`
    width: calc(100 / 35 * ${(props) => props.width}%);
    height: 3px;
    background-color: #ef6363;
`;

export const Rate = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${(props) =>
        props.range > props.level ? "white" : "#EF6363"};
    margin-left: 10px;
    border-radius: 50%;
`;
export const TimerImg = styled(Image)`
    ${({ time }) => setAttr(time)}
`;

export const Img = styled(Image)`
    position: absolute;
    top: 32px;
`;

export const Btn = styled.button`
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid black;
`;

export const Input = styled.input`
    margin: 12px 0;
    padding: 8px;
    /* 텍스트창 구분을 위해 임시로 넣음 */
    border-radius: 10px;
    background-color: rgba(0, 29, 36, 0.1);
`;

export const Ment = styled.p`
    text-align: center;
    color: red;
    font-size: 16px;
    margin: 56px 0 20px;
`;

export const ImageToast = styled(Image)`
    width: 170px;
    height: 170px;
    display: inline;
`;

export const ContToastFalse = styled.div`
    width: 330px;
    position: absolute;
    top: 177px;
    margin: 0 auto;
    text-align: center;
    animation: ${focusIn} 2s cubic-bezier(1, 1, 1, 1);

    div {
        margin-top: 22px;
        width: 330px;
        height: 114px;
        background: #ffffff;
        box-shadow: 0px 2px 6px 3px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        text-align: center;
        padding: 14px;
        font-size: 18px;
    }
`;

export const ContToastAnswer = styled.div`
    width: 330px;
    position: absolute;
    top: 177px;
    margin: 0 auto;
    text-align: center;
    animation: ${focusOut} 1.5s cubic-bezier(1, 1, 1, 1) alternate;
    animation-fill-mode: forwards;
`;

import styled, { css, keyframes } from "styled-components";
import Image from "next/image";

const setAttr = (type) => {
    switch (type) {
        case "feedback":
            return css`
                width: 330px;
                height: 196px;
                background: #ffffff;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);
                border-radius: 10px;
                animation: fadeInUp 0.5s;
                padding: 17px;
            `;

        default:
            return css`
                width: 329px;
                height: 566px;
                background-color: white;
                border-radius: 5px;

                line-height: 0;
                margin: 103px auto auto;
                animation: fadeInUp 0.5s;
            `;
    }
};
export const Back = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    background: rgba(229, 222, 245, 0.3);
    backdrop-filter: blur(5px);
    z-index: 100;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const WrapModal = styled.div`
    ${({ type }) => setAttr(type)}
`;
export const CloseBtn = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 15px;
    margin: 23px 20.8px -10px;
    /* span{
        margin-left: 9.2px;
    } */
    &:hover {
    }
`;
export const CancelBar = styled(Image)`
    /* position: relative; */

    /* &:hover {
    cursor: pointer;
    background-color: #0F0B19; */

    //}
    cursor: pointer;
`;

export const CloseSpan = styled.span`
    margin-right: 9.2px;
    cursor: pointer;
`;

// .bar_modal{
//     position: absolute;
//     top: 16px;
//     left: 170px;
//     border: 2px solid #DBDBDB;
//     border-radius: 5px;
//     width: 50px;
// }

export const Btn = styled.button`
    height: 46px;
    width: 100%;

    &:hover {
        cursor: pointer;
        font-weight: 600;
        color: white;
        background-color: #0f0b19;
        transition: 0.5s;
    }
`;

export const TitleBox = styled.div`
    margin: 20px 20px 23px;
    ${".contMargin"} {
        margin: 13px;
    }
`;
export const PlayBox = styled.div`
    width: 290px;
    height: auto;
    font-size: 15px;
    line-height: 20px;
    background: #faf6ef;
    margin-top: -8px;
    border: 3px solid #e5def5;
    padding: 18px 10px 12px;
    text-align: center;
`;

export const UlModal = styled.ul`
    /* list-style-type: square; */
    /* list-style: ; */
    display: flex;
    flex-direction: column;
    padding-left: 23px;
    text-align: start;
`;

export const LiModal = styled.li`
    list-style-type: square;
    margin: 4px 0;
    /* &::before{ */
    color: #ef6363;
    font-size: 20px;
    /* } */
    /* list-style: ; */
    ${"p"} {
        color: black;
        font-size: 15px;
    }
    &:first-child {
        margin-top: 5px;
    }

    &:last-child {
        margin: 0;
    }
`;
export const ExplainImg = styled(Image)`
    margin: 3px 0 10px;
    margin-left: -12px;
`;

export const RedSpan = styled.span`
    color: #ff2323;
`;

export const WrapModal2 = styled.div`
    width: 200px;
    height: 100px;
    background-color: white;
    margin: 150px auto;
    text-align: center;
    padding-top: 20px;
`;

export const BtnDelete = styled.button`
    width: 100px;
    height: 30px;
    margin-top: 20px;
    background-color: aliceblue;
    &:active {
        background-color: #ef6363;
        color: white;
    }
`;

export const BtnClose = styled.button`
    width: 100px;
    height: 30px;
    background-color: aliceblue;
    &:active {
        background-color: #ef6363;
        color: white;
    }
`;

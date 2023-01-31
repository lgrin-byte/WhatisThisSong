import styled, { css, keyframes } from 'styled-components';
import Link from "next/link"

const scale = keyframes` 
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }

`

const scaleDown = keyframes` 
    0% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }

`

    const setAttr = (attr) => {
        switch (attr) {
        case 'question':
            return css`
            background-color: white;
            border: none;
            `;
        case 'change':
            return css`
            background-color: #EF6363;
            color: white;
            /* animation: ${scale} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; */
            `;
        case 'choice':
            return css`
            background-color: var(--deep-gray);
            margin-bottom: 25px;
            `;
        case 'empty':
            return css`
                border: 1px solid black;
                animation: ${scaleDown} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

            `;
        
        default:
            return css`
                border: 1px solid black;
                background-color: white;
                
            `;
        }
    };


export const Btn = styled(Link)`
    height: 60px;
    width: 329px;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    /* &:hover{
        border: 1px solid blue;          

    } */
    &:active{
      background-color: #EF6363;
            color: white;
            animation: ${scale} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    }
    

    ${({ attr }) => setAttr(attr)}
`;

export const BtnYear = styled.button`
    height: 60px;
    width: 329px;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    /* &:hover{
        border: 1px solid blue;          

    } */

    ${({ attr }) => setAttr(attr)}
`;


export const YearSelectorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  /* border: 5px solid ${(props) => blue}; */
`;

export const Label = styled.label`
    height: 60px;
    width: 329px;
    border-radius: 5px;
    margin-bottom:22px ;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    background-color: white;
  /* background-color: ${(props) => blue}; */
`;

export const RadioButton = styled.input`
  display: none;
  
  &:checked + ${Label} {
    background-color: #EF6363;
    color: white;
    
  }
`;
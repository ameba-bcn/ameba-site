import React from 'react'
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import './LettersMove.css'
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

const marqueee = keyframes`
    0% { transform: translateX(0%); }
    50% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }`

const StyledWrapperLetters = styled.div`
    width: 100 %;
    background: #1D1D1B;
    height: 42px;
    text-align: left;
    overflow: hidden;
    z-index: 0;
    .substituto-marquee {
        overflow: hidden;
        position: relative;
        background: #1D1D1B;
    }
    .marquee {
        animation: ${marqueee} 20s linear infinite;
        @media (max-width: 700px) {
            animation: ${marqueee} 7s linear infinite;
        }
        display: block;
        min-width: 100 %;
        left: 0;
        top: 0;
        white-space: nowrap;
        z-index: 3;
        font-size: 30px;
        font-family: 'Bebas Neue';
        font-weight: 500;
        text-transform: uppercase;
    }
`


export default function LettersMove(props) {
    const { link = "" } = props;
    return (
        link.length > 0 ? <NavLink
            style={{ textDecoration: "none" }}
            to={{
                pathname: link,
            }}
        >
            <StyledWrapperLetters onClick={() => console.log("whachoo")}>
                <div className="substituto-marquee">
                    <div className="marquee" style={{ color: props.color }}>
                        {Array.from(Array(24).keys()).map(x => `- ${props.sentence} `)}
                    </div>
                </div>
            </StyledWrapperLetters>
        </NavLink> :
            <StyledWrapperLetters onClick={() => console.log("whachoo")}>
                <div className="substituto-marquee">
                    <div className="marquee" style={{ color: props.color }}>
                        {Array.from(Array(24).keys()).map(x => `- ${props.sentence} `)}
                    </div>
                </div>
            </StyledWrapperLetters>
    )
}

import React from 'react'
import './LettersMove.css'
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

export default function LettersMove(props) {
    return (
        <div className="wrapper">
            <div className="substituto-marquee">
                <div className="marquee" style={{ color: props.color }}>
                    {Array.from(Array(24).keys()).map(x=>  `- ${props.sentence} `)}
                </div>
            </div>
        </div>
    )
}

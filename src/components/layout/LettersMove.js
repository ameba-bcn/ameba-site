import React from 'react'
import './LettersMove.css'
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

export default function LettersMove(props) {
    return (
        <div className="wrapper">
            {/* <marquee behavior="alternate"> */}
            <div className="substituto-marquee">
                <div className="marquee" style={{ color: props.color }}>
                    - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                - {props.sentence}
                </div>
            </div>
            {/* </marquee> */}
        </div>
    )
}

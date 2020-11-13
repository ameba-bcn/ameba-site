import React from 'react'
import './LettersMove.css'
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

export default function LettersMove(props) {
    return (
        <div class="wrapper">
            <marquee behavior="alternate">
                <span class="marquee" style={{ color: props.color }}>
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
                </span>
            </marquee>
        </div>
    )
}

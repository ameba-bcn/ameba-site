import React from 'react';
import { Component } from 'react';
import LlistatEntrevistes from './llistatEntrevistes';
import PowerTitle from '../layout/powerTitle';
import './ClientEntrevistes.css'

export default class clientEntrevistes extends Component {

    render() {
        return (
            <>
                <PowerTitle
                    title="#SUPPORTYOURLOCALS"
                    // To Do adjust in two lines
                    className="SupportTitle" />  
                <LlistatEntrevistes />
            </>
        )
    }

}
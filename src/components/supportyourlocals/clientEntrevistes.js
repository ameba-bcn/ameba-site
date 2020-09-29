import React from 'react';
import { Component } from 'react';
import LlistatEntrevistes from './llistatEntrevistes';
import PoweTitle from '../../components/layout/powerTitle';

export default class clientEntrevistes extends Component {

    render() {
        return (
            <>
                <PoweTitle
                    title="#SUPPORTYOURLOCALS" />
                <LlistatEntrevistes />
            </>
        )
    }

}
import React from 'react';
import { Component } from 'react';
import LlistatActivitats from './llistatActivitats';
import PoweTitle from '../../components/layout/powerTitle';

export default class clientActivitats extends Component {

    render() {
        return (
            <>
                <PoweTitle
                    title="ACTIVITATS" />
                <LlistatActivitats />
            </>
        )
    }

}
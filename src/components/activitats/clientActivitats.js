import React from 'react';
import { Component } from 'react';
import LlistatActivitats from './LlistatActivitats';
import PowerTitle from '../../components/layout/powerTitle';

export default class clientActivitats extends Component {

    render() {
        return (
            <>
                <PowerTitle
                    title="ACTIVITATS" />
                <LlistatActivitats />
            </>
        )
    }

}
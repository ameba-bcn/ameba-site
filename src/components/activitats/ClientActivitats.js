import React from 'react';
import { Component } from 'react';
import LlistatActivitats from './LlistatActivitats';
import PowerTitle from '../layout/PowerTitle';

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
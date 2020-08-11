import React from 'react';
import { Component } from 'react';
import LlistatActivitats from './llistatActivitats';

export default class clientActivitats extends Component {

    render() {
        return (

            <div className="card-group">
                <LlistatActivitats />
            </div>

        )
    }

}
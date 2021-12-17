import React from 'react';
import { StallionItem } from './stallionItem';

// Stallions component class
export class Stallions extends React.Component {

    render() {
        //  map function splits the array of stallions into individual stallion
        return this.props.stallions.map((stallion) => {
            return <StallionItem stallion={stallion} key={stallion._id} ReloadStallions={this.props.ReloadStallions}></StallionItem>
        })
    }
}
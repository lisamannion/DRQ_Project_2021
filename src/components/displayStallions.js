import React from 'react';
import { Stallions } from './stallions';
import axios from 'axios';

// Read component class
export class DisplayStallions extends React.Component {
    // Constructor
    constructor() {
        super()

        this.ReloadStallions = this.ReloadStallions.bind(this)
    }

    state = {
        stallions: []
    };

    // LIFECYCLE HOOK - Triggered everytime read component is active on the view
    componentDidMount() {
        // HTTP get call - Get the data from the API (server.js) and set it equal to state
        axios.get('http://localhost:4000/displayStallions')
            .then((response) => { // If successful - assign it to state
                this.setState({ stallions: response.data })
            })
            .catch((error) => { // If an exception happens on server and data is not retrieved
                console.log(error);
            });
    }

    // Reload method for when 
    ReloadStallions() {
        // HTTP get call - Get the data from the API (server.js) and set it equal to state
        axios.get('http://localhost:4000/displayStallions')
            .then((response) => { // If successful - assign it to state
                this.setState({ stallions: response.data })
            })
            .catch((error) => { // If an exception happens on server and data is not retrieved
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Stallions stallions={this.state.stallions} ReloadStallions={this.ReloadStallions}></Stallions>
            </div>
        );
    }
}
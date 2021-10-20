import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

// Read component class
export class Read extends React.Component {

    state = {
        movies: []
    };

    // LIFECYCLE HOOK - Triggered everytime read component is active on the view
    componentDidMount() {
        // HTTP get call - Get the data from the API and set it equal to state
        axios.get('https://jsonblob.com/api/jsonblob/894944504570986496')
            .then((response) => { // If successful - assign it to state
                this.setState({ movies: response.data.movies })
            })
            .catch((error) => { // If an exception happens on server and data is not retrieved
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>This is my read component.</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}
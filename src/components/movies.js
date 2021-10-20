import React from 'react';
import { MovieItem } from './movieItem';

// Movies component class
export class Movies extends React.Component {

    render() {
        //  map function splits the array of movies into individual movies
        return this.props.movies.map((movie) => {
            return <MovieItem movie={movie} key={movie.imdbID}></MovieItem>
        })
    }
}
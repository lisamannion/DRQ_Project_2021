import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

// MovieItem class
export class MovieItem extends React.Component {

    render() {
        return (
            <div>
                {/* <h4>{this.props.movie.Title}</h4>
                <p>{this.props.movie.Year}</p>
                <img src={this.props.movie.Poster} width="200" height="200"></img> */}
                {/* Card template for displaying each movie */}
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* Changing the link id in the URL to include the _id of the Database document when button is pressed */}
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit Movie</Link>
                </Card>

            </div>
        );
    }
}
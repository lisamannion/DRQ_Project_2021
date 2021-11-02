import React from 'react';
import axios from 'axios'; // Talks HTTP on the web

// Create component class
export class Create extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    // When the form is submitted
    handleSubmit(event) {
        alert("Movie Name: " + this.state.Title + "\nYear: " + this.state.Year + "\nPoster: " + this.state.Title);
        event.preventDefault(); // prevents crashes

        // Setting the input fields back to empty once the entered data has been submitted
        this.setState({
            Title: '',
            Year: '',
            Poster: ''
        })

        // Object (data) to pass up to the server
        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }

        // Post request to the Server - talking HTTP
        axios.post('http://localhost:4000/api/movies', newMovie)
            .then((res) => { // If successful
                console.log(res)
            })
            .catch((err) => { // In case of an error
                console.log(err)
            });
    }

    // Sets the movie name 
    onChangeMovieName(event) {
        this.setState({
            Title: event.target.value
        })

    }

    // Sets the movie year
    onChangeMovieYear(event) {
        this.setState({
            Year: event.target.value
        })
    }

    // Sets the movie poster
    onChangeMoviePoster(event) {
        this.setState({
            Poster: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>This is my create component</h1>
                {/* When submit button is clicked it will trigger the handleSubmit event */}
                <form onSubmit={this.handleSubmit}>
                    {/* Input for movie name */}
                    <div className="form-group">
                        <label>Add Movie Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeMovieName} />
                    </div>
                    {/* Input for year the movie was released */}
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeMovieYear} />
                    </div>
                    {/* Input for Poster */}
                    <div className="form-group">
                        <label>Add Movie Poster: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangeMoviePoster} />
                    </div>
                    {/* Submission button for the form which handles new events*/}
                    <div>
                        <input type="submit" value="Add Movie" className="btn btn-primary"></input>
                    </div>

                </form>
            </div>

        );
    }
}
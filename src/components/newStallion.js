import React from 'react';
import axios from 'axios'; // Talks HTTP on the web

// Create component class
export class NewStallion extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStallionName = this.onChangeStallionName.bind(this);
        this.onChangeBirthYear = this.onChangeBirthYear.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        this.state = {
            RegName: '',
            BirthYear: '',
            Picture: ''
        }
    }

    // When the form is submitted
    handleSubmit(event) {
        alert("Registered Name: " + this.state.RegName + "\nYear: " + this.state.BirthYear + "\nPoster: " + this.state.Picture);
        event.preventDefault(); // prevents crashes

        // Setting the input fields back to empty once the entered data has been submitted
        this.setState({
            RegName: '',
            BirthYear: '',
            Picture: ''
        })

        // Object (data) to pass up to the server
        const newStallion = {
            regName: this.state.RegName,
            birthYear: this.state.BirthYear,
            picture: this.state.Picture
        }

        // Post request to the Server - talking HTTP
        axios.post('http://localhost:4000/newStallion', newStallion)
            .then((res) => { // If successful
                window.location = 'http://localhost:3000/displayStallions'
            })
            .catch((err) => { // In case of an error
                console.log(err)
            });
    }

    // Sets the stallion name 
    onChangeStallionName(event) {
        this.setState({
            RegName: event.target.value
        })

    }

    // Sets the year of birth
    onChangeBirthYear(event) {
        this.setState({
            BirthYear: event.target.value
        })
    }

    // Sets the picture
    onChangePicture(event) {
        this.setState({
            Picture: event.target.value
        })
    }

    render() {
        return (
            <div>
                {/* When submit button is clicked it will trigger the handleSubmit event */}
                <form onSubmit={this.handleSubmit}>
                    {/* Input for stallion name */}
                    <div className="form-group">
                        <label>Add Registered Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.RegName}
                            onChange={this.onChangeStallionName} />
                    </div>
                    {/* Input for year of birth */}
                    <div className="form-group">
                        <label>Add Birth Year: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.BirthYear}
                            onChange={this.onChangeBirthYear} />
                    </div>
                    {/* Input for Picture URL */}
                    <div className="form-group">
                        <label>Add a picture: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Picture}
                            onChange={this.onChangePicture} />
                    </div>
                    {/* Submission button for the form which handles new events*/}
                    <div>
                        <input type="submit" value="Add Stallion" className="btn btn-success"></input>
                    </div>

                </form>
            </div>

        );
    }
}
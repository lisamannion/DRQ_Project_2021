import React from 'react'
import axios from 'axios' // Talks HTTP on the web

// Update component class
export class UpdateStallion extends React.Component {
    // Constructor
    constructor() {
        // Calling parent's constructor
        super();
        // Bindings for events
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStallionName = this.onChangeStallionName.bind(this);
        this.onChangeBirthYear = this.onChangeBirthYear.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        // Setting the state
        this.state = {
            RegName: '',
            BirthYear: '',
            Picture: ''
        }
    }

    // When this component becomes active in the view, read id from URL and pull the document out of the database
    componentDidMount() {
        // Read the record from the database by using the GET request on the server
        axios.get('http://localhost:4000/update/' + this.props.match.params.id)
            .then((response) => { // Got data back
                this.setState({ // Set the state of the update fields to the state of the document which came back from database
                    _id: response.data._id,
                    RegName: response.data.regName,
                    BirthYear: response.data.birthYear,
                    Picture: response.data.picture
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // When the form is submitted
    handleSubmit(event) {
        // Display alert to the user
        alert("Stallion Name: " + this.state.RegName + "\nYear of Birth: " + this.state.BirthYear + "\nPicture: " + this.state.Picture);
        event.preventDefault(); // prevents crashes

        // Setting the input fields to empty
        this.setState({
            RegName: '',
            BirthYear: '',
            Picture: ''
        })

        // Object (data) to pass up to the server
        const newStallion = {
            regName: this.state.RegName,
            birthYear: this.state.BirthYear,
            picture: this.state.Picture,
            _id: this.state._id
        }

        // Using put to update the record
        axios.put('http://localhost:4000/update/' + this.state._id, newStallion)
            .then(response => {
                window.location = 'http://localhost:3000/displayStallions'
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Sets the stallion name 
    onChangeStallionName(event) {
        this.setState({
            RegName: event.target.value
        })

    }

    // Sets the stallion birth year
    onChangeBirthYear(event) {
        this.setState({
            BirthYear: event.target.value
        })
    }

    // Sets the stallion picture
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
                        <label>Change Stallion Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.RegName}
                            onChange={this.onChangeStallionName} />
                    </div>
                    {/* Input for year stallion was born */}
                    <div className="form-group">
                        <label>Change Stallion Year: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.BirthYear}
                            onChange={this.onChangeBirthYear} />
                    </div>
                    {/* Input for Poster */}
                    <div className="form-group">
                        <label>Change Stallion Picture: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Picture}
                            onChange={this.onChangePicture} />
                    </div>
                    {/* Submission button for the form which handles new events*/}
                    <div>
                        <input type="submit" value="Submit changes" className="btn btn-primary"></input>
                    </div>

                </form>
            </div>

        );
    }
}
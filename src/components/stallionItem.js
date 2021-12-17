import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// MovieItem class
export class StallionItem extends React.Component {
    // Constructor
    constructor() {
        super()
        // Bind delete function to this instance of stallion
        this.DeleteStallion = this.DeleteStallion.bind(this)
    }

    // Delete stallion function
    DeleteStallion(e) {
        // Stops function getting called on page reload thus preventing multiple deletes
        e.preventDefault()
        axios.delete("http://localhost:4000/delete/" + this.props.stallion._id)
            .then(() => {
                this.props.ReloadStallions()
            })
            .catch()
    }
    // Rendering a stallion item
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.stallion.regName}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.stallion.picture} alt='Image of Stallion' width='70%' ></img>
                            <footer className="blockquote-footer">
                               Year Of Birth: {this.props.stallion.birthYear}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/* Change to update form for this instance of stallion */}
                    <Link to={"/update/" + this.props.stallion._id} className="btn btn-primary">Edit Stallion</Link>
                    {/* Delete stallion button - deletes this particular instance of stallion */}
                    <Button variant='danger' onClick={this.DeleteStallion}>Delete</Button>
                </Card>
            </div>
        );
    }
}

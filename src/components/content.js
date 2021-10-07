import React from 'react';

// Content class - For content component
export class Content extends React.Component {

    render() {
        return (
            <div>
                {/* Displays "Hello World!" */}
                <h1>Hello World!</h1>

                {/* Displays the current time */}
                <h2>It is {new Date().toLocaleTimeString()}</h2>
            </div>
        );
    }
}
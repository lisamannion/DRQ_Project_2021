import React from 'react';

// Content class - For content component
export class Home extends React.Component {

    render() {
        return (
            <div>
                {/* Displays "Hello World!" */}
                <h1>Welcome to the Stallion Management App!</h1>
                <p>Use this application to showcase your stallions to your customers</p>

                <img src="/stable.jpg" width='100%' alt='Horse stable'/>
            </div>
        );
    }
}
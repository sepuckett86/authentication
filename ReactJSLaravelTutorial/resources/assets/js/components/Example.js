import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                <p>I'm an example component!</p>
                                <p>Here is where user-specific content will go!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

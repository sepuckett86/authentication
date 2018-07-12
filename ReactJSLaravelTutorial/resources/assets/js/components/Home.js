import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Home Component</div>

                            <div className="card-body">
                                I'm a home component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

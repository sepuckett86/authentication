import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-12">
                        <div className="card">
                            <div className="card-header">Home Component</div>

                            <div className="card-body">
                                <p>I'm a home component!</p>
                                <p>You can see me whether you are logged in or not!</p>
                                <h2>Goals of this App</h2>
                                <ul>
                                  <li>Enable 2 users to log in and log out</li>
                                  <li>Enable users to access only their specific gminder in the Example component</li>
                                  <li>Only ONE view as the gateway for single web page React app: app.blade.php</li>
                                  <li>All navbars in front-end</li>
                                  <li>Navbar changes depending on whether user is logged in</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

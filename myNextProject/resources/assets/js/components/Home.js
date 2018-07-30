import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (<div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col col-12">
          <div className="card">
            <div className="card-header">Home Component</div>

            <div className="card-body">
              <p>You can see this whether you are logged in or not!</p>
              <h2>Current Goal</h2>
              <p>Hook up a RESTful Laravel API with React Frontend SPA</p>
              <h2>Objectives of this App</h2>
              <ul>
                <li>Enable at least 2 users to log in and log out</li>
                <li>Enable users to access only their specific gminder in the Example component</li>
                <li>Only ONE view as the gateway for single web page React app: app.blade.php</li>
                <li>All navbars in front-end</li>
                <li>Navbar changes depending on whether user is logged in</li>
                <li>JSON web tokens (JWT) utilized</li>
              </ul>
              <h2>Break Down</h2>
              <div className='row'>
                <div className='col col-12 col-sm-6'>
                  <ul className="list-group">
                    <h3><li className="list-group-item active">Client</li></h3>
                    <li className="list-group-item">Send request with user info to server to generate JWT</li>
                    <li className="list-group-item">Store JWT received from server in cookie</li>
                    <li className="list-group-item">Send request with JWT to server API</li>
                    <li className="list-group-item">Single Page App (ReactJS) notes when user logs in, changes template accordingly</li>
                    <li className="list-group-item">If a response from server contains an error, redirect to login page</li>


                  </ul>
                </div>
                <div className='col col-12 col-sm-6'>
                  <ul className="list-group">
                    <h3><li className="list-group-item active">Server</li></h3>
                    <li className="list-group-item">Generate JWT and send in response to client request</li>
                    <li className="list-group-item">RESTful API only sends data for specific user in responses</li>
                    <li className="list-group-item">If JWT is expired or corrupted in client request, return error</li>

                  </ul>
                </div>
              </div>
              <br />
              <h2>Resources</h2>
              <ul>
                <li><a href='https://hptechblogs.com/using-json-web-token-react/' target='_blank' rel="noopener noreferrer">JSON Web Token and React Tutorial: HP Tech Blogs</a></li>
                <li><a href='https://github.com/lijujohn13/react-laravel-auth' target='_blank' rel="noopener noreferrer">React + Laravel Login</a>
</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Home;

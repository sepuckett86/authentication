import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';


class Logout extends Component {

     constructor(props){
        super(props);
        this.Auth = new AuthService();

     }
     componentDidMount() {
       this.Auth.logout();
     }

	render() {

	    return (
            <div >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Logout</div>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">

                                    </div>
                                    <p>You are now logged out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

	);
}
}

export default Logout;
